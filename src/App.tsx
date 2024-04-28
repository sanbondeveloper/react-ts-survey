import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SurveyPage from './pages/survey';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SurveyPage />,
  },
  {
    path: '/preview',
    element: <div>미리보기</div>,
  },
  {
    path: '/result',
    element: <div>결과</div>,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
