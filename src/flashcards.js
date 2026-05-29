// src/flashcards.js
const flashcards = [
  {
    question: "What is the difference between var, let, and const?",
    answer: "var is function-scoped and can be re-declared. let and const are block-scoped. let allows re-assignment, const prevents it — but const objects can still have their contents modified."
  },
  {
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that retains access to variables from its outer scope even after that outer function has finished executing."
  },
  {
    question: "What does === do?",
    answer: "=== is strict equality. It checks both value AND type, unlike == which does type coercion before comparing."
  },
  {
    question: "What is hoisting?",
    answer: "Hoisting moves variable and function declarations to the top of their scope before code runs. var is hoisted but not initialized; let and const are in a 'temporal dead zone'."
  },
  {
    question: "What is a Promise?",
    answer: "A Promise represents the eventual result of an async operation. It can be pending, fulfilled, or rejected. Use .then() for success and .catch() for errors."
  }
];

export default flashcards;