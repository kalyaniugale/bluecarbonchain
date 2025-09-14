import React from 'react';
import Icon from '../../../components/AppIcon';

const EnvironmentalBackground = () => {
  const floatingElements = [
    { icon: 'TreePine', size: 24, position: 'top-20 left-10', delay: '0s' },
    { icon: 'Waves', size: 20, position: 'top-32 right-16', delay: '2s' },
    { icon: 'Sun', size: 18, position: 'top-48 left-20', delay: '4s' },
    { icon: 'Wind', size: 22, position: 'bottom-32 right-12', delay: '1s' },
    { icon: 'Leaf', size: 16, position: 'bottom-48 left-16', delay: '3s' },
    { icon: 'Droplets', size: 20, position: 'top-64 right-32', delay: '5s' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-accent/5"></div>
      {/* Floating Environmental Icons */}
      {floatingElements?.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element?.position} opacity-20 animate-pulse`}
          style={{
            animationDelay: element?.delay,
            animationDuration: '4s'
          }}
        >
          <Icon 
            name={element?.icon} 
            size={element?.size} 
            className="text-primary/40" 
          />
        </div>
      ))}
      {/* Decorative Circles */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-success/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

export default EnvironmentalBackground;