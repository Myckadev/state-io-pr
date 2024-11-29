import React from 'react';
import { Button } from '@mui/material';
import { useLogoutPlayerMutation } from '../playerService';

export function LogoutButton() {
  const [logout, { isLoading }] = useLogoutPlayerMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      alert('Logged out successfully');
    } catch (error) {
      alert('Error logging out');
    }
  };

  return (
    <Button onClick={handleLogout} variant="outlined" color="secondary" disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
