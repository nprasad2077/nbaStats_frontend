import React, { useState, useEffect, useRef } from "react";
import { Chart, ScatterController, LinearScale, PointElement } from "chart.js";

Chart.register(ScatterController, LinearScale, PointElement);

const TopPtsScatterPlot = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/top_pts_scatter_plot_fast/"
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
    // Add your logic here to assign a unique color to each player
    // or use a predefined color map
    if (playerName === "James Harden") {
      return "rgba(255, 0, 0, 0.7)";
    }
    if (playerName === "LeBron James") {
      return "rgba(102, 0, 204, 0.6)";
    }
    if (playerName === "Kevin Durant") {
      return "rgba(0, 45, 98, 0.4)";
    }
    if (playerName === "Stephen Curry") {
      return "rgba(253, 185, 39, 1.0)";
    } 
    if (playerName === "Giannis Antetokounmpo") {
        return "rgba(0, 71, 26, 0.7)";
      }
      if (playerName === "Russell Westbrook") {
        return "rgba(26, 66, 138, 1.0)";
      } else {
      return "rgba(75, 192, 192, 0.6)";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold antialiased text-center my-4">
        Top 25 Scorers since 2013-2014 season visualized by Total Points/Win
        Shares per season
      </h1>
      <canvas ref={chartRef} />
    </div>
  );
};

export default TopPtsScatterPlot;
