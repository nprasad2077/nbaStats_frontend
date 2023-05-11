import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

export default function ShotChart() {
  const [shotData, setShotData] = useState([]);

  useEffect(() => {
    axios.get('https://nba-stats-db.herokuapp.com/api/shot_chart_data/LeBron%20James/2018/')
      .then(res => {
        setShotData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // Check if shotData is loaded and has the results property
  if (!shotData || !shotData.results) {
    return <div>Loading...</div>;
  }

  const madeShots = shotData.results.filter(shot => shot.result);
  const missedShots = shotData.results.filter(shot => !shot.result);

  return (
    <Plot 
      data={[
        {
          x: madeShots.map(shot => shot.left),
          y: madeShots.map(shot => 472 - shot.top), // Directly map 'top' to y coordinate
          name: 'Made',
          marker: {color: 'green', size: 5},
          mode: 'markers',
          type: 'scatter'
        },
        {
          x: missedShots.map(shot => shot.left),
          y: missedShots.map(shot => 472 - shot.top), // Directly map 'top' to y coordinate
          name: 'Missed',
          marker: {color: 'red', size: 5},
          mode: 'markers',
          type: 'scatter'
        }
      ]}
      layout={{
        xaxis: {range: [0, 500]},
        yaxis: {range: [0, 472]},
        title: 'Shot Chart',
        width: 500,
        height: 472,
        autosize: false,
        hovermode: 'closest',
        showlegend: false,
        images: [{
          source: '/images/nbahalfcourt.png',
          xref: 'x',
          yref: 'y',
          x: 0,
          y: 472,
          sizex: 500,
          sizey: 472,
          sizing: 'stretch',
          opacity: 1.0,
          layer: 'below'
        }]
      }}
    />
  );
}
