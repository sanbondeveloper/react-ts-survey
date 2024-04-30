import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useAppDispatch } from './redux/hooks';
import { changeDescription, changeTitle, initQuestions } from './redux/slices/surveySlice';
import SurveyPage from './pages/survey';
import PreviewPage from './pages/preview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SurveyPage />,
  },
  {
    path: '/preview',
    element: <PreviewPage />,
  },
  {
    path: '/result',
    element: <div>결과</div>,
  },
]);

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

export default App;
