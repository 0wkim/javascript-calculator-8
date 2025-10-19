import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const userInput = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요. \n");
  
    // 입력된 문자열의 앞뒤 공백 제거
    let trimInput = userInput.trim();

    // 기본 구분자 (쉼표, 콜론) 구분 함수
    const splitString = (str) => {
      str = str.toString();
      const splitInput = str.split(/:|,/);
      return splitInput;
    };

    // 커스텀 구분자 저장 배열
    const delimiters = [];

    // 구분된 숫자 저장 배열
    let numbersArray = [];

    // 커스텀 구분자 저장 함수 
    const saveDelimiters = (trimInput) => {
      while(trimInput.includes('//') && trimInput.includes('\\n')) {
        const startIndex = trimInput.indexOf("//") + 2;
        const endIndex = trimInput.indexOf('\\n');

        delimiters.push(trimInput.substring(startIndex, endIndex));

        trimInput = trimInput.slice(endIndex + 2);
      }
    };

    // 커스텀 구분자가 존재하는 경우
    if (trimInput.includes('//') && trimInput.includes('\\n')) {
      // 커스텀 구분자 저장
      saveDelimiters(trimInput);

      delimiters.forEach((element) => {
        // [예외처리] 커스텀 구분자 내에 문자가 2개 이상일 경우
        if (element.length >= 2) {
          throw new Error("[ERROR] 커스텀 구분자는 한 글자만 지정 가능합니다.");
        }

        // [예외처리] 입력값으로 0을 받은 경우 (0으로 시작하는 소수점이나, 10, 20 등 0을 포함한 숫자는 제외)
        if ((element !== "0") && userInput.match(/(^|[^0-9])0+([^0-9]|$)/g) && !userInput.includes("0.")) {
          throw new Error("[ERROR] 0은 입력할 수 없습니다. 양수만 입력해주세요.")
        }
      });

      // 입력받은 문자열에서 커스텀 구분자 제거
      trimInput = trimInput.replace(/\/\/.\\n/g, '').trim();

      for (let i = 0; i < delimiters.length; i++) {
        // 커스텀 구분자로 구분
        trimInput = trimInput.split(delimiters[i]).join();
      }
    
      const customInput = trimInput;

      numbersArray = [customInput];

      // 커스텀 구분자에 기본 구분자도 같이 존재하는 경우
      if (trimInput.includes(':') || trimInput.includes(',')) {
        // 쉼표, 콜론으로 구분
        numbersArray = splitString(customInput);
      }

    } else { // 커스텀 구분자가 없는 경우

      // [예외처리] 커스텀 구분자가 존재하지 않는데 입력값에 숫자 0이 존재하는 경우
      if (trimInput.match(/(^|[^0-9])0+([^0-9]|$)/g) && !trimInput.includes("0.")) {
        throw new Error ("[ERROR] 0은 입력할 수 없습니다. 양수만 입력해주세요.");
      }

      // 문자열의 전체 공백 제거
      trimInput = trimInput.replace(/\s/g, "");

      // 쉼표, 콜론으로 구분
      numbersArray = splitString(trimInput);
    }

    let numbers = numbersArray.map(Number);

    // [예외처리] 구분자, 양수 외의 문자를 입력하여 numbers에 NaN이 존재하는 경우 
    if (numbers.some(num => isNaN(num))) {
      throw new Error("[ERROR] 구분자와 양수 외엔 입력할 수 없습니다.");
    }

    // [예외처리] 음수를 입력하는 경우 예외 발생
    numbers.forEach(num => {
      if (num < 0) {
        throw new Error("[ERROR] 양수만 사용할 수 있습니다.");
      } 
    });

    // 숫자 합 계산
    const sum = numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0);

    Console.print(`결과 : ${sum}`);

  } 
}

export default App;
