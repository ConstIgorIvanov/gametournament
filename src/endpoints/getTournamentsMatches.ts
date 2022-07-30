import { GameTournamentsConfig } from '../config'
import { GameTournamentsScraper } from '../scraper'
import { Team } from '../shared/Team'
import { Event } from '../shared/Event'
import { fetchPage } from '../utils'
import { Time } from '../shared/Time'
import { Game } from '../shared/Game'

export interface GetMatchesArguments {
  game: Game
  tournament?: string
}
export type MatchPreview = {
  id: string
  live: boolean
  game: string
  team1?: Team
  team2?: Team
  date?: string
  event?: Event
  score?: string
} | null
export const getTournamentsMatches =
  (config: GameTournamentsConfig) =>
  async ({
    tournament,
    game
  }: GetMatchesArguments): Promise<MatchPreview[]> => {
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
            tournamentLink: el
              .find('.ta.odtip')
              .attr('href')
              .replace('/dota-2/', '')
              .replace('/dota-2/', '')
              .replace('/csgo/', '')
              .replace('/hearthstone/', '')
              .replace('/lol/', '')
              .replace('/overwatch/', ''),
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

          let score = el.find('.mbutton.tresult').attr('data-score')
          return { id, live, date, game, event, team1, team2, score }
        } else {
          return null
        }
      })
      .filter((element) => element != null)
  }
