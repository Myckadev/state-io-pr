import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useLoginPlayerMutation } from '../playerService';

interface LoginFormInputs {
  username: string;
  password: string;
}

export function Login() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [login, { isLoading }] = useLoginPlayerMutation();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data).unwrap();
      alert('Logged in successfully');
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Username" fullWidth margin="normal" {...register('username')} />
          <TextField label="Password" type="password" fullWidth margin="normal" {...register('password')} />
          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
