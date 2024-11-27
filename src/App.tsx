import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FerstPage from "./Page/FerstPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ASRPage from "./Page/ASRPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FerstPage />} />
        <Route path="/ASR" element={<ASRPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
