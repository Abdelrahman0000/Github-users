import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import UserCard from "./UserCard";

const fetchUsers = async (query: string) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}`
  );
  if (!response.ok) throw new Error("Failed to fetch users");
  const data = await response.json();
  return data.items || [];
};

interface SearchBarProps {
  favorites: Array<any>;

  toggleFavorite: (user: any) => void;

  showFavorites: boolean;

  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  favorites,
  toggleFavorite,
  showFavorites,
  setShowFavorites,
}) => {
  const [query, setQuery] = useState("");

  const {
    data: users = [],
    refetch,
    isError,
    isLoading,
  } = useQuery<Array<{ id: number; [key: string]: any }>>({
    queryKey: ["githubUsers", query],
    queryFn: () => fetchUsers(query),
    enabled: false,
  });

  useEffect(() => {
    if (query.trim().length >= 3) {
      refetch();
    }
  }, [query, refetch]);

  return (
    <div className="searchContainer">
      <div className="searchBar">
        {!showFavorites ? (
          <div className="searchBarInner">
            <span>
              {" "}
              <img
                src="/search.svg"
                className="searchIcon"
                alt=""
                loading="lazy"
              />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search GitHub Users"
            />
          </div>
        ) : (
          <div className="searchBarInner">
            <span onClick={() => setShowFavorites((prev) => !prev)}>
              {" "}
              <img src="/arrow.svg" className="searchIcon" alt="" />
            </span>

            <h3>Favorites</h3>
          </div>
        )}
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          style={{
            marginLeft: "10px",
          }}
          aria-label={
            showFavorites ? "Remove from favorites" : "Add to favorites"
          }
        >
          <img
            src={showFavorites ? "/star-active.svg" : "/star.svg"}
            className="star"
            alt=""
            loading="lazy"
          />
        </button>
      </div>

      {isError ? (
        <div
          className="usersContainer "
          style={{ display: "flex", justifyContent: "center" }}
        >
          {" "}
          <p>Error fetching users. Try again!</p>{" "}
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          {!showFavorites ? (
            users.length > 0 ? (
              <div className="usersContainer activeUsersContainer ">
                {users.map((user: any) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isFavorite={favorites.some((fav) => fav.id === user.id)}
                    onToggleFavorite={() => toggleFavorite(user)}
                  />
                ))}{" "}
              </div>
            ) : (
              <div
                className="usersContainer  "
                style={{ display: "flex", justifyContent: "center" }}
              >
                {" "}
                {isLoading ? <p>loading</p> : <p>No users found.</p>}{" "}
              </div>
            )
          ) : favorites.length > 0 ? (
            <div className="usersContainer activeUsersContainer ">
              {favorites.map((user: any) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isFavorite
                  onToggleFavorite={() => toggleFavorite(user)}
                />
              ))}{" "}
            </div>
          ) : (
            <div
              className="usersContainer "
              style={{ display: "flex", justifyContent: "center" }}
            >
              {" "}
              <p>No favorites yet.</p>{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
