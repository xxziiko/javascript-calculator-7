import { DEFAULT_DELIMITERS, ERROR } from './constants.js';
import Utils from './Utils.js';

class Validations {

  static validateDelimiter(inputs) {
    const hasDefaultDelimiter = DEFAULT_DELIMITERS.some((delimiter) => inputs.includes(delimiter));
    Utils.handleError(!hasDefaultDelimiter && !inputs.startsWith('//'), ERROR.invalidDelimiter);
  }
}

export default Validations;
