import React, {useRef} from 'react';
import { type Card } from 'types/cards/Card';
import {useDrag, useDrop} from "react-dnd";

export interface CardProps {
  isActive?: boolean
  onClick?: () => void
  isPlayable: boolean
  card: Card,
  index: number,
  onDragEnd: (dragIndex: number, hoverIndex: number) => void
}

export const CardItem: React.FC<CardProps> = ({ card, isPlayable, isActive, onClick, index, onDragEnd }) => {

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', card, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const layout = (content: React.JSX.Element): React.JSX.Element => {
    if (isPlayable) {
      return (
        <div className={'card-item' + (isActive ? ' active' : '')} onClick={onClick}>
          {content}
        </div>
      );
    }
    return (
      <div className='card-item'>
        {content}
      </div>
    );
  };

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        // Add any other styles you need for your card
      }}>
      {layout(
        <div className="card in-deck">
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
      )}
    </div>
  );
};
