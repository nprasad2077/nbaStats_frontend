import React from "react";
import ShotChart from "./ShotChart";
import ShotEfficiencyChart from "./ShotEfficiencyChart";

const LeBronJamesShotChart = () => {
  return (
    <div class='self-center'>
      {/* <ShotChart playerName="Lebron James" season="2018" class='self-center' /> */}
      <ShotEfficiencyChart />
    </div>
  );
};

export default LeBronJamesShotChart;
