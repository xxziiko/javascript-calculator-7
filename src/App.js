import { ViewOut } from './views/index.js';
import AppController from './Controllers/AppController.js';

class App {
  async run() {
    const appController = new AppController();
    const result = await appController.prosess();

  }
}

export default App;
