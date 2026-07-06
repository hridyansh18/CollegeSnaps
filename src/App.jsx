import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import Home
from "./pages/Home";

import Login
from "./pages/Login";

import Albums
from "./pages/Album";

import AlbumDetails
from "./pages/AlbumDetails";

import Loader
from "./components/Loader";

import ProtectedRoute
from "./components/ProtectedRoute";

export default function App() {

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setLoading(false);

      }, 2500);

    return () =>
      clearTimeout(timer);

  }, []);

  /* Loader */
  if (loading) {

    return <Loader />;

  }

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route

          path="/login"

          element={<Login />}

        />

        {/* Home */}
        <Route

          path="/"

          element={

            <ProtectedRoute>

              <Home />

            </ProtectedRoute>

          }

        />

        {/* Albums */}
        <Route

          path="/albums"

          element={

            <ProtectedRoute>

              <Albums />

            </ProtectedRoute>

          }

        />

        {/* Album Details */}
        <Route

          path="/album/:id"

          element={

            <ProtectedRoute>

              <AlbumDetails />

            </ProtectedRoute>

          }

        />

      </Routes>

    </BrowserRouter>

  );

}