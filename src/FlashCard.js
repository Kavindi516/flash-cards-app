// src/FlashCard.js
import { useState, useEffect } from "react";

function FlashCard({ card, cardIndex, onMark, scores }) {
  const [showAnswer, setShowAnswer] = useState(false);

  // When the card changes, hide the answer automatically
  useEffect(() => {
    setShowAnswer(false);
  }, [card]);

  const currentScore = scores[cardIndex]; // true = known, false = still learning, undefined = not marked yet

  return (
    <div style={styles.card}>

      {/* Question or Answer */}
      <div style={styles.body}>
        {showAnswer ? (
          <p style={styles.answer}>{card.answer}</p>
        ) : (
          <h2 style={styles.question}>{card.question}</h2>
        )}
      </div>

      {/* Mark buttons — only show after revealing answer */}
      {showAnswer && (
        <div style={styles.markRow}>
          <button
            style={{
              ...styles.markBtn,
              background: currentScore === false ? "#D85A30" : "#FAECE7",
              color: currentScore === false ? "#fff" : "#993C1D",
            }}
            onClick={() => onMark(cardIndex, false)}
          >
            ✗ Still learning
          </button>
          <button
            style={{
              ...styles.markBtn,
              background: currentScore === true ? "#178F6A" : "#E1F5EE",
              color: currentScore === true ? "#fff" : "#0F6E56",
            }}
            onClick={() => onMark(cardIndex, true)}
          >
            ✓ Got it!
          </button>
        </div>
      )}

      {/* Flip button */}
      <div style={styles.footer}>
        <button style={styles.flipBtn} onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "12px",
    minHeight: "220px",
    display: "flex",
    flexDirection: "column",
  },
  body: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    textAlign: "center",
  },
  question: { fontSize: "20px", fontWeight: "bold", margin: 0 },
  answer: { fontSize: "15px", lineHeight: "1.7", margin: 0 },
  markRow: {
    display: "flex",
    gap: "8px",
    padding: "0 1.2rem 0.9rem",
  },
  markBtn: {
    flex: 1,
    padding: "8px",
    fontSize: "13px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  footer: {
    borderTop: "1px solid #ccc",
    padding: "0.9rem",
    textAlign: "center",
  },
  flipBtn: {
    padding: "7px 18px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "1px solid #888",
    background: "#fff",
  },
};

export default FlashCard;