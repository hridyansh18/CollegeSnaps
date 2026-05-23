import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home
from "./pages/Home";

import Login
from "./pages/Login";

import Album
from "./pages/Album";

import ProtectedRoute
from "./components/ProtectedRoute";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected Home */}
        <Route

          path="/"

          element={

            <ProtectedRoute>

              <Home />

            </ProtectedRoute>

          }

        />

        {/* Protected Album */}
        <Route

          path="/album"

          element={

            <ProtectedRoute>

              <Album />

            </ProtectedRoute>

          }

        />

      </Routes>

    </BrowserRouter>

  );

}