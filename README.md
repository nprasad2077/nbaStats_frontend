# NBA Stats Frontend Web-Application
React Frontend application for my NBA stats API.

# Deployed Backend API

- [Github Repo](https://github.com/nprasad2077/nbaStats)
- [Link to all players deployed backend](https://nba-stats-db.herokuapp.com/api/playerdata/?format=json)

# Plan

1. Data collection 
	- Selenium - live data from dyanic websites.
	- Beautiful soap/scrapy - historical static data.
	- Live data - websocket connections or periodic updates.  
&nbsp;  

2. Backend API
	-REST or GraphQL
	~~- Flask (Python): Lightweight and easy to set up, suitable for small to medium projects.~~
	- Django (Python): A more comprehensive framework that includes an ORM and admin panel out-of-the-box.
	~~- Express (Node.js): A fast and minimalistic web framework for Node.js.~~
	~~- Ruby on Rails (Ruby): A powerful and mature full-stack web framework.~~
&nbsp;  

3. Frontend
	- React/Redux
	~~- D3.js~~
	- Chart.js
	~~- Highcharts~~
	~~- Websockets or Server-Sent Events~~
&nbsp;  
4. Deploy


# Proposed visualizations (initial)

1. Top Scorers: Create a bar chart to display the top-scoring players for a particular season or across multiple seasons. You can also filter this by team to show top scorers for specific teams.

2. Field Goal Percentage vs. Three-Point Percentage: Generate a scatter plot to compare players' field goal percentages with their three-point percentages. This can help identify players who excel at long-range shooting and their overall shooting efficiency.

3. Player Performance by Age: Using a line chart, you can track the performance of players (such as points per game, rebounds, assists, etc.) as they age. This could reveal how a player's performance changes throughout their career.

4. Team Performance: Create a grouped bar chart to compare the average points, rebounds, assists, etc., for each team in a given season or across multiple seasons. This can help you understand which teams excel in specific aspects of the game.

5. Player Shooting Efficiency: Visualize the effective field goal percentage (eFG%) for players in a bar chart or scatter plot to identify the most efficient shooters in the league.

6. Correlations between different stats: Investigate the relationships between various player statistics, like points per game and assists per game or rebounds per game and blocks per game, using scatter plots. This can help you identify trends or strong correlations between different stats.

7. To be continued...