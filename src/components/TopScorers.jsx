import React from "react";
import { useState } from "react";
import axios from "axios";

// Components
import DropDownSeason from "./DropDownSeason";

const TopScorers = () => {
    const [topScorers, setTopScorers] = useState([])

    // const fetchTopScorers = async (season) => {
    //     try {
    //         const response = await fetch(`http://127.0.0.1:8000/api/playerdata/season/2023/`)
    //     }
    // }




  return (
    <div class="">
      <h1 class="text-3xl font-semibold antialiased text-center">
        Top Scorers
      </h1>
      <div>
        <DropDownSeason />
      </div>
    </div>
  );
};

export default TopScorers;
