import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SaveCredentials from "./pages/SaveCredentials";
import CheckCredentials from "./pages/CheckCredentials";
import { ROUTING_PATH } from "./constants";
import HomePageLayout from "./layout/HomePageLayout";
import RequireAuth from "./components/RequireAuth";

/* const router = createBrowserRouter([
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
]); */

function App() {
  return (
    <Routes>
      <Route path={ROUTING_PATH.HOME} element={<HomePageLayout />}>
        <Route index element={<Home />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route
            path={ROUTING_PATH.CHECK_CREDS}
            element={<CheckCredentials />}
          />
          <Route path={ROUTING_PATH.SAVE_CREDS} element={<SaveCredentials />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
