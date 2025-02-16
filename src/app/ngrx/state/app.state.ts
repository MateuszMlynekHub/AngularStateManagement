import { ItemState } from "../../shared/models/state.model"

export interface AppState {
  items: ItemState
}

export const initialState: ItemState = {
  items: [],
  error: null,
  searchQuery: null,
  itemsCount: 0,
  eventType: null,
  eventExecutionTime: null
}
