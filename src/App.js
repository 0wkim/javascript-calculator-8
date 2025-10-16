import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const INPUT = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요. \n");

    // Console.print(`입력 된 문자열: ${INPUT}`);

    // 입력된 문자열의 앞뒤 공백 제거
    let trim_input = INPUT.trim();
    // Console.print(`앞뒤 공백 제거 된 문자열: ${trim_input}`);

    // 쉼표, 콜론 구분 함수
    const splitString = (str) => {
      str = str.toString();
      const SPLIT_INPUT = str.split(/:|,/);
      return SPLIT_INPUT;
    };

    // 커스텀 구분자 저장 배열
    const delimiter = [];

    // 커스텀 구분자 저장 함수 
    const saveDelimiter = (trim_input) => {
      while(trim_input.includes('\/\/') && trim_input.includes('\\n')) {
        let START = trim_input.indexOf("\/\/") + 2;
        let END = trim_input.indexOf('\\n');

        delimiter.push(trim_input.substring(START, END));

        trim_input = trim_input.slice(END + 2);
      }
    };

    // 구분 된 숫자 저장
    let numbers = [];

    // 커스텀 구분자가 존재하는 경우
    if (trim_input.includes('\/\/') && trim_input.includes('\\n')) {
      saveDelimiter(trim_input);
      // Console.print(`커스텀 구분자: ${delimiter}`);

      // 문자열에 커스텀 구분자가 있으면, 해당 부분을 삭제
      for (let i = 0; i < delimiter.length; i++) {
        trim_input = trim_input.replace(`\/\/${delimiter[i]}\\n`, '');

        // 커스텀 구분자가 삭제된 문자열의 앞뒤 공백 제거
        trim_input = trim_input.trim();

        // Console.print(`커스텀 구분자 제외: ${trim_input}`);

        // 커스텀 구분자로 구분
        numbers = trim_input.split(delimiter[i]);
      }

      if (trim_input.includes(':') || trim_input.includes(',')) {
        // 쉼표, 콜론으로 구분
        numbers = splitString(numbers);
      }
    } else {
      // 커스텀 구분자가 없는 경우

      // 문자열의 전체 공백 제거
      trim_input = trim_input.replace(/\s/g, "");

      // 쉼표, 콜론으로 구분
      numbers = splitString(trim_input);
    }

    // Console.print(`숫자: ${numbers}`);


    // INPUT.replace(/\s/g, ""); -> 전체 공백 제거 
    // trim, split, substr, substring, slice 


    // 숫자 합 계산
    const SUM = numbers.map(Number).reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0);

    Console.print(`결과 : ${SUM}`);

  }
}

export default App;
