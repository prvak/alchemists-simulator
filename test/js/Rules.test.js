import chai from "chai";
import Constants from "../../src/js/constants/Constants";
import Rules from "../../src/js/Rules";

const expect = chai.expect;

function combine(hint, expectedPairs) {
  for (let index1 = 0; index1 < Constants.INGREDIENTS.length; index1++) {
    for (let index2 = 0; index2 < Constants.INGREDIENTS.length; index2++) {
      const i1 = Constants.INGREDIENTS[index1];
      const i2 = Constants.INGREDIENTS[index2];
      if (i1 === i2) continue;
      const expectedSuccess = expectedPairs.some((pair) => {
        return index1 === pair[0] && index2 === pair[1] || index1 === pair[1] && index2 === pair[0];
      });
      const result = Rules.combine(i1, i2);
      if (expectedSuccess) {
        expect(result, `${index1}+${index2}`).to.be.equal(hint);
      } else {
        expect(result, `${index1}+${index2}`).to.be.not.equal(hint);
      }
    }
  }
}

function verifyOnes(hint, expectedResults) {
  for (let index = 0; index < Constants.INGREDIENTS.length; index++) {
    const i = Constants.INGREDIENTS[index];
    expect(Rules.verifyHint(hint, i), `${index}`).to.be.equal(expectedResults[index]);
  }
}

function verifyTwos(hint, expectedPairs) {
  for (let index1 = 0; index1 < Constants.INGREDIENTS.length; index1++) {
    for (let index2 = 0; index2 < Constants.INGREDIENTS.length; index2++) {
      const i1 = Constants.INGREDIENTS[index1];
      const i2 = Constants.INGREDIENTS[index2];
      if (i1 === i2) continue;
      const expectedResult = expectedPairs.some((pair) => {
        return index1 === pair[0] && index2 === pair[1] || index1 === pair[1] && index2 === pair[0];
      });
      expect(Rules.verifyHint(hint, i1, i2), `${index1}+${index2}`).to.be.equal(expectedResult);
    }
  }
}

describe("Rules", () => {
  describe("verify two ingredients", () => {
    it("red +", () => {
      verifyTwos(Constants.HINTS.redPlus, [[1, 5], [1, 7], [2, 5], [2, 7]]);
    });
    it("red -", () => {
      verifyTwos(Constants.HINTS.redMinus, [[0, 4], [0, 6], [3, 4], [3, 6]]);
    });
    it("green +", () => {
      verifyTwos(Constants.HINTS.greenPlus, [[0, 3], [5, 7], [3, 5], [0, 7]]);
    });
    it("green -", () => {
      verifyTwos(Constants.HINTS.greenMinus, [[1, 2], [4, 6], [1, 6], [4, 2]]);
    });
    it("blue +", () => {
      verifyTwos(Constants.HINTS.bluePlus, [[3, 1], [4, 7], [3, 7], [4, 1]]);
    });
    it("blue -", () => {
      verifyTwos(Constants.HINTS.blueMinus, [[2, 0], [5, 6], [2, 6], [5, 0]]);
    });
    it("neutral", () => {
      verifyTwos(Constants.HINTS.neutral, [[0, 1], [2, 3], [4, 5], [6, 7]]);
    });
  });
  describe("verify one ingredient", () => {
    it("red +", () => {
      verifyOnes(Constants.HINTS.redPlus, [false, true, true, false, false, true, false, true]);
    });
    it("red -", () => {
      verifyOnes(Constants.HINTS.redMinus, [true, false, false, true, true, false, true, false]);
    });
    it("green +", () => {
      verifyOnes(Constants.HINTS.greenPlus, [true, false, false, true, false, true, false, true]);
    });
    it("green -", () => {
      verifyOnes(Constants.HINTS.greenMinus, [false, true, true, false, true, false, true, false]);
    });
    it("blue +", () => {
      verifyOnes(Constants.HINTS.bluePlus, [false, true, false, true, true, false, false, true]);
    });
    it("blue -", () => {
      verifyOnes(Constants.HINTS.blueMinus, [true, false, true, false, false, true, true, false]);
    });
  });
  describe("combine", () => {
    it("red +", () => {
      combine(Constants.HINTS.redPlus, [[1, 5], [1, 7], [2, 5], [2, 7]]);
    });
    it("red -", () => {
      combine(Constants.HINTS.redMinus, [[0, 4], [0, 6], [3, 4], [3, 6]]);
    });
    it("green +", () => {
      combine(Constants.HINTS.greenPlus, [[0, 3], [5, 7], [3, 5], [0, 7]]);
    });
    it("green -", () => {
      combine(Constants.HINTS.greenMinus, [[1, 2], [4, 6], [1, 6], [4, 2]]);
    });
    it("blue +", () => {
      combine(Constants.HINTS.bluePlus, [[3, 1], [4, 7], [3, 7], [4, 1]]);
    });
    it("blue -", () => {
      combine(Constants.HINTS.blueMinus, [[2, 0], [5, 6], [2, 6], [5, 0]]);
    });
    it("neutral", () => {
      combine(Constants.HINTS.neutral, [[0, 1], [2, 3], [4, 5], [6, 7]]);
    });
    it("count all combinations", () => {
      const counts = {
        redPlus: 0,
        redMinus: 0,
        greenPlus: 0,
        greenMinus: 0,
        bluePlus: 0,
        blueMinus: 0,
        neutral: 0,
      };
      for (let index1 = 0; index1 < Constants.INGREDIENTS.length; index1++) {
        for (let index2 = 0; index2 < Constants.INGREDIENTS.length; index2++) {
          if (index1 === index2) {
            continue;
          }
          const i1 = Constants.INGREDIENTS[index1];
          const i2 = Constants.INGREDIENTS[index2];
          const result = Rules.combine(i1, i2);
          switch (result) {
            case Constants.HINTS.redPlus:
              counts.redPlus++;
              break;
            case Constants.HINTS.redMinus:
              counts.redMinus++;
              break;
            case Constants.HINTS.greenPlus:
              counts.greenPlus++;
              break;
            case Constants.HINTS.greenMinus:
              counts.greenMinus++;
              break;
            case Constants.HINTS.bluePlus:
              counts.bluePlus++;
              break;
            case Constants.HINTS.blueMinus:
              counts.blueMinus++;
              break;
            case Constants.HINTS.neutral:
              counts.neutral++;
              break;
            default:
              throw new Error(`Unexpected result '${result}'!`);
          }
        }
      }
      expect(counts.redPlus, "redPlus").to.be.equal(8);
      expect(counts.redMinus, "redMinus").to.be.equal(8);
      expect(counts.greenPlus, "greenPlus").to.be.equal(8);
      expect(counts.greenMinus, "greenMinus").to.be.equal(8);
      expect(counts.bluePlus, "bluePlus").to.be.equal(8);
      expect(counts.blueMinus, "blueMinus").to.be.equal(8);
      expect(counts.neutral, "neutral").to.be.equal(8);
    });
  });
});
