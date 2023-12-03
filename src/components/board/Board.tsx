import React from "react";
import { Board } from "types/game/Board";
import CardPlayed from "../deck/CardPlayed";
import useSocket from "../../hooks/useSocket";
import {useDrop} from "react-dnd";
import {Card} from "../../types/cards/Card";

interface Props {
  board: Board | undefined
}

export const BoardCards: React.FC<Props> = ({ board}) => {

  const socket = useSocket();

  const chooseSlot = (index: number) => {
    console.log('[Deck] EMIT ON chooseSlot : ', index);
    socket?.emitWithAck('chooseSlot', index).then((response: any): void => {
      if (response.hasOwnProperty('error')) {
        console.log('[Deck] ERROR from chooseSlot : ', response.error);
      }
    });
  };

  const placeCard = (card: Card) => {
    console.log('[Deck] EMIT ON \'play\' : ', card);
    socket?.emit('play', card, (response: any): void => {
      if (response.hasOwnProperty('error')) {
        console.log('[Deck] ERROR from play : ', response.error);
      }
    });
  }

  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item: any) => {
      placeCard(item.card);
    },
  });

  if (!board) return (
    <></>
  );

  return (
    <div className="board" ref={drop}>
      <div className="board-place-cards"></div>
      <div className="board-all-slots">
        <div className="board-slot" onClick={() => { chooseSlot(1)} }>
          {board.slot1.cards.map((card, index) => (
            <CardPlayed card={card} key={index}/>
          ))}
        </div>
        <div className="board-slot" onClick={() => chooseSlot(2)}>
          {board.slot2.cards.map((card, index) => (
            <CardPlayed card={card} key={index}/>
          ))}
        </div>
        <div className="board-slot" onClick={() => chooseSlot(3)}>
          {board.slot3.cards.map((card, index) => (
            <CardPlayed card={card} key={index}/>
          ))}
        </div>
        <div className="board-slot" onClick={() => chooseSlot(4)}>
          {board.slot4.cards.map((card, index) => (
            <CardPlayed card={card} key={index}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BoardCards;