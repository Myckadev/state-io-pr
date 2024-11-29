import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import {useGetMeQuery, useRegisterPlayerMutation} from '../playerService';
import {useNavigate} from "react-router-dom";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
}

export function Register() {
  const { data: me } = useGetMeQuery();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const [registerPlayer, { isLoading }] = useRegisterPlayerMutation();

  if (me) {
    navigate('/');
  }

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerPlayer(data).unwrap();
      navigate('/');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>State.io | Register</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Username" fullWidth margin="normal" {...register('username')} />
          <TextField label="Email" type="email" fullWidth margin="normal" {...register('email')} />
          <TextField label="Password" type="password" fullWidth margin="normal" {...register('password')} />
          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
          <Typography variant="body1"> Déjà inscrit ? <span><a href="/login">Connecte toi !</a></span></Typography>
        </form>
      </Box>
    </Container>
  );
}
