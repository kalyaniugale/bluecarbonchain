import React from 'react';

const statusPill = (status) => {
  const base = 'px-2 py-1 rounded-full text-xs';
  if (status === 'active') return `${base} bg-emerald-100 text-emerald-800`;
  if (status === 'pending') return `${base} bg-amber-100 text-amber-800`;
  return `${base} bg-gray-200 text-gray-800`;
};

const ExistingProjectsList = ({ projects = [], onViewProject, onUploadData }) => {
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">My Projects</h3>
        <p className="text-xs text-muted-foreground">India focus • Project-wise uploads</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Expected Credits</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.type}</div>
                </td>
                <td className="px-4 py-3">{p.location}</td>
                <td className="px-4 py-3">
                  <span className={statusPill(p.status)}>
                    {p.status === 'pending' ? 'Awaiting Review' :
                     p.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </td>
                <td className="px-4 py-3">{p.expectedCredits.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onUploadData?.(p)}
                      className="px-3 py-1.5 rounded-md border border-border hover:bg-muted/40"
                    >
                      Upload Data
                    </button>
                    <button
                      onClick={() => onViewProject?.(p)}
                      className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">
                  No projects yet. Click “New Project” to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExistingProjectsList;
