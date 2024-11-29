import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useGetMeQuery} from "../../players/playerService";
import {useCompleteLevelMutation} from "../../worlds/progressService";

export const Level = () => {
  const { data: me } = useGetMeQuery();
  const { levelCode } = useParams();
  const navigate = useNavigate();
  const [completeLevel] = useCompleteLevelMutation();
  const [bases, setBases] = useState<any[]>([
    { id: 1, owner: 'player', units: 10 },
    { id: 2, owner: 'enemy', units: 20 },
    { id: 3, owner: null, units: 0 },
  ]);

  if (!me) {
    navigate('/login');
  }

  const handleBaseClick = (baseId: number) => {
    console.log(`Base ${baseId} clicked`);
  };

  const handleCompleteLevel = async () => {
    try {
      await completeLevel(levelCode!).unwrap();
      alert('Niveau complété !');
      navigate('/');
    } catch (error) {
      alert('Erreur lors de la complétion du niveau.');
    }
  };

  return (
    <div>
      <h1>Niveau {levelCode}</h1>
      <div>
        {bases.map((base) => (
          <div
            key={base.id}
            style={{
              border: '1px solid black',
              padding: '10px',
              margin: '10px',
              cursor: 'pointer',
              backgroundColor:
                base.owner === 'player'
                  ? 'green'
                  : base.owner === 'enemy'
                    ? 'red'
                    : 'gray',
            }}
            onClick={() => handleBaseClick(base.id)}
          >
            Base {base.id} - Unités : {base.units}
          </div>
        ))}
      </div>
      <button onClick={handleCompleteLevel}>Terminer le niveau</button>
    </div>
  );
};
