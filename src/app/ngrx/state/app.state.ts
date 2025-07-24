import { ItemStateModel } from "../../shared/models/state.model"

export interface AppState {
  items: ItemStateModel
}

export const initialState: ItemStateModel = {
  items: [],
  error: null,
  searchQuery: null,
  itemsCount: 0,
  eventType: null,
  eventExecutionTime: null
}
