import React from "react";
import { Board } from "types/game/Board";
import CardPlayed from "../deck/CardPlayed";
import useSocket from "../../hooks/useSocket";

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

  if (!board) return (
    <></>
  );

  return (
    <div className="board">
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