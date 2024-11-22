import { ViewOut } from '../views/index.js';

class Utils {
  static async getResult(callback) {
    try {
      return await callback();
    } catch (error) {
      if (error.message === 'NO INPUT') return;
      ViewOut.printError(error.message);

      return await Utils.getResult(callback);
    }
  }

  static handleError(condition, errorMessages) {
    if (condition) {
      throw new Error(errorMessages);
    }
  }
}

export default Utils;
