// src/App.tsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import UserDetails from "./components/UserDetails";

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<Array<any>>([]);

  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (user: any) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === user.id)
        ? prev.filter((fav) => fav.id !== user.id)
        : [...prev, user]
    );
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SearchBar
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
          />
        }
      />
      <Route
        path="/user/:username"
        element={
          <UserDetails
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setShowFavorites={setShowFavorites}
          />
        }
      />
    </Routes>
  );
};

export default App;
