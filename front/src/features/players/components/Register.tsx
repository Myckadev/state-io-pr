import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useRegisterPlayerMutation } from '../playerService';

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
}

export function Register() {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const [registerPlayer, { isLoading }] = useRegisterPlayerMutation();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerPlayer(data).unwrap();
      alert('User registered successfully');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Username" fullWidth margin="normal" {...register('username')} />
          <TextField label="Email" type="email" fullWidth margin="normal" {...register('email')} />
          <TextField label="Password" type="password" fullWidth margin="normal" {...register('password')} />
          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
