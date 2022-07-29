import { Agent as HttpsAgent } from 'https'
import { Agent as HttpAgent } from 'http'
import * as request from 'request'
import { Time } from './shared/Time'

export interface GameTournamentsConfig {
  loadPage: (url: string, page: string, time: Time) => Promise<string>
  httpAgent: HttpsAgent | HttpAgent
}

export const defaultLoadPage =
  (httpAgent: HttpsAgent | HttpAgent | undefined) =>
  (url: string, page: string, time: Time) =>
    new Promise<string>((resolve) => {
      request.post(
        url,
        {
          headers: {
            accept: '*/*',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua':
              '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest'
          },
          gzip: true,
          agent: httpAgent,
          body: `game=dota-2&rid=matches&ajax=block_matches_${time}&data%5Bs%5D=${page}`
        },
        (err, __, body) => {
          if (err) {
            throw err
          }
          resolve(body)
        }
      )
    })

const defaultAgent = new HttpsAgent()

export const defaultConfig: GameTournamentsConfig = {
  httpAgent: defaultAgent,
  loadPage: defaultLoadPage(defaultAgent)
}
