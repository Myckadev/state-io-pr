import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useGetMeQuery, useLoginPlayerMutation } from '../playerService';
import {useNavigate} from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

export function Login() {
  const { data: me } = useGetMeQuery();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [login, { isLoading }] = useLoginPlayerMutation();

  if (me) {
    navigate('/');
  }

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data).unwrap();
      navigate('/');
    } catch (error) {
      alert("Bah alors on est nul on se souvient pas de son password ou identifiant  ? :/");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>State.io | Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Username" fullWidth margin="normal" {...register('username')} />
          <TextField label="Password" type="password" fullWidth margin="normal" {...register('password')} />
          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <Typography variant="body1"> Pas encore de compte ? <span><a href="/register">Inscris-toi !</a></span></Typography>
        </form>
      </Box>
    </Container>
  );
}
