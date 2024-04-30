# classum-박경민-survey

## 과제 설치 및 실행 방법

- node : v18.17.1
- npm : v9.6.7

```bash
npm install
npm run build
npm run preview
```

## 추가 구현사항

### 양식 지우기

미리보기 페이지의 폼 필드의 값을 상태(state)로 제어하는 제어 컴포넌트 방식으로 구현했습니다.

예를 들어, 단답형(장문형) 질문 문항의 `<input />`이 변경되면 changeAnswer이라는 액션이 디스패치되어 리덕스 스토어에 반영됩니다.

```tsx
// 단답형, 장문형 예시
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const answer = e.target.value;

  dispatch(changeAnswer({ questionId, answer }));
};
```

양식 지우기 버튼을 클릭하면 clearAnswers액션을 디스패치하여 설문지의 답변을 저장하고 있는 answers 상태를 초기값인 `{}`로 초기화했습니다.

```tsx
export const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    ...
    clearAnswers: (state) => {
      state.answers = {};
    },
  },
});
```

### 질문 데이터 저장 (브라우저 새로고침 시 유지)

브라우저 새로고침 시에도 데이터를 유지하기 위해 제목, 설명, 질문 데이터를 **로컬스토리지**에 저장했습니다.

> 로컬스토리지(Local Storage)</br>
> 웹 브라우저에서 제공하는 데이터 저장소입니다. 이것은 웹 애플리케이션에서 작은 양의 데이터를 클라이언트 측에 영구적으로 저장하는 데 사용됩니다. 로컬 스토리지는 키-값 쌍으로 데이터를 저장하고, JavaScript를 사용하여 이 데이터를 읽고 쓸 수 있습니다.

루트 컴포넌트가 빈번하게 리렌더링되는 것을 방지하기 위해 상태를 끌어올리지(Lifting State Up) 않고 제목와 설명은 `<SurveyHeader />`에서 저장 로직을 작성했고 질문 데이터는 `<QuestionList />`에서 저장 로직을 작성했습니다. 즉, 해당 상태가 실질적으로 사용되는 컴포넌트 내에 구현했습니다.

저장되는 시점은 `setInterval`함수를 사용하여 1000ms(1초)마다 로컬스토리지에 현재 데이터를 저장했습니다. 부수 효과(Side Effect)가 발생하는 부분이라서 순수해야 하는 렌더링과 분리하기 위해 `useEffect`에서 처리했습니다.

메모리 누수를 방지하기 위해 Clean-up 함수에서 타이머를 제거했습니다.

```tsx
function SurveyHeader() {
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDesc);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem('title', title);
      localStorage.setItem('desc', description);
    }, SAVE_PER_MS);

    return () => {
      clearInterval(timer);
    };
  }, [title, description]);
  ...
}
```

```tsx
function QuestionList() {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem('questions', JSON.stringify(questions));
    }, SAVE_PER_MS);

    return () => {
      clearInterval(timer);
    };
  }, [questions]);
  ...
}
```

로컬스토리지에서 데이터를 가져오는 로직은 `<SurveyPage />`와 `<PreviewPage />` 모두에서 저장된 데이터를 사용할 수 있게 `<App />`에 작성했습니다.

```tsx
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const title = localStorage.getItem('title') || '';
    const description = localStorage.getItem('desc') || '';
    const questions = localStorage.getItem('questions');

    dispatch(changeTitle(title));
    dispatch(changeDescription(description));
    dispatch(initQuestions(questions ? JSON.parse(questions) : []));
  }, [dispatch]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}
```

### 질문 문항 포커스와 createSelector

> createSelector<br/>
> 리덕스(Redux)에서 제공하는 메모이제이션(memoization)된 선택자(selector)를 생성하는 유틸리티 함수입니다. 이 함수는 리덕스의 상태(state)를 기반으로 계산된 값을 캐싱하여 성능을 향상시키고 중복 계산을 방지합니다.

사용자가 현재 작업중인 질문 문항을 인식하기 쉽게 질문 문항과 설문지 헤더 영역에 포커스를 주는 기능을 구현했습니다.

- 설문지 헤더 클릭시 포커스
- 질문 문항 클릭시 포커스
- 질문 문항 복사시 복사된 질문 문항 포커스
- 질문 문항 삭제시 이전 질문 문항 포커스, 이전 질문 문항 없으면 설문지 헤더 포커스

현재 포커스된 질문의 아이디를 리덕스 스토어의 `focusId`라는 상태에 저장했습니다. 이 상태에 해당하는 질문 문항에 포커스를 적용했고 상태값이 `-1`인 경우 설문지 헤더에 포커스를 적용했습니다.

설문지 헤더와 질문 문항에 포커스를 적용하고 해제할 때 `focusId`가 변경될 때마다 해당 상태를 사용하고 있는 모든 컴포넌트를 리렌덩되지 않게 `createSelector`함수를 사용해서 포커스가 적용될 컴포넌트와 포커스가 해제될 컴포넌트만 리렌더링 되도록 구현했습니다.

```tsx
import { createSelector } from '@reduxjs/toolkit';

export const selectIsFocus = createSelector(
  selectFocusId,
  (_, questionId: number) => questionId,
  (focusId: number, questionId: number) => focusId === questionId,
);
```

```tsx
// SurveyHeader
const isFocus = useAppSelector((state) => selectIsFocus(state, -1));

// QuestionItem
const isFocus = useAppSelector((state) => selectIsFocus(state, id));
```

### 플로팅 버튼 이동과 transform 속성

포커스된 질문 문항으로 플로팅 버튼이 이동하는 기능을 구현했습니다.

포커스가 변경될 때 y축 좌표값을 가져오기 위해 설문지 헤더와 질문 문항의 요소(HTML element)의 id 속성에 `question-${id}` 문자열을 지정했습니다.

```tsx
// SurveyHeader
<div id={`question-${-1}`} onClick={handleFocus}>
...
</div>

// QuestionItem
<div id={`question-${id}`} onClick={handleFocus}>
...
</>
```

`focusId`가 변경되면 설문지 헤더 또는 질문 문항의 위치 정보를 가져오고 이 위치 정보를 바탕으로 플로팅 버튼을 이동합니다. 위치 정보를 가져오고 변경하기 위해 `useLayoutEffect`를 사용했습니다.

플로팅 버튼의 y축을 이동할 때 `top`속성이 아닌 `tansform` 속성 변경했습니다. GPU가 관여할 수 있는 속성인 `tansform`을 변경시켜 Reflow을 피했습니다.

```tsx
useLayoutEffect(() => {
  const focusEl = document.getElementById(`question-${focusId}`);

  if (focusEl && buttonRef.current) {
    const rect = focusEl.getBoundingClientRect();

    buttonRef.current.style.transition = `transform 0.3s`;
    buttonRef.current.style.transform = `translateY(${rect.top + window.scrollY}px)`;
  }
}, [focusId]);
```

### React.memo를 사용한 메모이제이션

전달받은 Props가 변경되지 않아도 리렌더링이 발생할 가능성이 있는 컴포넌트에 `React.memo`를 적용했습니다.
