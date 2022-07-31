import { defaultConfig, defaultLoadPage, GameTournamentsConfig } from './config'
import { tournamentsConfig } from './tournaments/config'
import { getMatches } from './endpoints/getMatches'
import { getTournamentsMatches } from './endpoints/getTournamentsMatches'
import { getMatch } from './endpoints/getMatch'

export class GameTournaments {
  constructor(private config: Partial<GameTournamentsConfig> = {}) {
    if (config.httpAgent && !config.loadPage) {
      config.loadPage = defaultLoadPage(config.httpAgent)
    }

    if (!config.httpAgent) {
      config.httpAgent = defaultConfig.httpAgent
    }

    if (!config.loadPage) {
      config.loadPage = defaultConfig.loadPage
    }
  }

  getMatches = getMatches(this.config as GameTournamentsConfig)
  getTournamentsMatches = getTournamentsMatches(
    tournamentsConfig as GameTournamentsConfig
  )
  getMatch = getMatch(tournamentsConfig as GameTournamentsConfig)

  public createInstance(config: Partial<GameTournamentsConfig>) {
    return new GameTournaments(config)
  }
}
const gametournaments = new GameTournaments()

export default gametournaments
export { gametournaments as GAMETOURNAMENTS }

export type { GetMatchesArguments } from './endpoints/getMatches'
export type { GetTournamentsMatchesArguments } from './endpoints/getTournamentsMatches'
export type { MatchInfo, TeamDetails } from './endpoints/getMatch'

export type { Event } from './shared/Event'
export type { Game } from './shared/Game'
export type { Team } from './shared/Team'
export type { Time } from './shared/Time'
export type { MatchPreview } from './shared/MatchPreview'
export type { Players } from './shared/Players'
