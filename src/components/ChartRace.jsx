import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const ChartRace = () => {
  const ref = useRef();

  // Initial data
  const [data, setData] = useState([
    { name: 'A', value: 12, color: 'blue' },
    { name: 'B', value: 16, color: 'red' },
    { name: 'C', value: 60, color: 'green' },
    { name: 'D', value: 22, color: 'gray' },
    { name: 'E', value: 34, color: 'pink' },
    { name: 'F', value: 41, color: 'yellow' },
    { name: 'G', value: 50, color: 'black' },
    // More data...
  ]);

  // Sort data in descending order
  const sortedData = [...data].sort((a, b) => d3.descending(a.value, b.value));

  useEffect(() => {
    const svg = d3.select(ref.current);

    const height = 500;
    const width = 500;

    svg.attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.value)]).nice()
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(d3.range(sortedData.length))
      .rangeRound([0, height])
      .padding(0.1);

    const bars = svg.selectAll("rect")
      .data(sortedData, d => d.name);

    bars.join(
        enter => enter.append('rect')
          .attr('fill', d => d.color)
          .attr('y', (d, i) => y(i))
          .attr('width', d => x(d.value))
          .attr('height', y.bandwidth()),
        update => update,
        exit => exit.remove()
      )
      .sort((a, b) => d3.descending(a.value, b.value))
      .transition().duration(2000)
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.value));

  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(data => data.map(item => ({
        name: item.name,
        value: item.value + Math.round(Math.random() * 10), // Change value
        color: item.color
      })));
    }, 2000); // Every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return <svg ref={ref}></svg>;
};

export default ChartRace;
