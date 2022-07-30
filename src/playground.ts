import { GAMETOURNAMENTS } from './index'
import { Time } from './shared/Time'
const log = (promise: Promise<any>) =>
  promise
    .then((res) => console.dir(res, { depth: null }))
    .catch((err) => console.log(err))

// log(GAMETOURNAMENTS.getMatches({ game: 'csgo', page: '1', time: 'current' }))

log(
  GAMETOURNAMENTS.getTournamentsMatches({
    game: 'csgo',
    tournament: 'esl-one-malaysia-2022/north-america'
  })
)
