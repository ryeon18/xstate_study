import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Basic } from "./Basic";
import { Home } from "./Home";
import { Player } from "./Player";
import { ShowData } from "./DataFetch";
import { Traffic } from "./Traffic";
import { ConvertRedux } from "./ConvertRedux";

export function Switchs() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/traffic" element={<Traffic />} />
        <Route path="/player" element={<Player />} />
        <Route path="/fetch-data" element={<ShowData />} />
        <Route path="/Convert" element={<ConvertRedux />} />

      </Routes>
    </Router>
  );
}
