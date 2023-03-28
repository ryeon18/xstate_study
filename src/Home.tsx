import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="wrap">
      <h1>Xstate Study</h1>
      <nav>
        <ol>
          <li>
            <Link to="/basic">basic</Link>
          </li>
          <li>
            <Link to="/traffic">traffic</Link>
          </li>
          <li>
            <Link to="/player">Player</Link>
          </li>
          <li>
            <Link to="/fetch-data">DataFetch</Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
