import { GameTournamentsConfig } from '../config'
import { GameTournamentsScraper } from '../scraper'
import { fetchPage } from '../utils'
import { Game } from '../shared/Game'
import { Player } from '../shared/Player'
import { replaceGame } from '../utils'
import { MatchPreview } from '../shared/MatchPreview'
import { Lang } from '../shared/Lang'

export interface GetMatchArguments {
  game: Game
  teamlink: string
  lang?: Lang
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
  async ({
    teamlink,
    game,
    lang
  }: GetMatchArguments): Promise<TeamInfo | any> => {
    const $ = GameTournamentsScraper(
      await fetchPage(
        `https://${lang || ''}game-tournaments.com/${game}/${teamlink}`,
        config.loadPage,
        game
      )
    )

    const name = $('.col-sm-4 img').attr('alt')
    const teamLogo =
      'https://game-tournaments.com' + $('.col-sm-4 img').attr('src')

    const players = $('.nickh2')
      .toArray()
      .map((el) => {
        return {
          name: el.text().replace(/\s+/g, ''),
          link: replaceGame(el.attr('href'))
        }
      })
      .slice(0, 5)

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
      name: $('.row2.teamstat.clearfix .col.col-xs-3')
        .toArray()
        .map((el) => el.find('a').text())[1],
      place: $('.row2.teamstat.clearfix .col.col-xs-3')
        .toArray()
        .map((el) => el.find('b').text())[1]
    }
    const placeinWorld = $('.row2.teamstat.clearfix .col.col-xs-3')
      .toArray()
      .map((el) => el.find('b').text())[0]
    const form = $('.row2.teamstat.clearfix .col.col-xs-3')
      .toArray()
      .map((el) => el.find('b').text())[2]
    const rating = {
      win: $('.row2.teamstat.clearfix .col.col-xs-3')
        .toArray()
        .map((el) => el.find('b').text())[3]
        .split(' ')[0],

      percentage: $('.row2.teamstat.clearfix .col.col-xs-3')
        .toArray()
        .map((el) => el.find('b').text())[3]
        .split(' ')[1]
    }

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
