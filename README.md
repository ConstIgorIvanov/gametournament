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

## Installation

[![NPM](https://nodei.co/npm/gametournaments.png)](https://nodei.co/npm/gametournaments)

## Usage

```javascript
import GAMETOURNAMENTS from 'gametournaments'
```

## API

#### getMatches

Parses all matches from the `https://game-tournaments.com/dota-2` page (1 request)

|   Option   |  Type   | Default Value |                          Description                           |
| :--------: | :-----: | :-----------: | :------------------------------------------------------------: |
|    page    | number? |       -       |                  Filter matches by event ID.                   |
|    time    |  Time?  |       -       |                 Filter matches by event type.                  |
| tournament | string? |       -       | Filter matches by pre-set categories. Overrides other filters. |

enum Time {
past = 'past',
current = 'current'
}

```javascript
HLTV.getMatches({}).then((res) => {
  ...
})
```
