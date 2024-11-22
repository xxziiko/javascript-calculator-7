import { DEFAULT_DELIMITERS, ERROR } from './constants.js';
import Utils from './Utils.js';

class Validations {
  static validateNegativeNumbers(numbers) {
    const isNegative = numbers.some((number) => number < 0);
    Utils.handleError(isNegative, ERROR.invalidNumber);
  }

  static validateIncludeNonNumbers(numbers) {
    const isIncludeNonNumbers = numbers.some((number) => Number.isNaN(number));
    Utils.handleError(isIncludeNonNumbers, ERROR.includeNonNumbers);
  }

  static validateDelimiter(inputs) {
    const hasDefaultDelimiter = DEFAULT_DELIMITERS.some((delimiter) => inputs.includes(delimiter));
    Utils.handleError(!hasDefaultDelimiter && !inputs.startsWith('//'), ERROR.invalidDelimiter);
  }
}

export default Validations;
