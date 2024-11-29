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
  const [transitingUnits, setTransitingUnits] = useState<any[]>([]);
  const [selectedBase, setSelectedBase] = useState<number | null>(null);
  const [currentTarget, setCurrentTarget] = useState<number | null>(null);
  const [activeActions, setActiveActions] = useState<any[]>([]);

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
        prevBases.map((base) => {
          if (base.owner) {
            // Les bases capturées démarrent avec 5 unités minimum
            const newUnits = Math.max(base.units, 5) + 5;
            return { ...base, units: newUnits };
          }
          return base;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isBaseActive = (baseId: number) => {
    return activeActions.some((action) => action.sourceId === baseId);
  };


  const handleBaseClick = (baseId: number) => {
    const base = bases.find((b) => b.id === baseId);

    if (base?.owner === 'player') {
      if (activeActions.some((action) => action.sourceId === baseId)) {
        // Supprime l'action si déjà active
        setActiveActions((actions) =>
          actions.filter((action) => action.sourceId !== baseId)
        );
      } else {
        // Ajoute une nouvelle action pour cette base
        setActiveActions((actions) => [...actions, { sourceId: baseId, targetId: null }]);
      }
    } else {
      // Définit une cible pour l'action en cours
      setActiveActions((actions) =>
        actions.map((action) =>
          action.targetId === null ? { ...action, targetId: baseId } : action
        )
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      activeActions.forEach((action) => {
        if (action.sourceId && action.targetId) {
          sendUnits(action.sourceId, action.targetId);
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [activeActions]);

  useEffect(() => {
    if (selectedBase !== null && currentTarget !== null) {
      const interval = setInterval(() => {
        sendUnits(selectedBase, currentTarget);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [selectedBase, currentTarget]);

  const sendUnits = (sourceId: number, targetId: number) => {
    setBases((prevBases) => {
      const sourceBase = prevBases.find((b) => b.id === sourceId);
      const targetBase = prevBases.find((b) => b.id === targetId);

      if (!sourceBase || !targetBase || sourceBase.owner !== 'player') {
        return prevBases;
      }

      const unitsToSend = Math.min(sourceBase.units - 5, 10);
      if (unitsToSend <= 0) return prevBases;

      setTransitingUnits((prevTransitingUnits) => [
        ...prevTransitingUnits,
        {
          id: `${sourceId}-${targetId}-${Date.now()}`,
          source: sourceBase,
          target: targetBase,
          progress: 0,
          units: unitsToSend,
        },
      ]);

      return prevBases.map((base) =>
        base.id === sourceId ? { ...base, units: base.units - unitsToSend } : base
      );
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitingUnits((prevTransitingUnits) =>
        prevTransitingUnits
          .map((unit) => {
            const newProgress = unit.progress + 5;
            if (newProgress >= 100) {
              handleUnitArrival(unit);
              return null; // Supprime l'unité après son arrivée
            }
            return { ...unit, progress: newProgress };
          })
          .filter(Boolean) // Supprime les entrées nulles (unités arrivées)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);


  const handleUnitArrival = (unit: any) => {
    setBases((prevBases) =>
      prevBases.map((base) => {
        if (base.id === unit.target.id) {
          if (unit.source.owner === 'player') {
            if (base.owner === null || base.units < unit.units) {
              return {
                ...base,
                units: Math.max(0, base.units - unit.units),
                owner: base.units <= unit.units ? 'player' : base.owner,
              };
            }
            return { ...base, units: base.units - unit.units };
          } else if (unit.source.owner === 'enemy') {
            if (base.owner === null || base.units < unit.units) {
              return {
                ...base,
                units: Math.max(0, base.units - unit.units),
                owner: base.units <= unit.units ? 'enemy' : base.owner,
              };
            }
            return { ...base, units: base.units - unit.units };
          }
        }
        return base;
      })
    );
  };

  const handleEnemyTurn = () => {
    setBases((prevBases) => {
      const enemyBases = prevBases.filter((base) => base.owner === 'enemy');
      const targetableBases = prevBases.filter(
        (base) => base.owner === null || base.owner === 'player'
      );
      if (enemyBases.length > 0 && targetableBases.length > 0) {
        const sourceBase = enemyBases[getRandomInt(0, enemyBases.length - 1)];
        const targetBase = targetableBases[getRandomInt(0, targetableBases.length - 1)];

        const unitsToSend = Math.min(sourceBase.units, 10);
        setTransitingUnits((prevTransitingUnits) => [
          ...prevTransitingUnits,
          {
            id: `${sourceBase.id}-${targetBase.id}-${Date.now()}`,
            source: sourceBase,
            target: targetBase,
            progress: 0,
            units: unitsToSend,
          },
        ]);

        return prevBases.map((base) =>
          base.id === sourceBase.id
            ? { ...base, units: base.units - unitsToSend }
            : base
        );
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
    if (bases.length > 0 && bases.every((base) => base.owner === 'player')) {
      handleCompleteLevel();
    } else if (bases.length > 0 && bases.every((base) => base.owner === 'enemy')) {
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
              border: isBaseActive(base.id) ? '3px solid blue' : 'none', // Bordure pour les bases actives
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

        {transitingUnits.map((unit) => {
          const source = unit.source.position;
          const target = unit.target.position;
          const x = source.x + (target.x - source.x) * (unit.progress / 100);
          const y = source.y + (target.y - source.y) * (unit.progress / 100);

          return (
            <div
              key={unit.id}
              style={{
                position: 'absolute',
                top: `${y}%`,
                left: `${x}%`,
                transform: 'translate(-50%, -50%)',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: unit.source.owner === 'player' ? 'blue' : 'purple',
              }}
            />
          );
        })}
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


