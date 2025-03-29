import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dummy from './component/Dummy.tsx';
import Users from './component/User.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/user/:id",
    element: <Users />
  },
  {
    path: "/dummy",
    element: <Dummy />
  },
  {
    path: "*",
    element: <div>page not found</div>
  }
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);