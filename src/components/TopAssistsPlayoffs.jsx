import React from "react";
import { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import TopAssistsChartPlayoffs from "./TopAssistsChartPlayoffs";

const seasons = [
  { season: "2021-2022" },
  { season: "2020-2021" },
  { season: "2019-2020" },
  { season: "2018-2019" },
  { season: "2017-2018" },
  { season: "2016-2017" },
  { season: "2015-2016" },
  { season: '2014-2015' },
  { season: '2013-2014' },
  { season: '2012-2013' },
  { season: '2011-2012' },
  { season: '2010-2011' },
  { season: '2009-2010' },
];

const DropDownSeason = ({ selectedSeason, setSelectedSeason }) => {
  return (
    <div className="w-72 mt-8">
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

const TopAssistsPlayoffs = () => {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const [topAssists, setTopAssists] = useState([]);

  useEffect(() => {
    const tailEndSeason = selectedSeason.season.split("-")[1];
    fetch(`http://127.0.0.1:8000/api/top_assists/playoffs/${tailEndSeason}/`)
      .then((response) => response.json())
      .then((data) => setTopAssists(data.results));
  }, [selectedSeason]);

  return (
    <div class="text-center">
      <div class="ml-10">
        <DropDownSeason
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
        />
      </div>

      <h1 class="text-3xl font-semibold antialiased text-center mb-4">
        Top 20 by Total Assists for {selectedSeason.season} Playoffs
      </h1>

      <div class="mt-4">
        <TopAssistsChartPlayoffs topAssists={topAssists} />
      </div>

      <ul>
        {topAssists.map((player) => (
          <li key={player.id} class="font-sem">
            {player.player_name} - {player.AST} Assists
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default TopAssistsPlayoffs;