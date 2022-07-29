import { GAMETOURNAMENTS } from './index'
import { Time } from './shared/Time'
const log = (promise: Promise<any>) =>
  promise
    .then((res) => console.dir(res, { depth: null }))
    .catch((err) => console.log(err))

log(GAMETOURNAMENTS.getMatches({ page: '1', time: 'past' }))

// log(
//   GAMETOURNAMENTS.getTournamentsMatches({
//     tournament: 'esl-one-malaysia-2022/north-america'
//   })
// )
