import React from "react";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: { id: number; login: string; avatar_url: string };
  isFavorite?: boolean;
  onToggleFavorite: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  isFavorite = false,
  onToggleFavorite,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #ccc",

        marginBottom: "5px",
      }}
    >
      <Link
        to={`/user/${user.login}`}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <img
          src={user.avatar_url}
          alt={user.login}
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          loading="lazy"
        />
        <p style={{ marginLeft: "10px", color: "black" }}>@{user.login}</p>
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <img
          src={isFavorite ? "/star-active.svg" : "/star.svg"}
          className="star"
          style={{ height: "20px" }}
          alt=""
        />
      </button>
    </div>
  );
};

export default UserCard;
