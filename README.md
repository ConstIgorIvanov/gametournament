<h1 align="center">
  <img src="https://game-tournaments.com/html/img/gtlogo.png" alt="GT logo" width="200">
  <br>
  The unofficial GameTournaments API
  <br>
</h1>

Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [getMatches](#getmatches)
  - [getTournamentsMatches](#getTournamentsMatches)
  - [getMatch](#getMatch)

## Installation

[![NPM](https://nodei.co/npm/gametournaments.png)](https://nodei.co/npm/gametournaments)

## Usage

```javascript
import GAMETOURNAMENTS from 'gametournaments'
```

## API

Match

| Option |  Type   | Default Value |                Description                |
| :----: | :-----: | :-----------: | :---------------------------------------: |
|   id   | string  |       -       |                    id                     |
|  game  | string  |       -       |   csgo/dota-2/lol/overwatch/hearthstone   |
|  live  | boolean |       -       |         The game is on right now          |
| team1  |  Team?  |       -       |              Left team name               |
| team2  |  Team?  |       -       |              Right team name              |
|  date  | string? |       -       |              Time game start              |
| event  | Event?  |       -       |                Event info                 |
| score  | string? |       -       |           Left-Right team score           |
|  link  | string? |       -       | not-full match link for use with getMatch |

Team

| Option |  Type  | Default Value | Description |
| :----: | :----: | :-----------: | :---------: |
|  name  | string |       -       |      -      |
|  odds  | string |       -       |      -      |

Event

|     Option     |  Type  | Default Value |                         Description                         |
| :------------: | :----: | :-----------: | :---------------------------------------------------------: |
|      name      | string |       -       |                              -                              |
| tournamentLink | string |       -       | not-full tournament link for use with getTournamentsMatches |
|      logo      | string |       -       |                              -                              |

#### getMatches

Parses all matches from the `https://game-tournaments.com/${game}` page

| Option |  Type   | Default Value |              Description              |
| :----: | :-----: | :-----------: | :-----------------------------------: |
|  game  | string  |       -       | csgo/dota-2/lol/overwatch/hearthstone |
|  page  | number? |       -       |                 Page                  |
|  time  |  Time?  |       -       | Filter matches by time(past/current)  |

type Time = "past" | "current"

```javascript
GAMETOURNAMENTS.getMatches({game: 'dota-2', page: '2'}).then((res) => {
  ...
})
```

#### getTournamentsMatches

Parses all matches from the `https://game-tournaments.com/${game}/${tournament}` page

|   Option   |  Type   | Default Value |                   Description                    |
| :--------: | :-----: | :-----------: | :----------------------------------------------: |
|    game    | string  |       -       |      csgo/dota-2/lol/overwatch/hearthstone       |
| tournament | string? |       -       | Check mathches by tournaments (past and current) |

```javascript
GAMETOURNAMENTS.getTournamentsMatches({ game: 'dota-2', tournament: 'esl-one-malaysia-2022/north-america' }).then((res) => {
  ...
})
```

tournamentlink for search by tournament stored in Match.event.tournamentLink

#### getMatch

MatchInfo

|     Option     |    Type     | Default Value |        Description        |
| :------------: | :---------: | :-----------: | :-----------------------: |
|     team1      | MathDetails |       -       |             -             |
|     team2      | MathDetails |       -       |             -             |
| tournamentInfo |   string    |       -       |             -             |
| tournamentLink |   string    |       -       | fot getTournamentsMatches |
|      date      |   string    |       -       |             -             |
|     format     |   string    |       -       |       Best of 2/3/1       |

TeamDetails

|  Option   |   Type    | Default Value |       Description        |
| :-------: | :-------: | :-----------: | :----------------------: |
|   name    |  string   |       -       |            -             |
| imageLink |  string   |       -       |            -             |
|  players  | Players[] |       -       | The game is on right now |
|   link    |  string   |       -       |       for getTeam        |

Players

| Option |  Type  | Default Value |  Description  |
| :----: | :----: | :-----------: | :-----------: |
|  name  | string |       -       |       -       |
|  link  | string |       -       | for getPlayer |

Parses info match from the `https://game-tournaments.com/${game}/${matchlink}` page

|  Option   |  Type  | Default Value |              Description              |
| :-------: | :----: | :-----------: | :-----------------------------------: |
|   game    | string |       -       | csgo/dota-2/lol/overwatch/hearthstone |
| matchlink | string |       -       |        Check info by MatchLink        |

```javascript
GAMETOURNAMENTS.getMatch({
    game: 'dota-2',
    matchlink:
      'moon-studio-asian-tigers-3/group-stage/mist-walker-vs-gorilla-468136'
  }).then((res) => {
  ...
})
```

matchlink for search by tournament stored in Match.link
