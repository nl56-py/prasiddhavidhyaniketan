-- ============================================
-- Supabase Schema for Prasiddha Vidhya Niketan
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- Notices table
CREATE TABLE IF NOT EXISTS notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_np TEXT NOT NULL,
  content_en TEXT DEFAULT '',
  content_np TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption_en TEXT DEFAULT '',
  caption_np TEXT DEFAULT '',
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_url TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  title_np TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_np TEXT DEFAULT '',
  thumbnail_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_np TEXT NOT NULL,
  content_en TEXT DEFAULT '',
  content_np TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_np TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  slug TEXT UNIQUE NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admission applications table
CREATE TABLE IF NOT EXISTS admissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  class_applied TEXT NOT NULL,
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_np TEXT DEFAULT '',
  content_en TEXT NOT NULL,
  content_np TEXT DEFAULT '',
  role_en TEXT DEFAULT '',
  role_np TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT DEFAULT ''
);

-- ============================================
-- Admins table (maps Supabase auth users to admin roles)
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  display_name TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Helper function: check if current user is an admin
-- ============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Public read policies (for website visitors)
CREATE POLICY "Public can read published notices" ON notices FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Public can read published posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published testimonials" ON testimonials FOR SELECT USING (is_published = true);

-- Public insert policies (for form submissions)
CREATE POLICY "Public can submit admissions" ON admissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Authenticated admin full access policies (uses is_admin() function)
CREATE POLICY "Admin full access notices" ON notices FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access gallery" ON gallery FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access videos" ON videos FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access blog" ON blog_posts FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access admissions" ON admissions FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access messages" ON contact_messages FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access settings" ON settings FOR ALL USING (public.is_admin());

-- Admins table policies (only admins can view/manage admin list)
CREATE POLICY "Admin can read admins" ON admins FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin can manage admins" ON admins FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.admins
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

-- ============================================
-- Trigger: auto-update updated_at on admins
-- ============================================
CREATE OR REPLACE FUNCTION update_admins_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION update_admins_updated_at();

-- ============================================
-- Seed Data (sample notices)
-- ============================================
INSERT INTO notices (title_en, title_np, content_en, content_np) VALUES
('Admission Open for New Academic Session', 'नयाँ शैक्षिक सत्रका लागि भर्ना खुला', 'Admissions are open for Nursery to Grade 8. Parents are requested to contact the school office for details.', 'नर्सरीदेखि कक्षा ८ सम्म भर्ना खुला गरिएको छ। थप जानकारीका लागि विद्यालय कार्यालयमा सम्पर्क गर्नुहोस्।'),
('Parent-Teacher Meeting Notice', 'अभिभावक-शिक्षक बैठक सूचना', 'Parents are invited to attend the upcoming meeting to discuss student progress and classroom performance.', 'विद्यार्थीको प्रगति र कक्षागत प्रदर्शनबारे छलफल गर्न अभिभावकहरूलाई बैठकमा आमन्त्रण गरिन्छ।'),
('Examination Schedule Published', 'परीक्षा तालिका प्रकाशित', 'The examination routine has been published. Students are advised to prepare according to the schedule.', 'परीक्षा तालिका प्रकाशित गरिएको छ। विद्यार्थीहरूलाई तालिका अनुसार तयारी गर्न अनुरोध गरिन्छ।');

-- ============================================
-- HOW TO ADD YOUR FIRST ADMIN
-- ============================================
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" and create a user with email/password
--    Example: admin@pvn.edu.np / your-secure-password
-- 3. Copy the user's UUID from the users list
-- 4. Run this SQL (replace the UUID and email):
--
-- INSERT INTO admins (user_id, email, role, display_name) VALUES
-- ('YOUR-USER-UUID-HERE', 'admin@pvn.edu.np', 'super_admin', 'PVN Admin');
--
