import { GameTournamentsConfig } from '../config'
import { GameTournamentsScraper } from '../scraper'
import { fetchPage } from '../utils'
import { Game } from '../shared/Game'
import { Players } from '../shared/Players'
import { replaceGame } from '../utils'
export interface GetMatchArguments {
  game: Game
  matchlink: string
  tournament?: string
}
export interface MatchInfo {
  team1: {
    name: string
    imageLink: string
    players: Players[]
    link: string
  }
  team2: {
    name: string
    imageLink: string
    players: Players[]
    link: string
  }
  tournamentsInfo: string
  date: string
  format: string
}

export const getMatch =
  (config: GameTournamentsConfig) =>
  async ({ matchlink, game }: GetMatchArguments): Promise<MatchInfo | any> => {
    const $ = GameTournamentsScraper(
      await fetchPage(
        `https://game-tournaments.com/${game}/${matchlink}`,
        config.loadPage,
        game
      )
    )
    const tournamentsInfo = $('legend a').text()
    const date = $('time').attr('datetime')
    const format = $('span.mtype').text()
    const team1 = {
      name: $('div.mop1').find('.mteamname a').text(),
      imageLink:
        'https://game-tournaments.com' + $('div.mop1').find('img').attr('src'),
      players: [
        {
          name: '',
          link: ''
        }
      ],
      link: replaceGame($('div.mop1').find('.mteamname a').attr('href'))
    }
    const team2 = {
      name: $('div.mop2').find('.mteamname a').text(),
      imageLink:
        'https://game-tournaments.com' + $('div.mop2').find('img').attr('src'),
      link: '',
      players: [
        {
          name: '',
          link: ''
        }
      ]
    }
    return {
      team1,
      team2,
      date,
      format,
      tournamentsInfo
    }
  }
