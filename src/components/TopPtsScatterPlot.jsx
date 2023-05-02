import React, { useState, useEffect, useRef } from "react";
import { Chart, ScatterController, LinearScale, PointElement } from "chart.js";

Chart.register(ScatterController, LinearScale, PointElement);

const TopPtsScatterPlot = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://nba-stats-db.herokuapp.com/api/top_pts_scatter_plot_fast/"
      );
      const data = await response.json();
      prepareChartData(data);
    };

    const prepareChartData = (data) => {
      const datasets = [];

      // Group data by player_name
      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.player_name]) {
          acc[item.player_name] = [];
        }
        acc[item.player_name].push(item);
        return acc;
      }, {});

      // Generate datasets
      for (const playerName in groupedData) {
        const playerData = groupedData[playerName];
        const points = playerData.map((item) => ({
          x: item.season_pts,
          y: item.season_ws,
        }));

        const dataset = {
          label: playerName,
          data: points,
          borderColor: getColor(playerName),
          backgroundColor: getColor(playerName),
          showLine: false,
        };

        datasets.push(dataset);
      }

      if (chart) {
        chart.data = { datasets };
        chart.update();
      } else {
        const newChart = new Chart(chartRef.current, {
          type: "scatter",
          data: {
            datasets,
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: "PTS",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "WS",
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  title: (context) => {
                    return context[0].dataset.label;
                  },
                  beforeBody: (context) => {
                    const dataIndex = context[0].dataIndex;
                    const datasetIndex = context[0].datasetIndex;
                    const season =
                      groupedData[context[0].dataset.label][dataIndex].season;
                    return `Season: ${season}`;
                  },
                  label: (context) => {
                    const xLabel = context.parsed.x;
                    const yLabel = context.parsed.y;
                    return `PTS: ${xLabel}, WS: ${yLabel}`;
                  },
                },
              },
            },
          },
        });
        setChart(newChart);
      }
    };

    fetchData();
  }, [chart]);

  const getColor = (playerName) => {
    // Use color map

    const specifiedColors = {
      "Anthony Davis": "rgba(255, 58, 62, 0.5)",
      "James Harden": "rgba(255, 0, 0, 0.7)",
      "Joel Embiid": "rgba(237, 23, 76, 0.7)",
      "LeBron James": "rgba(85, 37, 130, 0.6)",
      "Kevin Durant": "rgba(0, 0, 0, 1.0)",
      "Shai Gilgeous-Alexander": "rgba(0, 45, 98, 0.4)",
      "Stephen Curry": "rgba(255, 199, 44, 1.0)",
      "Giannis Antetokounmpo": "rgba(0, 71, 27, 0.8)",
      "Russell Westbrook": "rgba(0 , 125, 195, 0.7)",
      "Nikola Jokić": "rgba(13, 34, 65, 0.8)",
      // "Damian Lillard": "rgba(245, 43, 39, 0.25)",
      "Devin Booker": "rgba(29, 17, 96, 0.85)",
      // "Kyrie Irving": "rgba(165, 215, 174, 0.86)",
      "Trae Young": "rgba(165, 215, 174, 0.86)",
      "Jayson Tatum": "rgba(6, 137, 30, 1.0)",
      "Luka Dončić": "rgba(45, 45, 45, 1.0)",
      "Zach LaVine": "rgba(206, 17, 65 , 1.0)",
      "Paul George": "rgba(253, 187, 48 , 0.4)",
      "Jimmy Butler": "rgba(152, 0, 46, 0.7)",
      "Andrew Wiggins": "rgba(19, 12, 13, 0.5)",
      "Bradley Beal": "rgba(0,42,92, 0.4)",
      "Damian Lillard": "rgba(224, 58, 62, 0.9)",
      "Chris Paul": "rgba(229, 95, 32, 0.8)",
      "Karl-Anthony Towns": "rgba(35, 97, 146, 0.8)",
      "Kemba Walker": "rgba(0, 120, 140, 0.7)",
      "Khris Middleton": "rgba(0, 71, 27, 0.3)",
      "Klay Thompson": "rgba(29, 66, 138, 1.0)",
      "Kyrie Irving": "rgba(0, 122, 51, 0.7)",
      "Nikola Vučević": "rgba(0, 125, 197, 0.3)",
      "Tobias Harris": "rgba(200, 16, 46, 0.7)",
      "CJ McCollum": "rgba(245, 43, 39, 0.3)"
    };

    if (specifiedColors[playerName]) {
      return specifiedColors[playerName];
    }

    // Calculate the brightness of a color based on its RGB components
    const calculateBrightness = (r, g, b) => {
      return (r * 299 + g * 587 + b * 114) / 1000;
    };

    // Generate a random color with sufficient brightness
    const randomColor = () => {
      const minBrightness = 128; // Min brightness level (0-255)
      const maxBrightness = 230; // Max brightness level (0-255)

      let color = "#";
      let r, g, b;

      do {
        r = (Math.random() * 256) | 0;
        g = (Math.random() * 256) | 0;
        b = (Math.random() * 256) | 0;
      } while (
        calculateBrightness(r, g, b) < minBrightness ||
        calculateBrightness(r, g, b) > maxBrightness
      );

      color += r.toString(16).padStart(2, "0");
      color += g.toString(16).padStart(2, "0");
      color += b.toString(16).padStart(2, "0");

      return color;
    };

    // Create a color map for player names
    const colorMap = JSON.parse(localStorage.getItem("playerColorMap")) || {};

    // Check if the player already has an assigned color
    if (!colorMap[playerName]) {
      colorMap[playerName] = randomColor();
      localStorage.setItem("playerColorMap", JSON.stringify(colorMap));
    }

    return colorMap[playerName];
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold antialiased text-center my-4">
        Top 25 Scorers since 2013-2014 season visualized by Total Points/Win
        Shares per season
      </h1>
      <canvas ref={chartRef} />
      <div class='flex flex-col'>
        <h3 class='font-sans subpixel-antialiased p-8'>
          Data is derived by first creating a list of the top 25 scoring players
          by total points in the regular season since the 2013-2014 season.
          Then, the players are mapped on the chart by Total Points on this
          X-axis and Win Shares on Y-Axis. This shows any correlation between a
          player's individual points scored, and win shares*{" "}
          {"(used to determine how many wins a player has contributed to his/her team)."}{" "}
        </h3>
        <p class='text-xs italic px-8 py-10'>
          *Win Shares is a basketball statistic that was created by basketball
          analyst and statistician Bill James. The statistic is designed to
          measure a player's overall contribution to his team's success, by
          calculating the number of wins a player has contributed to his team
          over the course of a season. The calculation of Win Shares is based on
          several factors, including a player's offensive and defensive
          contributions, as well as his playing time and the overall performance
          of his team. The result is a single number that represents the number
          of wins a player has contributed to his team. Win Shares can be used
          to compare players from different eras, as well as to evaluate a
          player's performance relative to his teammates and competitors. It is
          a popular statistic among basketball analysts and fans, as it provides
          a more comprehensive picture of a player's value than traditional
          statistics like points or rebounds.
        </p>
      </div>
    </div>
  );
};

export default TopPtsScatterPlot;
