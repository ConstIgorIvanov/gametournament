import * as cheerio from 'cheerio'
import { parseNumber } from './utils'

export interface GameTournaments extends cheerio.Root {
  (selector: string): GameTournamentsElement
}

export interface GameTournamentsElement {
  length: number
  trimText(): string | undefined
  numFromAttr(attr: string): number | undefined
  numFromText(): number | undefined
  lines(): string[]
  exists(): boolean
  find(selector: string): GameTournamentsElement
  attr(attr: string): string
  text(): string
  textThen<T>(then: (value: string) => T): T
  first(): GameTournamentsElement
  last(): GameTournamentsElement
  toArray(): GameTournamentsElement[]
  data(name: string): any
  attrThen<T>(attr: string, then: (value: string) => T): T
  next(selector?: string): GameTournamentsElement
  eq(index: number): GameTournamentsElement
  parent(): GameTournamentsElement
  children(selector?: string): GameTournamentsElement
  prev(selector?: string): GameTournamentsElement
  contents(): GameTournamentsElement
  filter(
    func: (index: number, element: GameTournamentsElement) => boolean
  ): GameTournamentsElement
}

const attachMethods = (root: cheerio.Cheerio): GameTournamentsElement => {
  const obj: GameTournamentsElement = {
    length: root.length,

    find(selector: string): GameTournamentsElement {
      return attachMethods(root.find(selector))
    },

    attr(attr: string): string {
      return root.attr(attr)!
    },

    attrThen<T>(attr: string, then: (value: string) => T): T {
      return then(root.attr(attr)!)
    },

    text(): string {
      return root.text()
    },

    textThen<T>(then: (value: string) => T): T {
      return then(root.text())
    },

    first(): GameTournamentsElement {
      return attachMethods(root.first())
    },

    last(): GameTournamentsElement {
      return attachMethods(root.last())
    },

    data(name: string): any {
      return root.data(name)
    },

    trimText(): string | undefined {
      return root.text().trim() || undefined
    },

    numFromAttr(attr: string): number | undefined {
      return parseNumber(root.attr(attr))
    },

    numFromText(): number | undefined {
      return parseNumber(root.text())
    },

    lines(): string[] {
      return root.text().split('\n')
    },

    exists(): boolean {
      return root.length !== 0
    },

    toArray(): GameTournamentsElement[] {
      return root.toArray().map(cheerio.default).map(attachMethods)
    },

    prev(selector?: string): GameTournamentsElement {
      return attachMethods(root.prev(selector))
    },

    next(selector?: string): GameTournamentsElement {
      return attachMethods(root.next(selector))
    },

    eq(index: number): GameTournamentsElement {
      return attachMethods(root.eq(index))
    },

    children(selector?: string): GameTournamentsElement {
      return attachMethods(root.children(selector))
    },

    parent(): GameTournamentsElement {
      return attachMethods(root.parent())
    },

    contents(): GameTournamentsElement {
      return attachMethods(root.contents())
    },

    filter(
      func: (index: number, element: GameTournamentsElement) => boolean
    ): GameTournamentsElement {
      return attachMethods(
        root.filter((i, el) => func(i, attachMethods(cheerio.default(el))))
      )
    }
  }

  return obj
}

export const GameTournamentsScraper = (root: cheerio.Root): GameTournaments => {
  const selector = (selector: string): GameTournamentsElement => {
    return attachMethods(root(selector))
  }
  Object.assign(selector, root)

  return selector as GameTournaments
}
