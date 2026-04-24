import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";

import HomePage from "./pages/AuthPages/landingPages/HomePage";
import AboutPage from "./pages/AuthPages/landingPages/AboutPage";
import ArticleListPage from "./pages/AuthPages/landingPages/ArticleListPage";
import ArticlePage from "./pages/AuthPages/landingPages/ArticlePage";

import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";

import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "articles", element: <ArticleListPage /> },
      { path: "articles/:name", element: <ArticlePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;