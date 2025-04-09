import React from 'react';
import { type Card } from 'types/cards/Card';
import {useDrag} from "react-dnd";

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
      }}>
      {layout(
        <div className="card in-deck">
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
      )}
    </div>
  );
};
