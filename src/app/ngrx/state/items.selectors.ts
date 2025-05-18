import { createSelector } from '@ngrx/store'
import { AppState } from './app.state'
import { ItemStateModel } from '../../shared/models/state.model'

export const selectItems = (state: AppState) => state.items
export const selectAllItems = createSelector(
  selectItems,
  (state: ItemStateModel) => {
    return state.items}
)
export const SelectItemsState = createSelector(
  selectItems,
  (state: ItemStateModel) => state
)