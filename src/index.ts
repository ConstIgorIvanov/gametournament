import { defaultConfig, defaultLoadPage, GameTournamentsConfig } from './config'
import { tournamentsConfig } from './tournaments/config'
import { getMatches } from './endpoints/getMatches'
import { getTournamentsMatches } from './endpoints/getTournamentsMatches'
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

  public createInstance(config: Partial<GameTournamentsConfig>) {
    return new GameTournaments(config)
  }
}
const gametournaments = new GameTournaments()

export default gametournaments
export { gametournaments as GAMETOURNAMENTS }
export type { MatchPreview, GetMatchesArguments } from './endpoints/getMatches'
