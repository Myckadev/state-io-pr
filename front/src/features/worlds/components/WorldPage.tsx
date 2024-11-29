import React, { useEffect, useState } from 'react';
import { WorldSvg } from '../components/WorldSvg';
import { useGetMeQuery } from "../../players/playerService";
import { useNavigate } from "react-router-dom";
import {useGetProgressQuery} from "../progressService";
import { Typography } from '@mui/material';

export const WorldMap = () => {
  const { data: me } = useGetMeQuery();
  const navigate = useNavigate();
  const { data: progress, isLoading } = useGetProgressQuery();
  const [progressData, setProgressData] = useState<any[]>([]);

  useEffect(() => {
    if (progress) {
      setProgressData(progress);
    }
  }, [progress]);

  if (!me) {
    navigate('login');
  }

  const handleLevelClick = (levelCode: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      alert('Ce niveau est verrouillé.');
      return;
    }
  };

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: '8px' }}>State.io</Typography>
      <WorldSvg progress={progressData} onLevelClick={handleLevelClick} />
    </div>
  );
};
