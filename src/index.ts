import { defaultConfig, defaultLoadPage, GameTournamentsConfig } from './config'
import { getMatches } from './endpoints/getMatches'

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
  public createInstance(config: Partial<GameTournamentsConfig>) {
    return new GameTournaments(config)
  }
  public TEAM_PLACEHOLDER_IMAGE =
    'https://www.hltv.org/img/static/team/placeholder.svg'

  public PLAYER_PLACEHOLDER_IMAGE =
    'https://static.hltv.org/images/playerprofile/bodyshot/unknown.png'
}
const gametournaments = new GameTournaments()

export default gametournaments
export { gametournaments as GAMETOURNAMENTS }
export type { MatchPreview, GetMatchesArguments } from './endpoints/getMatches'
