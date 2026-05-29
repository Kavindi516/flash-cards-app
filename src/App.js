// src/App.js
import { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import flashcards from "./flashcards";

// Fisher-Yates shuffle — randomly reorders an array
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function App() {
  const [cards, setCards] = useState(flashcards);       // current order of cards
  const [current, setCurrent] = useState(0);            // which card we're on
  const [scores, setScores] = useState({});             // { cardIndex: true/false }

  const total = cards.length;
  const progress = Math.round(((current + 1) / total) * 100);
  const known = Object.values(scores).filter(Boolean).length;
  const stillLearning = Object.values(scores).filter(v => v === false).length;
  const remaining = total - Object.keys(scores).length;

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, total]); // re-register when current changes

  function goNext() {
    if (current < total - 1) setCurrent(c => c + 1);
  }

  function goPrev() {
    if (current > 0) setCurrent(c => c - 1);
  }

  function handleShuffle() {
    setCards(shuffleArray(flashcards));
    setCurrent(0);
    setScores({});
  }

  function handleMark(index, isKnown) {
    setScores(prev => ({ ...prev, [index]: isKnown }));
    // Auto-advance after marking
    setTimeout(() => {
      if (index < total - 1) setCurrent(index + 1);
    }, 300);
  }

  return (
    <div style={styles.wrapper}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Flash Cards</h1>
        <button style={styles.shuffleBtn} onClick={handleShuffle}>
          ⇄ Shuffle
        </button>
      </div>

      {/* Score tracker */}
      <div style={styles.scoreRow}>
        <div style={styles.scoreCard}>
          <div style={styles.scoreLabel}>Known</div>
          <div style={{ ...styles.scoreVal, color: "#178F6A" }}>{known}</div>
        </div>
        <div style={styles.scoreCard}>
          <div style={styles.scoreLabel}>Still learning</div>
          <div style={{ ...styles.scoreVal, color: "#D85A30" }}>{stillLearning}</div>
        </div>
        <div style={styles.scoreCard}>
          <div style={styles.scoreLabel}>Remaining</div>
          <div style={styles.scoreVal}>{remaining}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={styles.progressOuter}>
        <div style={{ ...styles.progressInner, width: progress + "%" }} />
      </div>
      <div style={styles.progressMeta}>
        <span>{progress}%</span>
        <span>{current + 1} of {total}</span>
      </div>

      {/* Flash card */}
      <FlashCard
        card={cards[current]}
        cardIndex={current}
        onMark={handleMark}
        scores={scores}
      />

      {/* Navigation */}
      <div style={styles.nav}>
        <button style={styles.navBtn} onClick={goPrev} disabled={current === 0}>
          ‹ Previous
        </button>
        <button style={styles.navBtn} onClick={goNext} disabled={current === total - 1}>
          Next ›
        </button>
      </div>

      <p style={styles.hint}>← → arrow keys to navigate</p>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "560px",
    margin: "3rem auto",
    padding: "0 1rem",
    fontFamily: "sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  title: { fontSize: "24px", margin: 0 },
  shuffleBtn: {
    padding: "7px 16px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
  },
  scoreRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "1.2rem",
  },
  scoreCard: {
    flex: 1,
    background: "#f9f9f9",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "10px 14px",
  },
  scoreLabel: {
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#888",
    marginBottom: "4px",
  },
  scoreVal: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111",
  },
  progressOuter: {
    background: "#e0e0e0",
    borderRadius: "999px",
    height: "8px",
    marginBottom: "6px",
    overflow: "hidden",
  },
  progressInner: {
    height: "100%",
    background: "#178F6A",
    borderRadius: "999px",
    transition: "width 0.3s ease",
  },
  progressMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#666",
    marginBottom: "1.2rem",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  navBtn: {
    padding: "8px 18px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#fff",
  },
  hint: {
    textAlign: "center",
    fontSize: "12px",
    color: "#aaa",
    marginTop: "0.8rem",
  },
};

export default App;