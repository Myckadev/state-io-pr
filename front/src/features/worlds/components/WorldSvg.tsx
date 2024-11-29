import { Box } from '@mui/material';
import React from 'react';
import { ReactComponent as WorldMapSvg } from '../assets/world.svg';

export const WorldSvg = ({ progress, onLevelClick }: any) => {
  const getColorForLevel = (isUnlocked: boolean, isCompleted: boolean) => {
    if (isCompleted) return 'blue';
    if (isUnlocked) return 'green';
    return 'red';
  };

  const handleCountryClick = (e: any) => {
    const countryId = e.target.id; // ID du pays cliqué
    const level = progress.find((level: any) => level.level_code === countryId);
    if (level) {
      onLevelClick(countryId, level.is_unlocked);
    }
  };

  return (
    <Box sx={{ margin: '0 auto', textAlign: 'center' }}>
      <WorldMapSvg
        onClick={handleCountryClick}
        style={{ width: '70%', height: 'auto', cursor: 'pointer' }}
      >
        {progress.map((level: any) => (
          <style
            key={level.level_code}
            dangerouslySetInnerHTML={{
              __html: `
              #${level.level_code} {
                fill: ${getColorForLevel(level.is_unlocked, level.is_completed)};
              }
            `,
            }}
          />
        ))}
      </WorldMapSvg>
    </Box>
  );
};
