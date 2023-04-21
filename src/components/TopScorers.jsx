import React from "react";

// Components
import DropDownSeason from "./DropDownSeason";

const TopScorers = () => {
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
