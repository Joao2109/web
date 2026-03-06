import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./routes/home";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "auth", element: <h1>Auth</h1> },
]);
createRoot(document.querySelector("main")!).render(
  <RouterProvider router={router} />,
);
