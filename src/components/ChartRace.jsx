import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChartRace = ({ data, currentSeason }) => {
  const ref = useRef();

  console.log(data);

  const margin = {top: 30, right: 0, bottom: 10, left: 30}; // Define margin

  // Sort data in descending order and get top 35
  const sortedData = [...data] // Create a copy of data
    .sort((a, b) => d3.descending(a.value, b.value))
    .slice(0, 35);

  useEffect(() => {
    const svg = d3.select(ref.current);

    const height = 500;
    const width = 800;

    svg.attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.value)]).nice()
      .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .domain(d3.range(sortedData.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);

    svg.selectAll("rect")
      .data(sortedData, d => d.player_name)
      .join(
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

    console.log(sortedData);
    svg.selectAll("text")
    .data(sortedData, d => d ? d.player_name : '')
    .join(
      enter => enter.append("text")
        .attr("x", d => x(d.value) + 5)
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => `${d.player_name}: ${d.value}`),
      update => update,
      exit => exit.remove()
    )
    .sort((a, b) => d3.descending(a.value, b.value))
    .transition().duration(2000)
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .attr("x", d => x(d.value) + 5)
    .each(function(d) {
      const node = d3.select(this);
      const i = d3.interpolateRound(parseInt(node.text().split(': ')[1]), d.value);
      d3.select(this)
        .transition()
        .tween("text", function() {
          return function(t) {
            node.text(`${d.player_name}: ${i(t)}`);
          };
        });
    });




    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text(`Top Scorers in NBA Season ${currentSeason}`);

  }, [data, currentSeason]);

  return <svg ref={ref}></svg>;
};

export default ChartRace;
