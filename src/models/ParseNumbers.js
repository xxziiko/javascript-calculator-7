import { Validations } from '../shared/index.js';

class ParseNumbers {
  #CUSTOM_START;
  #numbers;
  #delimiter;

  constructor(inputs) {
    this.#CUSTOM_START = '//';
    this.#delimiter = [',', ':'];
    this.#validateDelimiter(inputs);
  }


  #parseNumbers(inputs) {
    if (!inputs.startsWith(this.#CUSTOM_START)) return this.#parseStringToArray(inputs);

    const numberString = this.#processCustomDelimiter(inputs);
    return this.#parseStringToArray(numberString);
  }

  #processCustomDelimiter(inputs) {
    const TARGET_STRING = '\\n';
    const startIndex = this.#CUSTOM_START.length;
    const findIndex = inputs.indexOf(TARGET_STRING);
    const customDelimiter = inputs.slice(startIndex, findIndex);

    this.#delimiter.push(customDelimiter);
    return inputs.slice(findIndex + TARGET_STRING.length);
  }

  #parseStringToArray(string) {
    const regex = new RegExp(`[${this.#delimiter.join('')}]`);
    return string.split(regex);
  }


  #validateDelimiter(inputs) {
    Validations.validateDelimiter(inputs);
  }
}

export default ParseNumbers;
