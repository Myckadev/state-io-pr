import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../../players/playerService';
import { useCompleteLevelMutation } from '../../worlds/progressService';

export const Level = () => {
  const { data: me, isLoading: loadingMe } = useGetMeQuery();
  const { levelCode } = useParams();
  const navigate = useNavigate();
  const [completeLevel] = useCompleteLevelMutation();

  const [bases, setBases] = useState<any[]>([]);
  const [selectedBase, setSelectedBase] = useState<number | null>(null);

  useEffect(() => {
    if (!loadingMe && !me) {
      navigate('/login');
    }
  }, [me, loadingMe, navigate]);

  useEffect(() => {
    if (levelCode) {
      const difficulty = getDifficultyFromLevel(levelCode);
      const numberOfBases =
        difficulty === 'EASY'
          ? getRandomInt(3, 7)
          : difficulty === 'MEDIUM'
            ? getRandomInt(7, 15)
            : getRandomInt(15, 23);

      const generatedBases = Array.from({ length: numberOfBases }, (_, i) => ({
        id: i + 1,
        owner: i === 0 ? 'player' : i === numberOfBases - 1 ? 'enemy' : null,
        units: i === 0 ? 10 : i === numberOfBases - 1 ? 20 : 0,
        position: { x: getRandomInt(10, 90), y: getRandomInt(10, 90) },
      }));
      setBases(generatedBases);
    }
  }, [levelCode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBases((prevBases) =>
        prevBases.map((base) =>
          base.owner ? { ...base, units: base.units + 5 } : base
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBaseClick = (baseId: number) => {
    if (selectedBase === null) {
      const base = bases.find((b) => b.id === baseId);
      if (base?.owner === 'player') {
        setSelectedBase(baseId);
      }
    } else {
      sendUnits(selectedBase, baseId);
      setSelectedBase(null);
    }
  };

  const sendUnits = (sourceId: number, targetId: number) => {
    setBases((prevBases) => {
      const sourceBase = prevBases.find((b) => b.id === sourceId);
      const targetBase = prevBases.find((b) => b.id === targetId);

      if (!sourceBase || !targetBase || sourceBase.owner !== 'player') {
        return prevBases;
      }

      const unitsToSend = Math.min(sourceBase.units, 10);
      const updatedBases = prevBases.map((base) => {
        if (base.id === sourceId) {
          return { ...base, units: base.units - unitsToSend };
        }

        if (base.id === targetId) {
          if (base.owner === null || base.units < unitsToSend) {
            return {
              ...base,
              units: Math.max(0, base.units - unitsToSend),
              owner: base.units <= unitsToSend ? 'player' : base.owner,
            };
          }

          return {
            ...base,
            units: base.units - unitsToSend,
          };
        }

        return base;
      });

      return updatedBases;
    });
  };

  const handleEnemyTurn = () => {
    setBases((prevBases) => {
      const enemyBases = prevBases.filter((base) => base.owner === 'enemy');
      const neutralBases = prevBases.filter((base) => base.owner === null);
      const playerBases = prevBases.filter((base) => base.owner === 'player');

      if (enemyBases.length > 0 && neutralBases.length > 0) {
        const sourceBase = enemyBases[getRandomInt(0, enemyBases.length - 1)];
        const targetBase = neutralBases[getRandomInt(0, neutralBases.length - 1)];

        const unitsToSend = Math.min(sourceBase.units, 10);
        return prevBases.map((base) => {
          if (base.id === sourceBase.id) {
            return { ...base, units: base.units - unitsToSend };
          }
          if (base.id === targetBase.id) {
            return {
              ...base,
              units: base.units + unitsToSend,
              owner: 'enemy',
            };
          }
          return base;
        });
      }

      return prevBases;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleEnemyTurn();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Condition de victoire : toutes les bases doivent être contrôlées par le joueur
    if (bases.length > 0 && bases.every((base) => base.owner === 'player')) {
      alert('Vous avez gagné !');
      handleCompleteLevel();
    }
    // Condition de défaite : toutes les bases doivent être contrôlées par l'adversaire
    else if (bases.length > 0 && bases.every((base) => base.owner === 'enemy')) {
      alert('Vous avez perdu...');
      navigate('/');
    }
  }, [bases]);


  const handleCompleteLevel = async () => {
    try {
      await completeLevel(levelCode!).unwrap();
      navigate('/');
    } catch (error) {
      alert('Erreur lors de la complétion du niveau.');
    }
  };

  return (
    <div>
      <h1>Niveau {levelCode}</h1>
      <div style={{ position: 'relative', width: '100%', height: '500px', border: '1px solid black' }}>
        {bases.map((base) => (
          <div
            key={base.id}
            style={{
              position: 'absolute',
              top: `${base.position.y}%`,
              left: `${base.position.x}%`,
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor:
                base.owner === 'player'
                  ? 'green'
                  : base.owner === 'enemy'
                    ? 'red'
                    : 'gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => handleBaseClick(base.id)}
          >
            {base.units}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper functions
const getDifficultyFromLevel = (levelCode: string) => {
  if (['VAT', 'MCO', 'NRU'].includes(levelCode)) return 'EASY';
  if (['HND', 'GTM', 'CUB'].includes(levelCode)) return 'MEDIUM';
  return 'HARD';
};

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
