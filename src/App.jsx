import { useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import { MainView } from "./components/main-view/main-view";
import { ListView } from "./components/list-view/list-view";
import { LoginView } from "./components/login-view/login-view";
import { CreateEntry } from "./components/create-edit-view/create-entry";
import { EditEntry } from "./components/create-edit-view/edit-entry";
import { SettingsView } from "./components/settings/settings-view";
import { SignupView } from "./components/signup-view,jsx/signup-view";
import { SearchView } from "./components/navbar/search-view";

function App() {
  const user = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.id);
  const emailSaved = useSelector((state) => state.user.email);
  const photo = useSelector((state) => state.user.photo);

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const router = createBrowserRouter([
    { path: "/signup", element: <SignupView /> },
    {
      path: "/",
      element: user ? 
          <MainView user={user} photo={photo} />
      : <LoginView />,
      children: [
        { path: "/", element: <ListView userId={userId}/> },
        { path: "/settings", element: <SettingsView db={db} storage={storage} user={user} userId={userId} emailSaved={emailSaved} /> },
        { path: "/entry/new", element: <CreateEntry userId={userId} /> },
        { path: "/entry/:entryId/edit", element: <EditEntry userId={userId} /> },
        { path: "/search/tag", element: <SearchView userId={userId} /> },
      ]
    },
  ]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
}

export default App
