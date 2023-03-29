import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="wrap">
      <h1>Xstate Study</h1>
      <nav>
        <ul>
          <li className="main-list">
            <Link to="/basic">1. basic</Link>
          </li>
          <li className="main-list">
            <Link to="/traffic">2. traffic</Link>
          </li>
          <li className="main-list">
            <Link to="/player">3. Player</Link>
          </li>
          <li className="main-list">
            <Link to="/fetch-data">4. DataFetch</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
