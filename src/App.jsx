import { useSelector } from "react-redux";
import './App.css'
import {NavbarView } from "./components/navbar/navbar-view";
import { createBrowserRouter, RouterProvider } from "react-router";
import { MainView } from "./components/main-view/main-view";
import { ListView } from "./components/list-view/list-view";

function App() {
  const user = useSelector((state) => state.user.username);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? 
          <MainView />
      : <LoginView />,
      children: [
        { path: "/", element: <ListView /> },
      ]
    },
  ]);

  return (
    <div className="flex flex-col h-screen">
      <NavbarView />
      <RouterProvider router={router} />
    </div>
  );
}

export default App
