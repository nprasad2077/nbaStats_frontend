import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./App.css";

// Components
import Home from "./components/Home";
import TopScorers from "./components/topScorers";

function App() {
  return (
    <div class='bg-gray-100 min-h-screen'>
      <h1 class="text-3xl font-bold underline p-4 bg-blue-600 text-white">NBA Data</h1>

      <nav class='p-4 bg-blue-500'>
        <ul class='flex space-x-4'>
          <li>
            <Link to="/" class='text-white'>Home</Link>
          </li>
          <li>
            <Link to="/topscorers" class='text-white'>Top Scorers</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  path="/topscorers" element={<TopScorers/>} />
      </Routes>
    </div>
  );
}

export default App;