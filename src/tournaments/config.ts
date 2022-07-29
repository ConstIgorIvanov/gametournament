import { Agent as HttpsAgent } from 'https'
import { Agent as HttpAgent } from 'http'
import * as request from 'request'

export interface GameTournamentsConfig {
  loadPage: (url: string) => Promise<string>
  httpAgent: HttpsAgent | HttpAgent
}

export const tournamentsLoadPage =
  (httpAgent: HttpsAgent | HttpAgent | undefined) => (url: string) =>
    new Promise<string>((resolve) => {
      request.get(
        url,
        {
          gzip: true,
          agent: httpAgent
        },
        (err, __, body) => {
          if (err) {
            throw err
          }
          resolve(body)
        }
      )
    })

const tournamentsAgent = new HttpsAgent()

export const tournamentsConfig: GameTournamentsConfig = {
  httpAgent: tournamentsAgent,
  loadPage: tournamentsLoadPage(tournamentsAgent)
}
