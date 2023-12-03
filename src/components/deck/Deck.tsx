import React, { useEffect, useState } from 'react';
import { type Card } from 'types/cards/Card';
import { CardItem } from 'components/deck/CardItem';
import useSocket from 'hooks/useSocket';


interface Props {
  cards: Card[]
  setCards: (cards: Card[]) => void
}
export const Deck: React.FC<Props> = ({ cards, setCards }) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const socket = useSocket();

  useEffect(() => {
    socket?.on('cards', () => {
      setActiveIndex(-1);
    });

    return () => {
      socket?.off('cards');
    };
  }, [socket]);

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

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    // console.log('[Deck] BEFORE CARDS : ', cards);
    const draggedCard = cards[dragIndex];
    const updatedCards = [...cards];
    updatedCards.splice(dragIndex, 1);
    updatedCards.splice(hoverIndex, 0, draggedCard);
    // console.log('[Deck] AFTER CARDS : ', updatedCards);
    setCards(updatedCards);
  };

  return (
    <div className='deck'>
      { cards.length > 0 && cards.map((card, index) => (
        <CardItem key={index} index={index} card={card} isPlayable={true} isActive={index === activeIndex} onClick={() => { updateActiveCard(index); }} onDragEnd={moveCard} />
      ))}
    </div>
  );
};
