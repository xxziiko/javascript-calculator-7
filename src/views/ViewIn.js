import { MissionUtils } from '@woowacourse/mission-utils';
import { MESSEAGES } from '../shared/constants.js';

class ViewIn {
  static async getInput() {
    return await MissionUtils.Console.readLineAsync(MESSEAGES.input);
  }
}

export default ViewIn;
