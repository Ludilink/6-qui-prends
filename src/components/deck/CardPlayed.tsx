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
              <img src="https://media.discordapp.net/attachments/1100084765077540888/1177716664175964273/bull.png?ex=6573851d&is=6561101d&hm=574b5e0d791ff3f29f05d991f00e9bcf3a785692dff1a8354edaaa8845b9d07c&=&format=webp" alt="bull" />
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
