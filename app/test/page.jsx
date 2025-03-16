"use client";

import React, { useState, useEffect, useRef } from "react";

function CardDisplay({ initialCards }) {
  const [cards, setCards] = useState(initialCards);
  const [sortedCards, setSortedCards] = useState(
    [...initialCards].sort((a, b) => a - b)
  );
  const [cardPositions, setCardPositions] = useState([]);
  const [arrowData, setArrowData] = useState([]);
  const unsortedRef = useRef(null);
  const sortedRef = useRef(null);

  useEffect(() => {
    setSortedCards([...cards].sort((a, b) => a - b));
  }, [cards]);

  useEffect(() => {
    const calculatePositions = () => {
      const unsortedPositions = Array.from(unsortedRef.current.children).map(
        (cardEl) => {
          const rect = cardEl.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            value: parseInt(cardEl.textContent, 10),
            index: parseInt(cardEl.dataset.index, 10), // Get original index
          };
        }
      );
      const sortedPositions = Array.from(sortedRef.current.children).map(
        (cardEl) => {
          const rect = cardEl.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            value: parseInt(cardEl.textContent, 10),
            index: parseInt(cardEl.dataset.index, 10),
          };
        }
      );

      setCardPositions({
        unsorted: unsortedPositions,
        sorted: sortedPositions,
      });
    };

    calculatePositions();
    window.addEventListener("resize", calculatePositions);

    return () => {
      window.removeEventListener("resize", calculatePositions);
    };
  }, [sortedCards, cards]);

  useEffect(() => {
    if (cardPositions.unsorted && cardPositions.sorted) {
      const newArrowData = [];
      const processedIndices = new Set(); // Keep track of processed indices

      for (let i = 0; i < cards.length; i++) {
        if (cards[i] !== sortedCards[i] && !processedIndices.has(i)) {
          const startCard = cardPositions.unsorted.find(
            (card) => card.index === i
          );
          const endCard = cardPositions.sorted.find(
            (card) => card.value === cards[i]
          );

          if (startCard && endCard) {
            newArrowData.push({
              x1: startCard.x,
              y1: startCard.y,
              x2: endCard.x,
              y2: endCard.y,
            });
            //Mark all involved indeces as processed
            let currentIndex = i;
            while (
              cards[currentIndex] !== sortedCards[currentIndex] &&
              !processedIndices.has(currentIndex)
            ) {
              processedIndices.add(currentIndex);
              currentIndex = sortedCards.indexOf(cards[currentIndex]);
            }
            processedIndices.add(currentIndex); //final index.
          }
        }
      }
      setArrowData(newArrowData);
    }
  }, [cardPositions, sortedCards, cards]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        ref={unsortedRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            data-index={index} // Store original index as data attribute
            style={{
              width: "50px",
              height: "70px",
              border: "1px solid black",
              margin: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                card === sortedCards[index] ? "lightgreen" : "lightcoral",
            }}
          >
            {card}
          </div>
        ))}
      </div>
      <div
        ref={sortedRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {sortedCards.map((card, index) => (
          <div
            key={index}
            data-index={index}
            style={{
              width: "50px",
              height: "70px",
              border: "1px solid black",
              margin: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightgreen",
            }}
          >
            {card}
          </div>
        ))}
      </div>

      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {arrowData.map((arrow, index) => (
          <line
            key={index}
            x1={arrow.x1}
            y1={arrow.y1}
            x2={arrow.x2}
            y2={arrow.y2}
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        ))}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
      </svg>
      <button
        onClick={() => {
          const newCards = [...cards];
          const randomIndex1 = Math.floor(Math.random() * newCards.length);
          const randomIndex2 = Math.floor(Math.random() * newCards.length);
          if (randomIndex1 !== randomIndex2) {
            [newCards[randomIndex1], newCards[randomIndex2]] = [
              newCards[randomIndex2],
              newCards[randomIndex1],
            ];
          }
          setCards(newCards);
        }}
        style={{ marginTop: "20px" }}
      >
        Shuffle
      </button>
    </div>
  );
}

//Example usage (in another component, or in a page)
function MyPage() {
  return (
    <div>
      {/* <CardDisplay initialCards={[2, 0, 1]} /> */}
      {/* <CardDisplay initialCards={[5, 1, 4, 2, 3]} /> */}
      <CardDisplay initialCards={[4, 3, 1, 2]} />
    </div>
  );
}

export default MyPage;
