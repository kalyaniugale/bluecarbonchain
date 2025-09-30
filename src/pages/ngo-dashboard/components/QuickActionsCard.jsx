import React from 'react';

const QuickActionsCard = ({ onCreateProject, onUploadData }) => {
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <p className="text-xs text-muted-foreground">Do the most common tasks fast</p>
      </div>
      <div className="p-4 space-y-3">
        <button
          onClick={onCreateProject}
          className="w-full rounded-md px-3 py-2 bg-primary text-primary-foreground hover:opacity-90"
        >
          New Project
        </button>
        <button
          onClick={onUploadData}
          className="w-full rounded-md px-3 py-2 border border-border hover:bg-muted/40"
        >
          Upload Field Data (choose project)
        </button>
        <button
          className="w-full rounded-md px-3 py-2 border border-border hover:bg-muted/40"
          onClick={() => alert('Demo: report downloaded')}
        >
          Download Report
        </button>
        <p className="text-xs text-muted-foreground">Tip: more verified data → more FDCT.</p>
      </div>
    </div>
  );
};

export default QuickActionsCard;
