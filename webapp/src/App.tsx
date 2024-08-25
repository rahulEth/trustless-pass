import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SaveCredentials from "./pages/SaveCredentials";
import CheckCredentials from "./pages/CheckCredentials";
import { ROUTING_PATH } from "./constants";
import HomePageLayout from "./layout/HomePageLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePageLayout,
    children: [
      {
        path: ROUTING_PATH.HOME,
        Component: Home,
      },
      {
        path: ROUTING_PATH.CHECK_CREDS,
        Component: CheckCredentials,
      },
      {
        path: ROUTING_PATH.SAVE_CREDS,
        Component: SaveCredentials,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
