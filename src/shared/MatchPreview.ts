import { Team } from './Team'
import { Event } from './Event'

export type MatchPreview = {
  id: string
  game: string
  live: boolean
  team1?: Team
  team2?: Team
  date?: string
  event?: Event
  score?: string
  link?: string
} | null
