import React, { useState } from 'react';
import { useSession } from '../../../components/ui/SessionManager';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LoginForm = () => {
  const { login } = useSession();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'ngo', label: 'NGO User' },
    { value: 'investor', label: 'Investor' },
    { value: 'admin', label: 'Admin' }
  ];

  const mockCredentials = {
    ngo_user: { password: 'ngo123', role: 'ngo', name: 'NGO User', email: 'ngo@example.com' },
    investor_user: { password: 'invest123', role: 'investor', name: 'Investor User', email: 'investor@example.com' },
    admin_user: { password: 'admin123', role: 'admin', name: 'Admin User', email: 'admin@example.com' }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const credentials = mockCredentials?.[formData?.username];
      
      if (!credentials) {
        setErrors({ username: 'Invalid username. Please use: ngo_user, investor_user, or admin_user' });
        return;
      }

      if (credentials?.password !== formData?.password) {
        setErrors({ password: 'Invalid password. Check the credentials below the form.' });
        return;
      }

      if (credentials?.role !== formData?.role) {
        setErrors({ role: 'Role mismatch. Please select the correct role for this username.' });
        return;
      }

      // Successful login
      const userData = {
        id: Date.now(),
        username: formData?.username,
        name: credentials?.name,
        email: credentials?.email,
        role: credentials?.role,
        loginTime: new Date()?.toISOString()
      };

      login(userData);
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={formData?.username}
          onChange={(e) => handleInputChange('username', e?.target?.value)}
          error={errors?.username}
          required
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        <Select
          label="Role"
          placeholder="Select your role"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          className="bg-primary hover:bg-primary/90"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;