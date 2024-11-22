import { MissionUtils } from '@woowacourse/mission-utils';

class ViewOut {
  static printError(message) {
    MissionUtils.Console.print(`[ERROR] ${message}`);
  }

  static printResult(result) {
    MissionUtils.Console.print(`결과 : ${result}`);
  }
}

export default ViewOut;
