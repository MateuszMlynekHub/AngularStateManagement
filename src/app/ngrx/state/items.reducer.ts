import { createReducer, on } from '@ngrx/store'
import {
  addItems,
  loadItems,
  loadItemsFailure,
  loadItemsSuccess,
  removeItem,
  clearItems,
  searchItem,
  setEventExecutionTime,
} from './items.actions'
import {
  EventTypeEnum,
} from '../../shared/models/state.model'
import { initialState } from './app.state'
import { Item, item } from '../../shared/models/items.model'

export const ItemsReducer = createReducer(
  initialState,
  on(addItems, (state, { itemsCount }) => { 
    const newItems: Item[] = Array.from({ length: itemsCount }, (_, i) =>  ({...item,id: i}))
    return {
      ...state,
      items: [...state.items, ...newItems],
      itemsCount: state.itemsCount + itemsCount,
      eventType: EventTypeEnum.ADD,
    }
  }),
  on(removeItem, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id),
    itemsCount: state.items.filter(item => item.id !== id).length,
    eventType: EventTypeEnum.REMOVE,
  })),
  on(clearItems, (state) => ({
    ...state,
    items: [],
    eventType: EventTypeEnum.REMOVE,
  })),
  on(loadItems, (state) => ({
    ...state,
    eventType: EventTypeEnum.LOAD,
  })),
  on(searchItem, (state, { searchQuery }) => ({
    ...state,
    searchQuery,
    eventType: EventTypeEnum.SEARCH,
  })),
  on(setEventExecutionTime, (state, { eventExecutionTime }) => ({
    ...state,
    eventExecutionTime
  })),
  on(loadItemsSuccess, (state, { items }) => ({
    ...state,
    items: items,
    error: null,
  })),
  on(loadItemsFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
)
