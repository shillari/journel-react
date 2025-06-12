import { useSelector } from "react-redux";
import './App.css'
import {NavbarView } from "./components/navbar/navbar-view";
import { createBrowserRouter, RouterProvider } from "react-router";
import { MainView } from "./components/main-view/main-view";
import { ListView } from "./components/list-view/list-view";
import { ProfileView } from "./components/profile-view/profile-view";
import { LoginView } from "./components/login-view/login-view";
import { Editor } from "./components/create-edit-view/editor";

function App() {
  const user = useSelector((state) => state.user.username);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? 
          <MainView user={user} />
      : <LoginView />,
      children: [
        { path: "/", element: <ListView /> },
        { path: "/profile", element: <ProfileView /> },
        { path: "/entry", element: <Editor /> },
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
