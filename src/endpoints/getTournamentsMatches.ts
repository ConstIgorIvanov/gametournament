import { GameTournamentsConfig } from '../config'
import { GameTournamentsScraper } from '../scraper'
import { fetchPage } from '../utils'
import { Game } from '../shared/Game'
import { MatchPreview } from '../shared/MatchPreview'
import { replaceGame } from '../utils'
export interface GetTournamentsMatchesArguments {
  game: Game
  tournament?: string
}

export const getTournamentsMatches =
  (config: GameTournamentsConfig) =>
  async ({
    tournament,
    game
  }: GetTournamentsMatchesArguments): Promise<MatchPreview[]> => {
    const $ = GameTournamentsScraper(
      await fetchPage(
        `https://game-tournaments.com/${game}/${tournament}`,
        config.loadPage,
        game
      )
    )

    return $('tr')
      .toArray()
      .map((el) => {
        if (el.attr('rel')) {
          const id = el.attr('rel')
          const date = el.find('span .sct').attr('data-time')
          const live = date ? false : true
          const game = el.find('.ta.odtip').attr('href').split('/')[1]
          const event = {
            name: el.find('.ta.odtip').attr('title'),
            tournamentLink: replaceGame(el.find('.ta.odtip').attr('href')),
            logo:
              'https://game-tournaments.com' +
              el.find('.tournament-icon img').attr('src')
          }
          let team1 = {
            name: el.find('span .teamname.c1 b').text(),
            odds: el.find('.bet-percentage.bet1').text()
          }
          let team2 = {
            name: el.find('span .teamname.c2 b').text(),
            odds: el.find('.bet-percentage.bet2').text()
          }
          let link = replaceGame(el.find('.mlink').attr('href'))
          let score = el.find('.mbutton.tresult').attr('data-score')
          return { id, live, date, game, event, team1, team2, link, score }
        } else {
          return null
        }
      })
      .filter((element) => element != null)
  }
