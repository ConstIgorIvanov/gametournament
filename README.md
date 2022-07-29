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

## Installation

[![NPM](https://nodei.co/npm/gametournaments.png)](https://nodei.co/npm/gametournaments)

## Usage

```javascript
import GAMETOURNAMENTS from 'gametournaments'
```

## API

#### getMatches

Parses all matches from the `https://game-tournaments.com/dota-2` page

| Option |  Type   | Default Value |             Description              |
| :----: | :-----: | :-----------: | :----------------------------------: |
|  page  | number? |       -       |                 Page                 |
|  time  |  Time?  |       -       | Filter matches by time(past/current) |

type Time = "past" | "current"

```javascript
HLTV.getMatches({page: '2'}).then((res) => {
  ...
})
```

#### getTournamentsMatches

Parses all matches from the `https://game-tournaments.com/dota-2/${tournament}` page

|   Option   |  Type   | Default Value |                   Description                    |
| :--------: | :-----: | :-----------: | :----------------------------------------------: |
| tournament | string? |       -       | Check mathches by tournaments (past and current) |

```javascript
HLTV.getTournamentsMatches({ tournament: 'esl-one-malaysia-2022/north-america' }).then((res) => {
  ...
})
```

tournamentlink for search by tournament stored in Match.event.tournamentLink
