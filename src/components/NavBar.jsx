import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => {
        setMenuOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  return (
    <div
      className="navbar bg-primary text-primary-content"
      data-theme="business"
    >
      <div className="container py-2 flex flex-wrap items-center justify-between">
        <Link to="/" className="btn btn-ghost normal-case text-3xl mb-2">
          NBA Data Explorer
        </Link>
        <button
          className="btn btn-ghost normal-case text-lg lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>
        <div
          className={`flex flex-col lg:flex-row ${
            menuOpen ? "block" : "hidden"
          } lg:block w-full lg:w-auto`}
        >
          <Link
            to="/lebron_james_shot_chart"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Shot Chart
          </Link>
          <Link
            to="/topscorers_totals"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Top Scorers
          </Link>
          <Link
            to="/top_pts_scatter_plot"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Top Scorers vs. Win Shares
          </Link>
          <Link
            to="/topscorers_playoffs"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Top Scorers (playoffs)
          </Link>
          <Link
            to="/top_pts_scatter_plot_2009_playoffs"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Top Scorers vs. Win Shares (playoffs)
          </Link>

          <Link
            to="/three_two_point_trends"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Shooting Trends
          </Link>
          <Link
            to="/top_rebounds_totals"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Top Rebounders
          </Link>
          <Link
            to="/top_assists_totals"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Top Assists
          </Link>
          <Link
            to="/top_assists_playoffs"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Top Assists (playoffs)
          </Link>
          <Link
            to="/ppg_histogram"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Points Per Game Histogram
          </Link>
          {/* <Link
            to="/bar_chart_race"
            className="btn btn-ghost normal-case text-base mt-2 lg:mt-0 lg:ml-2"
          >
            Bar Chart Race
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
