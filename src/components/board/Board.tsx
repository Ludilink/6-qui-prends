import React from "react";
import { Board } from "types/game/Board";
import CardPlayed from "../deck/CardPlayed";

interface Props {
  board: Board | undefined
}

export const BoardCards: React.FC<Props> = ({ board}) => {
  if (!board) return (
    <></>
  );

  return (
    <div className="board">
      <div className="board-all-slots">
        <div className="board-slot">
          {board.slot1.cards.map((card) => (
            <CardPlayed card={card} />
          ))}
        </div>
        <div className="board-slot">
          {board.slot2.cards.map((card) => (
            <CardPlayed card={card} />
          ))}
        </div>
        <div className="board-slot">
          {board.slot3.cards.map((card) => (
            <CardPlayed card={card} />
          ))}
        </div>
        <div className="board-slot">
          {board.slot4.cards.map((card) => (
            <CardPlayed card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BoardCards;