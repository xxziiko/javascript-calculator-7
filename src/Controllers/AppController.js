import ParseNumbers from '../models/ParseNumbers.js';
import { Utils } from '../shared/index.js';
import { ViewIn } from '../views/index.js';

class AppController {
  #parseNumbers;

  constructor() {
    this.#parseNumbers = new ParseNumbers();
  }

  async prosess() {
    const numbers = await Utils.getResult(() => this.#getParseData());

    return this.#getSum(numbers);
  }

  #getSum(numbers) {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  }

  async #getParseData() {
    const inputs = await ViewIn.getInput();
    const numbers = this.#parseNumbers.parse(inputs);

    return numbers;
  }
}

export default AppController;
