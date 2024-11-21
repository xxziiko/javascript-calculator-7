import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';

const mockQuestions = (inputs) => {
  const messages = [];

  MissionUtils.Console.readLineAsync = jest.fn((prompt) => {
    messages.push(prompt);
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error('NO INPUT');
    }

    return Promise.resolve(input);
  });

  MissionUtils.Console.readLineAsync.messages = messages;
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expects) => {
  expects.forEach((exp) => {
    expect(received).toContain(exp);
  });
};

const runExceptions = async ({
  inputs = [],
  inputsToTerminate = [],
  expectedErrorMessage = '',
}) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions([...inputs, ...inputsToTerminate]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expectedErrorMessage));
};

const run = async ({ inputs = [], inputsToTerminate = [], expected = [] }) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions([...inputs, ...inputsToTerminate]);

  // when
  const app = new App();
  await app.run();

  const output = getOutput(logSpy);

  // then

  if (expected.length > 0) {
    expectLogContains(output, expected);
  }
};

describe('문자열 계산기', () => {
  test('커스텀 구분자 사용1', async () => {
    await run({
      inputs: ['//;\\n1;2;3'],
      expected: ['결과 : 6'],
    });
  });

  test('커스텀 구분자 사용2', async () => {
    await run({
      inputs: ['//.\\n1.2.3'],
      expected: ['결과 : 6'],
    });
  });

  test('기본 구분자 사용', async () => {
    await run({
      inputs: ['1,2:3'],
      inputsToTerminate: ['1,2:3'],
      expected: ['결과 : 6'],
    });
  });

  test.each([['-1,2,3'], ['a,1,2'], ['//;\n1'], ['1234567890']])('예외 테스트', async (input) => {
    await runExceptions({
      inputs: [input],
      expectedErrorMessage: '[ERROR]',
      inputsToTerminate: ['1,2,3'],
    });
  });
});
