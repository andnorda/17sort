"use client";

import { Card } from "@/cards";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";

const DraggableCardList = ({
  cards,
  setOrder,
  done,
}: {
  cards: Card[];
  setOrder: (order: number[]) => void;
  done: boolean;
}) => {
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
      cards,
      result.source.index,
      result.destination.index
    );

    setOrder(newCardList.map((card) => card.mtga_id));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Draggable
                key={card.url}
                draggableId={card.url}
                index={index}
                isDragDisabled={done}
              >
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
