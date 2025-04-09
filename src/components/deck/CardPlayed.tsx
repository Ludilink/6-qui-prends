import React from 'react';
import { type Card } from 'types/cards/Card';

export interface CardProps {
  card: Card
}

export const CardPlayed: React.FC<CardProps> = ({ card}) => {
  return (
    <>
      <div className='card-item'>
        <div className="card">
          <div className="card-bulls">
            <p>{card.bullPoints}</p>
            <div className="card-bull">
              <img src="/images/bull.png" alt="bull" />
            </div>
          </div>
          <div className="card-value">
            {card.value}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPlayed;
