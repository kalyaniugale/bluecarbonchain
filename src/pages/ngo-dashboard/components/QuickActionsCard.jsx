import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionsCard = ({ onCreateProject, onUploadData, onDownloadReport }) => {
  return (
    <aside className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <p className="text-xs text-muted-foreground">Do the most common tasks fast</p>
      </div>

      <div className="p-4 space-y-3">
        <button
          onClick={onCreateProject}
          className="w-full rounded-md px-3 py-2 bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center justify-center gap-2"
        >
          <Icon name="Plus" size={16} /> New Project
        </button>

        <button
          onClick={onUploadData}
          className="w-full rounded-md px-3 py-2 border border-border hover:bg-muted/40 inline-flex items-center justify-center gap-2"
        >
          <Icon name="Upload" size={16} /> Upload Field Data
        </button>

        <button
          onClick={onDownloadReport || (() => alert('Demo: report downloaded'))}
          className="w-full rounded-md px-3 py-2 border border-border hover:bg-muted/40 inline-flex items-center justify-center gap-2"
        >
          <Icon name="FileDown" size={16} /> Download Report
        </button>

        <div className="pt-1 text-[11px] text-muted-foreground flex items-start gap-2">
          <Icon name="Info" size={14} className="mt-[2px]" />
          <span>More verified field data → higher FDCT allocation for your projects.</span>
        </div>
      </div>
    </aside>
  );
};

export default QuickActionsCard;
