import { stringify } from 'querystring'
import { GameTournamentsConfig } from '../config'
import { GameTournamentsScraper } from '../scraper'
import { Team } from '../shared/Team'
import { Event } from '../shared/Event'
import { fetchPage, getIdAt } from '../utils'
import { Time } from '../config'

export interface GetMatchesArguments {
  time?: Time
  page?: string
  tournament?: string
}
export interface MatchPreview {
  id: string
  team1?: Team
  team2?: Team
  date?: number
  format?: string
  event?: Event
  live: boolean
}
export const getMatches =
  (config: GameTournamentsConfig) =>
  async ({
    page,
    time,
    tournament
  }: GetMatchesArguments): Promise<MatchPreview[]> => {
    const $ = GameTournamentsScraper(
      await fetchPage(
        `https://game-tournaments.com/dota-2/${tournament}`,
        page || '1',
        time || Time.current,
        config.loadPage
      )
    )

    return $('tr')
      .toArray()
      .map((el) => {
        const id = el.attr('rel')
        const data = el.find('span .sct').attr('data-time')
        const live = data ? false : true
        const event = {
          name: el.find('.ta.odtip').attr('title'),
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

        return { id, live, data, event, team1, team2 }
      })
  }
