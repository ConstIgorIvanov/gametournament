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

export interface TeamDetails {
  name: string
  imageLink: string
  players: Players[]
  link: string
}
export interface MatchInfo {
  team1: TeamDetails
  team2: TeamDetails
  tournamentInfo: string
  tournamentLink: string
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
    const tournamentInfo = $('legend a').text()
    const tournamentLink = replaceGame($('.match-nav-mobile a').attr('href'))
    const date = $('time').attr('datetime')
    const format = $('span.mtype').text()
    const team1 = {
      name: $('div.mop1').find('.mteamname a').text(),
      imageLink:
        'https://game-tournaments.com' + $('div.mop1').find('img').attr('src'),
      players: $('div.teampep')
        .find('.col-xs-6')
        .find('a')
        .toArray()
        .map((el) => {
          const name = el.text()
          const link = replaceGame(el.attr('href'))
          return { name, link }
        })
        .slice(0, 5),
      link: replaceGame($('div.mop1').find('.mteamname a').attr('href'))
    }
    const team2 = {
      name: $('div.mop2').find('.mteamname a').text(),
      imageLink:
        'https://game-tournaments.com' + $('div.mop2').find('img').attr('src'),
      players: $('div.teampep')
        .find('.col-xs-6.text-right')
        .find('a')
        .toArray()
        .map((el) => {
          const name = el.text()
          const link = replaceGame(el.attr('href'))
          return { name, link }
        }),
      link: replaceGame($('div.mop2').find('.mteamname a').attr('href'))
    }
    return {
      team1,
      team2,
      date,
      format,
      tournamentLink,
      tournamentInfo
    }
  }
