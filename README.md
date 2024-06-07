[![Netlify Status](https://api.netlify.com/api/v1/badges/feff7299-9c20-4a8a-af1a-0c4e69665ae5/deploy-status)](https://app.netlify.com/sites/peppy-genie-f4960b/deploys)

# Online Survey Form

- [Online Survey Form](#online-survey-form)
  * [프로젝트 소개](#프로젝트-소개)
    + [주요 기능](#주요_기능)
    + [성능 최적화의 고민](#성능_최적화의_고민)
  * [설치 가이드](#설치_가이드)
  * [기술 스택](#기술_스택)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

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

- `React.memo` 활용
  
  - 해당 프로젝트를 수행하면서 질문 리스트와 선택 옵션 리스트를 렌더링할 때 `map`을 통해 리스트 구조로 렌더링했습니다. 이러한 구조의 문제점은 하나의 아이템의 상태 변경이 부모 컴포넌트를 리렌더링해 모든 아이템들이 리렌더링될 수 있습니다. 이는 불필요한 렌더링입니다.
  - 불필요한 렌더링을 방지하기 위해 Props가 변경되지 않았는 데 리렌더링될 가능성이 있는 컴포넌트를 `React.memo`를 통해 메모이제이션 했습니다.
  - 메모이제이션하는 과정에서 메모이제이션에도 캐시하기 위한 비용이 발생한다는 것을 알게되었습니다.

**2. 애니메이션 최적화**

- `useLayoutEffect` 활용

  - 플로팅 버튼의 위치를 이동시킬 때 화면 깜빡임을 방지하기 위해 `useLayoutEffect`를 활용하여 레이아웃 단계에서 플로팅 버튼을 이동시켰습니다.
  - `useLayoutEffect`는 페인트 전 단계에서 동기적으로 동작하기 때문에 성능 문제가 발생할 수 있어 주의해서 사용해야 된다는 것을 알게되었습니다.

- `transform` 속성 활용

  - 플로팅 버튼의 y축을 이동시킬 때 GPU가 관여할 수 있는 속성인 `transform`을 변경해 브라우저의 Reflow 단계를 생략하도록 구현했습니다.

**3. 리덕스 selector 메모이제이션**

- `createSelector` 활용

  - `<QuestionItem />` 내부에 해당 컴포넌트의 포커스 여부를 나타내는 셀렉터인 `selectIsFocus`를 `createSelector`를 활용해 메모이제이션 했습니다.
  - 메모이제이션 덕분에 실제로 포커스 여부가 변경되는 리스트 내 아이템만 리렌더링 됩니다.

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

<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">

**배포**

<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">


