import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import DashLayout from "./layouts/DashLayout";

import HomePage from "./pages/AuthPages/landingPages/HomePage";
import AboutPage from "./pages/AuthPages/landingPages/AboutPage";
import ArticleListPage from "./pages/AuthPages/landingPages/ArticleListPage";
import ArticlePage from "./pages/AuthPages/landingPages/ArticlePage";

import SignInPage from "./pages/AuthPages/SignInPage.jsx";
import SignUpPage from "./pages/AuthPages/SignUpPage.jsx";

import DashboardPage from "./pages/DashboardPages/DashboardPage.jsx";
import ReportsPage from "./pages/DashboardPages/ReportsPage.jsx";
import UsersPage from "./pages/DashboardPages/UserPage.jsx";

import NotFoundPage from "./pages/NotFoundPage.jsx";

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
  // App.jsx
{
  path: "/dashboard",
  element: <DashLayout />,
  children: [
    { index: true, element: <DashboardPage /> },
    { path: "reports", element: <ReportsPage /> },
    { path: "users", element: <UsersPage /> },
  ],
},
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}