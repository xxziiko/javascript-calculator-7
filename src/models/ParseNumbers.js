import { Validations } from '../shared/index.js';

class ParseNumbers {
  #CUSTOM_START;
  #delimiter;

  constructor() {
    this.#CUSTOM_START = '//';
    this.#delimiter = [',', ':'];
  }

  parse(inputs) {
    this.#validateDelimiter(inputs);
    const numbers = this.#parseNumbers(inputs);
    this.#validateNumbers(numbers);
    return numbers;
  }

  #parseNumbers(inputs) {
    const strings = this.#parseInputs(inputs);
    return this.#parseStringToNumbers(strings);
  }

  #parseStringToNumbers(string) {
    return string.map(Number);
  }

  #parseInputs(inputs) {
    if (!inputs.startsWith(this.#CUSTOM_START)) return this.#parseStringArray(inputs);

    const numberString = this.#processCustomDelimiter(inputs);
    return this.#parseStringArray(numberString);
  }

  #processCustomDelimiter(inputs) {
    const TARGET_STRING = '\\n';
    const startIndex = this.#CUSTOM_START.length;
    const findIndex = inputs.indexOf(TARGET_STRING);
    const customDelimiter = inputs.slice(startIndex, findIndex);

    this.#delimiter.push(customDelimiter);
    return inputs.slice(findIndex + TARGET_STRING.length);
  }

  #parseStringArray(string) {
    const regex = new RegExp(`[${this.#delimiter.join('')}]`);
    return string.split(regex);
  }

  #validateNumbers(numbers) {
    Validations.validateNegativeNumbers(numbers);
    Validations.validateIncludeNonNumbers(numbers);
  }

  #validateDelimiter(inputs) {
    Validations.validateDelimiter(inputs);
  }
}

export default ParseNumbers;
