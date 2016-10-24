const TimeConstants = {
  ADD_CONSTRAINT: "ADD_CONSTRAINT",
  INGREDIENTS: [
    {
      plus: [false, true, false],
      big: [false, false, true],
    },
    {
      plus: [true, false, true],
      big: [false, false, true],
    },
    {
      plus: [true, false, false],
      big: [false, true, false],
    },
    {
      plus: [false, true, true],
      big: [false, true, false],
    },
    {
      plus: [false, false, true],
      big: [true, false, false],
    },
    {
      plus: [true, true, false],
      big: [true, false, false],
    },
    {
      plus: [false, false, false],
      big: [true, true, true],
    },
    {
      plus: [true, true, true],
      big: [true, true, true],
    },
  ],
  HINTS: {
    // Hints from experiments.
    redPlus: {
      name: "R+",
      colors: [true, false, false],
      plus: true, minus: false, neutral: false,
    },
    redMinus: {
      name: "R-",
      colors: [true, false, false],
      plus: false, minus: true, neutral: false,
    },
    greenPlus: {
      name: "G+",
      colors: [false, true, false],
      plus: true, minus: false, neutral: false,
    },
    greenMinus: {
      name: "G-",
      colors: [false, true, false],
      plus: false, minus: true, neutral: false,
    },
    bluePlus: {
      name: "B+",
      colors: [false, false, true],
      plus: true, minus: false, neutral: false,
    },
    blueMinus: {
      name: "B-",
      colors: [false, false, true],
      plus: false, minus: true, neutral: false,
    },
    neutral: {
      name: "N",
      colors: [false, false, false],
      plus: false, minus: false, neutral: true,
    },
    // Hints from selling potions.
    nonBluePlus: {
      name: "RG+",
      colors: [true, true, false],
      plus: true, minus: false, neutral: false,
    },
    nonBlueMinus: {
      name: "RG-",
      colors: [true, true, false],
      plus: false, minus: true, neutral: false,
    },
    nonRedPlus: {
      name: "GB+",
      colors: [false, true, true],
      plus: true, minus: false, neutral: false,
    },
    nonRedMinus: {
      name: "GB-",
      colors: [false, true, true],
      plus: false, minus: true, neutral: false,
    },
    nonGreenPlus: {
      name: "RB+",
      colors: [true, false, true],
      plus: true, minus: false, neutral: false,
    },
    nonGreenMinus: {
      name: "RB-",
      colors: [true, false, true],
      plus: false, minus: true, neutral: false,
    },
  },
};

export default TimeConstants;
