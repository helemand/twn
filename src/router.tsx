import { createBrowserRouter } from "react-router-dom";
import Article from "./pages/Article";

import ErrorBoundary from "./pages/ErrorBoundary";
import App from "./App";
import Table from "./pages/Table";
import Game from "./pages/Game";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/article/:id?",
        element: <Article />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/table",
        element: <Table />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/life",
        element: <Game />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
