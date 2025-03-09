"use client";

import { Card } from "@/cards";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";
import { useState } from "react";

const DraggableCardList = ({ cards }: { cards: Card[] }) => {
  const [cardList, setCardList] = useState(cards);

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorder = (list: Card[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    const newCardList = reorder(
      cardList,
      result.source.index,
      result.destination.index
    );

    setCardList(newCardList);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cardList.map((card, index) => (
              <Draggable key={card.url} draggableId={card.url} index={index}>
                {(provided) => (
                  <Image
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    src={card.url}
                    width={256}
                    height={357}
                    alt=""
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableCardList;
