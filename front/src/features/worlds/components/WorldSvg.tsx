import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Permet de rediriger
import { Box } from '@mui/material';
import { ReactComponent as WorldMapSvg } from '../assets/world.svg';

export const WorldSvg = ({ progress, onLevelClick }: any) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const navigate = useNavigate();

  const getColorForLevel = (isUnlocked: boolean, isCompleted: boolean) => {
    if (isCompleted) return 'blue';
    if (isUnlocked) return 'green';
    return 'red';
  };

  useEffect(() => {
    if (svgRef.current) {
      progress.forEach((level: any) => {
        const countryElement = svgRef.current!.getElementById(level.level_code);
        if (countryElement) {
          // @ts-ignore
          countryElement.style.fill = getColorForLevel(
            level.is_unlocked,
            level.is_completed
          );
        }
      });
    }
  }, [progress]);

  const handleCountryClick = (e: React.MouseEvent<SVGElement>) => {
    const countryId = (e.target as SVGElement).id;
    const level = progress.find((level: any) => level.level_code === countryId);

    if (level && level.is_unlocked && !level.is_completed) {
      // Si le niveau est déverrouillé et non complété
      onLevelClick(countryId, true); // Facultatif pour une logique supplémentaire
      navigate(`/level/${countryId}`); // Redirige vers le composant du jeu
    }
  };

  return (
    <Box sx={{ margin: '0 auto', textAlign: 'center' }}>
      <WorldMapSvg
        ref={svgRef}
        onClick={handleCountryClick}
        style={{ width: '70%', height: 'auto', cursor: 'pointer' }}
      />
    </Box>
  );
};
