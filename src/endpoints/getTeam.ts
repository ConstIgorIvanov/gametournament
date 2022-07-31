import { GameTournamentsConfig } from '../config'
import { GameTournamentsScraper } from '../scraper'
import { fetchPage } from '../utils'
import { Game } from '../shared/Game'
import { Player } from '../shared/Player'
import { replaceGame } from '../utils'
import { MatchPreview } from '../shared/MatchPreview'

export interface GetMatchArguments {
  game: Game
  teamlink: string
}

export interface TeamInfo {
  name: string
  teamLogo: string
  players: Player[]
  matches: MatchPreview[]
  region: {
    name: string
    place: string
  }
  placeinWorld: string
  form: string
  rating: {
    win: string
    percentage: string
  }
}

export const getTeam =
  (config: GameTournamentsConfig) =>
  async ({ teamlink, game }: GetMatchArguments): Promise<TeamInfo> => {
    const $ = GameTournamentsScraper(
      await fetchPage(
        `https://game-tournaments.com/${game}/${teamlink}`,
        config.loadPage,
        game
      )
    )

    const name = ''
    const teamLogo = ''

    const players = [
      {
        name: 'string',
        link: 'string',
        role: 'string'
      }
    ]

    const matches = $('tr')
      .toArray()
      .map((el) => {
        if (el.attr('rel')) {
          const id = el.attr('rel')
          const game = el.find('.ta.odtip').attr('href').split('/')[1]
          const date = el.find('span .sct').attr('data-time')
          const live = date ? false : true
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

    const region = {
      name: 'string',
      place: 'string'
    }
    const placeinWorld = ''
    const form = ''
    const rating = { win: '', percentage: '' }

    return {
      name,
      teamLogo,
      players,
      region,
      placeinWorld,
      form,
      rating,
      matches
    }
  }
