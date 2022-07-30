import { GameTournamentsConfig } from '../config'
import { GameTournamentsScraper } from '../scraper'
import { fetchPage } from '../utils'
import { Game } from '../shared/Game'

export interface GetMatchArguments {
  game: Game
  tournament?: string
}
export interface MatchInfo {}

export const getTournamentsMatches =
  (config: GameTournamentsConfig) =>
  async ({
    tournament,
    game
  }: GetMatchArguments): Promise<MatchInfo | null> => {
    const $ = GameTournamentsScraper(
      await fetchPage(
        `https://game-tournaments.com/${game}/${tournament}`,
        config.loadPage,
        game
      )
    )

    return null
  }
