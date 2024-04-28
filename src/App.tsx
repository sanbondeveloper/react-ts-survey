import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>설문지</div>,
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
