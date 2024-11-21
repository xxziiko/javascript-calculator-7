import { Utils } from './shared/index.js';
import { ViewIn } from './views/index.js';
import { ParseNumbers, Calculator } from './models/index.js';

class App {
  async run() {
    const numbers = await Utils.getResult(() => this.#getParseData());
  }

  async #getParseData() {
    const input = await ViewIn.getInput();
    const parseNumbers = new ParseNumbers(input);

    return parseNumbers.numbers;
  }
}

export default App;
