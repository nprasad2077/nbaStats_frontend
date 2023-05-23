import React from "react";
import { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import TopScorersChartTotals from "./TopScorersChartTotals";

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
    <div className="w-72 my-4 text-black">
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

const TopScorersTotals = () => {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const [topScorers, setTopScorers] = useState([]);

  useEffect(() => {
    const tailEndSeason = selectedSeason.season.split("-")[1];
    fetch(
      `https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/${tailEndSeason}/`
    )
      .then((response) => response.json())
      .then((data) => setTopScorers(data.results));
  }, [selectedSeason]);

  return (
    <div className="text-center text-slate-600">
      <div className="flex flex-col items-start">
        <DropDownSeason
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
        />
      </div>

      <h1 className="text-3xl font-semibold antialiased text-center my-4">
        Top 20 Scorers by Total Points for {selectedSeason.season} Season
      </h1>
      <div className="mt-4">
        <TopScorersChartTotals topScorers={topScorers} />
      </div>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:grid-rows-5 lg:grid-flow-col">
        {topScorers.map((player, index) => (
          <li key={player.id} className="font-sem">
            {player.player_name} - {player.PTS} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopScorersTotals;
