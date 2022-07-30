import { GameTournamentsConfig } from '../config'
import { GameTournamentsScraper } from '../scraper'
import { fetchPage } from '../utils'
import { Time } from '../shared/Time'
import { Game } from '../shared/Game'
import { MatchPreview } from '../shared/MatchPreview'
export interface GetMatchesArguments {
  game: Game
  time?: Time
  page?: string
  tournament?: string
}

export const getMatches =
  (config: GameTournamentsConfig) =>
  async ({
    page,
    time,
    game,
    tournament
  }: GetMatchesArguments): Promise<MatchPreview[]> => {
    const $ = GameTournamentsScraper(
      await fetchPage(
        `https://game-tournaments.com/${game}/${tournament}`,
        config.loadPage,
        game,
        page || '1',
        time || 'current'
      )
    )

    return $('tr')
      .toArray()
      .map((el) => {
        if (el.attr('rel')) {
          const id = el.attr('rel')
          const game = el.find('.ta.odtip').attr('href').split('/')[1]
          const date = el.find('span .sct').attr('data-time')
          const live = date ? false : true
          const event = {
            name: el.find('.ta.odtip').attr('title'),
            tournamentLink: el
              .find('.ta.odtip')
              .attr('href')
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
          let link = el
            .find('.mlink')
            .attr('href')
            .replace('/dota-2/', '')
            .replace('/csgo/', '')
            .replace('/hearthstone/', '')
            .replace('/lol/', '')
            .replace('/overwatch/', '')
          let score = el.find('.mbutton.tresult').attr('data-score')
          return { id, live, date, game, event, team1, team2, link, score }
        } else {
          return null
        }
      })
      .filter((element) => element != null)
  }
