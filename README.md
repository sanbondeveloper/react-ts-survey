# Online Survey Form

## 프로젝트 소개
단답형, 장문형, 객관식, 체크박스, 드롭다운 5가지 형식의 질문을 제작할 수 있는 온라인 설문지 폼(Form)입니다.

- 개인 프로젝트
- 개발 기간: 약 1주
- 배포 주소: https://peppy-genie-f4960b.netlify.app/

### 주요 기능

**질문 추가, 삭제, 복사**

질문을 추가 및 삭제할 수 있고 복사 기능을 통해 기존의 질문을 재사용할 수 있습니다.<br/>또한, 추가된 질문의 형식을 변경할 수 있고 답변 필수 여부를 지정할 수 있습니다.

![1](https://github.com/sanbondeveloper/react-ts-survey/assets/146537655/f47dbd62-c210-48bf-86df-69f0e0c46274)

**선택 옵션 추가, 삭제**

객관식, 체크박스, 드롭다운 3가지 형식 중 하나에 해당하는 질문은 선택 옵션을 추가하고 삭제할 수 있습니다.

![2](https://github.com/sanbondeveloper/react-ts-survey/assets/146537655/0187db45-3295-487f-8ba4-c64d16855cda)

**질문 포커스**

질문 추가, 삭제, 복사, 클릭 시 질문을 포커스하는 기능을 제공합니다.

![3](https://github.com/sanbondeveloper/react-ts-survey/assets/146537655/518d090c-1745-4099-988d-6bac90c71e82)

**드래그 앤 드롭**

마우스 드래그 앤 드롭을 통해 질문 순서와 선택 옵션 순서를 변경할 수 있습니다.

![4](https://github.com/sanbondeveloper/react-ts-survey/assets/146537655/bc917f5e-6e2f-450c-a017-0ba5fe03452a)

**미리 보기**

제작한 설문지를 직접 사용해볼 수 있습니다.

![6](https://github.com/sanbondeveloper/react-ts-survey/assets/146537655/f45bda88-3718-4cfc-b260-9f237071c70d)

### 성능 최적화의 고민

**1. 컴포넌트 메모이제이션**

- 하나의 질문에 해당하는 `<QuestionItem />`과 하나의 선택 옵션에 `<OptionItem />`의 경우 형제 컴포넌트의 상태가 변경되고 이로 인해 부모 컴포넌트(리스트)가 리렌더링되면 모든 자식 컴포넌트가 리렌더링됩니다. 이러한 불필요한 렌더링을 방지하기 위해 `React.memo`를 활용하여 Props 변경이 발생하지 않으면 기존 캐시된 값을 사용하도록 했습니다.

**2. 애니메이션 최적화**

- 질문의 포커스가 이동으로 인해 플로팅 버튼의 위치가 이동될 때 화면 깜빡임을 방지하기 위해 `useLayoutEffect`를 활용하여 레이아웃 단계에서 플로팅 버튼을 이동시켰습니다.
- 플로팅 버튼의 y축을 이동시킬 때 GPU가 관여할 수 있는 속성인 `transform`을 변경해 브라우저의 Reflow 단계를 생략하도록 구현했습니다.

**3. 리덕스 selector 메모이제이션**

- 질문의 포커스 여부를 나타내는 `selectIsFocus`를 `createSelector`함수를 활용해 메모이제이션하여 실제로 포커스 여부의 변경이 발생하는 `<QuestionItem />`만 리렌더링되도록 구현했습니다.

## 설치 가이드

- Node 18.17.1
- NPM 9.6.7

```
npm install
npm run dev
```
## 기술 스택

**환경**

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

**프론트엔드**

<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">  <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">


