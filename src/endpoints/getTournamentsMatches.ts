import { GameTournamentsConfig } from '../config'
import { GameTournamentsScraper } from '../scraper'
import { Team } from '../shared/Team'
import { Event } from '../shared/Event'
import { fetchPage } from '../utils'
import { Time } from '../shared/Time'

export interface GetMatchesArguments {
  time?: Time
  page?: string
  tournament?: string
}
export type MatchPreview = {
  id: string
  team1?: Team
  team2?: Team
  date?: number
  format?: string
  event?: Event
  live: boolean
  score?: string
} | null
export const getTournamentsMatches =
  (config: GameTournamentsConfig) =>
  async ({ tournament }: GetMatchesArguments): Promise<MatchPreview[]> => {
    const $ = GameTournamentsScraper(
      await fetchPage(
        `https://game-tournaments.com/dota-2/${tournament}`,
        config.loadPage
      )
    )

    return $('tr')
      .toArray()
      .map((el) => {
        if (el.attr('rel')) {
          const id = el.attr('rel')
          const data = el.find('span .sct').attr('data-time')
          const live = data ? false : true
          const event = {
            name: el.find('.ta.odtip').attr('title'),
            tournamentLink: el
              .find('.ta.odtip')
              .attr('href')
              .replace('/dota-2/', ''),
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
          return { id, live, data, event, team1, team2, score }
        } else {
          return null
        }
      })
      .filter((element) => element != null)
  }
