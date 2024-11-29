import React from 'react';
import { Button } from '@mui/material';
import {useGetMeQuery, useLogoutPlayerMutation} from '../playerService';
import {useNavigate} from "react-router-dom";

export function LogoutButton() {
  const { data: me } = useGetMeQuery();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutPlayerMutation();

  if (!me) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/login');
    } catch (error) {
      alert('Error logging out');
    }
  };

  return (
    <Button onClick={handleLogout} variant="outlined" color="secondary" disabled={isLoading} sx={{ position: 'absolute', left: 8 }}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
