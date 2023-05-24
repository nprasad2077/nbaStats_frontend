import React, { useState, useEffect, Fragment } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const seasons = [
  { season: "2022-2023" },
  { season: "2021-2022" },
  { season: "2020-2021" },
  { season: "2019-2020" },
  { season: "2018-2019" },
  { season: "2017-2018" },
  { season: "2016-2017" },
  { season: "2015-2016" },
  { season: "2014-2015" },
  { season: "2013-2014" },
  { season: "2012-2013" },
  { season: "2011-2012" },
  { season: "2010-2011" },
  { season: "2009-2010" },
];

const DropDownSeason = ({ selectedSeason, setSelectedSeason }) => {
  return (
    <div className="w-72 mt-4 text-black">
      <Listbox value={selectedSeason} onChange={setSelectedSeason}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
            <span className="block truncate">{selectedSeason.season}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {seasons.map((season, seasonIdx) => (
                <Listbox.Option
                  key={seasonIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                    }`
                  }
                  value={season}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {season.season}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default function ShotChart() {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const [shotData, setShotData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState("LeBron James");

  const fetchData = async (url) => {
    const result = await axios.get(url);
    if (result.data.next) {
      const nextPage = await fetchData(result.data.next);
      return [...result.data.results, ...nextPage];
    } else {
      return result.data.results;
    }
  };

  useEffect(() => {
    setLoading(true);
    const tailEndSeason = selectedSeason.season.split("-")[1];
    fetchData(
      `https://nba-stats-db.herokuapp.com/api/shot_chart_data/${player}/${tailEndSeason}/`
    )
      .then((data) => {
        setShotData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [selectedSeason]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-6 w-full">
        <progress data-theme='business' className="progress progress-success w-72"></progress>
      </div>
    );
  }

  const scaleFactor = 2;
  // Get a list of all unique opponent teams
  const allTeams = [...new Set(shotData.map((shot) => shot.opponent))];

  const traces = allTeams.flatMap((team) => {
    const teamShots = shotData.filter((shot) => shot.opponent === team);
    const madeShots = teamShots.filter((shot) => shot.result);
    const missedShots = teamShots.filter((shot) => !shot.result);

    return [
      {
        x: madeShots.map((shot) => shot.left * scaleFactor),
        y: madeShots.map((shot) => (472 - shot.top) * scaleFactor),
        name: "Made",
        marker: { color: "green", size: 5, opacity: 0.8 },
        mode: "markers",
        type: "scatter",
        text: madeShots.map(
          (shot) =>
            `Date: ${shot.date}<br>Quarter: ${shot.qtr}<br>Time Remaining: ${
              shot.time_remaining
            }<br>Distance: ${shot.distance_ft} ft<br>Shot Type: ${
              shot.shot_type
            }<br>${shot.team} ${"(" + shot.lebron_team_score + ")"} vs. ${
              shot.opponent
            } ${"(" + shot.opponent_team_score + ")"}<br>`
        ), // Add your information here
        hoverinfo: "text",
      },
      {
        x: missedShots.map((shot) => shot.left * scaleFactor),
        y: missedShots.map((shot) => (472 - shot.top) * scaleFactor),
        name: "Missed",
        marker: { color: "red", size: 5, opacity: 0.5 },
        mode: "markers",
        type: "scatter",
        text: missedShots.map(
          (shot) =>
            `Date: ${shot.date}<br>Quarter: ${shot.qtr}<br>Time Remaining: ${
              shot.time_remaining
            }<br>Distance: ${shot.distance_ft} ft<br>Shot Type: ${
              shot.shot_type
            }<br>${shot.team} ${"(" + shot.lebron_team_score + ")"} vs. ${
              shot.opponent
            } ${"(" + shot.opponent_team_score + ")"}<br>`
        ), 
        hoverinfo: "text",
      },
    ];
  });

  // Generate steps for the slider
  const steps = allTeams.map((team, i) => ({
    method: "restyle",
    args: [
      "marker.opacity",
      traces.map((_, j) => (j === i * 2 || j === i * 2 + 1 ? .8 : 0.1)),
    ],
    label: team,
  }));

  // Sort the steps array by the label property (i.e., team name)
  steps.sort((a, b) => a.label.localeCompare(b.label));

  // Add a step for 'all'
  steps.unshift({
    method: "restyle",
    args: ["marker.opacity", traces.map(() => 1)], // set opacity to 1 for all traces
    label: "All",
  });

  // rest of the slider configuration
  const slider = {
    steps: steps,
    active: 0, // 'all' step will be active by default
    currentvalue: {
      visible: true,
      prefix: "Opponent: ",
      xanchor: "right",
      font: { size: 20, color: "#666" },
      pad: { t: 0 }, // this will increase the height of the slider
    },
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <Plot
        data={traces}
        layout={{
          sliders: [slider],
          xaxis: { range: [0, 500 * scaleFactor], showticklabels: false },
          yaxis: { range: [0, 472 * scaleFactor], showticklabels: false },
          title: `${player} ${
            selectedSeason.season.split("-")[1]
          } Season/Playoff Shot Chart`,
          width: 500 * scaleFactor,
          height: 472 * scaleFactor,
          autosize: false,
          hovermode: "closest",
          showlegend: false,
          images: [
            {
              source: "/images/nbahalfcourt.png",
              xref: "x",
              yref: "y",
              x: 0,
              y: 472 * scaleFactor,
              sizex: 500 * scaleFactor,
              sizey: 472 * scaleFactor,
              sizing: "stretch",
              opacity: 1,
              layer: "below",
            },
          ],
        }}
      />
      <div className="mt-10">
        <DropDownSeason
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
        />
      </div>
    </div>
  );
}
