'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminAdmissions() {
  const [apps, setApps] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => { loadApps(); }, []);

  const loadApps = async () => {
    const { data } = await supabase.from('admissions').select('*').order('created_at', { ascending: false });
    setApps(data || []);
  };

  const updateStatus = async (id, status) => {
    await supabase.from('admissions').update({ status }).eq('id', id);
    loadApps();
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-header__title">Admission Applications</h1>
        <span className="badge badge--info">{apps.length} Total</span>
      </div>

      <div className="admin-table">
        <table>
          <thead><tr><th>Student</th><th>Parent</th><th>Class</th><th>Phone</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {apps.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>No admission applications yet.</td></tr>
            ) : apps.map(app => (
              <tr key={app.id}>
                <td style={{ fontWeight: 600 }}>{app.student_name}</td>
                <td>{app.parent_name}</td>
                <td>{app.class_applied}</td>
                <td>{app.phone}</td>
                <td>{new Date(app.created_at).toLocaleDateString()}</td>
                <td><span className={`badge badge--${app.status === 'approved' ? 'success' : app.status === 'rejected' ? 'error' : 'warning'}`}>{app.status || 'Pending'}</span></td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn admin-btn--edit" onClick={() => setSelected(app)}>View</button>
                    <button className="admin-btn" style={{ background: '#e8f5e9', color: 'var(--color-success)' }} onClick={() => updateStatus(app.id, 'approved')}>✓</button>
                    <button className="admin-btn admin-btn--delete" onClick={() => updateStatus(app.id, 'rejected')}>✗</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">Application Details</h2>
              <button className="admin-modal__close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              {[
                ['Student Name', selected.student_name],
                ['Parent Name', selected.parent_name],
                ['Phone', selected.phone],
                ['Email', selected.email || 'N/A'],
                ['Class Applied', selected.class_applied],
                ['Message', selected.message || 'N/A'],
                ['Date', new Date(selected.created_at).toLocaleString()],
                ['Status', selected.status || 'Pending'],
              ].map(([label, value], i) => (
                <div key={i}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
