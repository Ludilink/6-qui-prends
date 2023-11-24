import React, { useEffect, useState } from 'react';
import { type Card } from 'types/cards/Card';
import { CardItem } from 'components/deck/CardItem';
import useSocket from 'hooks/useSocket';

interface Props {
  cards: Card[]
}
export const Deck: React.FC<Props> = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const socket = useSocket();

  useEffect(() => {
    socket?.on('cards', () => {
      setActiveIndex(-1);
    });

    return () => {
      socket?.off('cards');
    };
  }, []);

  const updateActiveCard = (index: number) => {
    if (index === activeIndex) {
      const card = cards[index];
      console.log('[Deck] EMIT ON \'play\' : ', card);
      socket?.emit('play', card, (response: any): void => {
        if (response.hasOwnProperty('error')) {
          console.log('[Deck] ERROR from play : ', response.error);
        }
      });
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className='deck'>
      { cards.length > 0 && cards.map((card, index) => (
        <CardItem key={index} card={card} isPlayable={true} isActive={index === activeIndex} onClick={() => { updateActiveCard(index); }} />
      ))}
    </div>
  );
};
