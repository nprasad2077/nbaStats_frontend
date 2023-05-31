import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChartRace = ({ data, currentSeason }) => {
  const ref = useRef();

  const margin = {top: 30, right: 0, bottom: 10, left: 30}; // Define margin

  useEffect(() => {
    const sortedData = [...data] // Create a copy of data
      .sort((a, b) => d3.descending(a.value, b.value))
      .slice(0, 35);

    const svg = d3.select(ref.current);

    const height = 500;
    const width = 800;

    svg.attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.value)]).nice()
      .range([margin.left, width - margin.right - 100]); // Subtracted 100 to create space for labels

    const y = d3.scaleBand()
      .domain(d3.range(sortedData.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);

    const t = svg.transition()
      .duration(2000);

    const rect = svg.selectAll("rect")
      .data(sortedData, d => d.player_name)
      .join(
        enter => enter.append('rect')
          .attr("y", (d, i) => y(i))
          .attr("height", y.bandwidth())
          .attr("width", 0) // Start width from 0
          .attr('fill', d => d.color),
        update => update,
        exit => exit.remove()
      )
      .sort((a, b) => d3.descending(a.value, b.value));

    rect.transition(t)
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.value));

    const label = svg.selectAll("text.label")
      .data(sortedData, d => d.player_name)
      .join(
        enter => enter.append("text").attr("class", "label")
          .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
          .attr("x", x(0) + 5)
          .attr("dy", "0.35em")
          .text(d => `${d.player_name}: ${d.value}`),
        update => update,
        exit => exit.remove()
      )
      .sort((a, b) => d3.descending(a.value, b.value));

    label.transition(t)
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("x", d => x(d.value) + 5)
      .text(d => `${d.player_name}: ${d.value}`);

    if (currentSeason) {
      let title = svg.selectAll("text.title")
        .data([currentSeason]);
      
      title = title
        .enter()
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .merge(title);
      
      title.text(`Top Scorers in NBA Season ${currentSeason}`);
    }

  }, [data, currentSeason]);

  return <svg ref={ref}></svg>;
};

export default ChartRace;
