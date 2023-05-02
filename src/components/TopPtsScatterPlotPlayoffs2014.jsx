import React, { useState, useEffect, useRef } from "react";
import { Chart, ScatterController, LinearScale, PointElement } from "chart.js";

Chart.register(ScatterController, LinearScale, PointElement);


const TopPtsScatterPlot2014 = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/top_25_PTS_ws/playoffs/2019/"
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

  const distinctColors = [
    "#E6194B", "#3CB44B", "#FFE119", "#4363D8", "#F58231", "#911EB4",
    "#46F0F0", "#F032E6", "#BCF60C", "#FABEBE", "#008080", "#E6BEFF",
    "#9A6324", "#FFFAC8", "#800000", "#AAFFC3", "#808000", "#FFD8B1",
    "#000075", "#A9A9A9", "#FFFFFF", "#000000"
  ];
  

  const getColor = (playerName) => {
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
  
    // Other parts of the getColor function...
  };
  
  
  
  

  return (
    <div>
      <h1 className="text-3xl font-semibold antialiased text-center my-4">
        Top 25 Scorers in the Playoffs since 2013-2014 season visualized by Total Points/Win
        Shares per season {"(playoffs)"}
      </h1>
      <canvas ref={chartRef} />
    </div>
  )
}

export default TopPtsScatterPlot2014