import Constants from "./constants/Constants";

class Rules {
  /**
   * Verify that ingredients i1 and i2 satisfy given hint.
   */
  verifyHint(hint, i1, i2) {
    if (typeof i2 === "undefined") {
      // This is a hint from a disproof. It has only one ingredient.
      // Check that the ingredient contains given sign at given color.
      for (let color = 0; color < 3; color ++) {
        if (hint.colors[color]) {
          if (hint.plus && i1.plus[color] || hint.minus && !i1.plus[color]) {
            return true;
          }
        }
      }
    } else {
      // Hint from a mix of two ingredients. Combine them ant check the result.
      const result = this.combine(i1, i2);
      if (hint.neutral && result.neutral) {
        // Both neutral, do not check colors.
        return true;
      }
      if (!(hint.plus && result.plus || hint.minus && result.minus)) {
        // Sign mismatch.
        return false;
      }
      // Not neutral and signs are the same, check for at least one color match.
      for (let color = 0; color < 3; color ++) {
        if (hint.colors[color] && result.colors[color]) {
          return true;
        }
      }
    }
    return false;
  }

  combine(i1, i2) {
    if (i1.plus[0] === i2.plus[0] && i1.big[0] === !i2.big[0]) {
      if (i1.plus[0]) {
        return Constants.HINTS.redPlus;
      } else {
        return Constants.HINTS.redMinus;
      }
    }
    if (i1.plus[1] === i2.plus[1] && i1.big[1] === !i2.big[1]) {
      if (i1.plus[1]) {
        return Constants.HINTS.greenPlus;
      } else {
        return Constants.HINTS.greenMinus;
      }
    }
    if (i1.plus[2] === i2.plus[2] && i1.big[2] === !i2.big[2]) {
      if (i1.plus[2]) {
        return Constants.HINTS.bluePlus;
      } else {
        return Constants.HINTS.blueMinus;
      }
    }
    return Constants.HINTS.neutral;
  }
}

export default new Rules;
