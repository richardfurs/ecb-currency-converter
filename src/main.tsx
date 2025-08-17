import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import ReactDOM from "react-dom/client";
import App from '@/App.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
