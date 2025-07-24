import { Item } from "./items.model"

export interface ItemStateModel {
  items: Item[]
  error: string | null
  searchQuery: string | null
  itemsCount: number
  eventType: string | null
  eventExecutionTime: number | null
}

export type EventType = 'add' | 'remove' | 'load' | 'search'
export enum EventTypeEnum {
  ADD = 'add',
  REMOVE = 'remove',
  LOAD = 'load',
  SEARCH = 'search'
}