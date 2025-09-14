import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Leaf" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        BlueCarbonChain
      </h1>
      
      <p className="text-muted-foreground text-lg mb-2">
        Carbon Credit Management Platform
      </p>
      
      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-accent" />
          <span>Secure</span>
        </div>
        <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Zap" size={14} className="text-success" />
          <span>Fast</span>
        </div>
        <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Globe" size={14} className="text-primary" />
          <span>Global</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;