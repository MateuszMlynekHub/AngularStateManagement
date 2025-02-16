import { createAction, props } from '@ngrx/store'
import { Item } from '../../shared/models/items.model'

export const loadItems = createAction('[Item Page] Load Items')

export const addItems = createAction(
  '[Item Page] Add Multiple Items',
  props<{ itemsCount: number }>()
)

export const removeItem = createAction(
  '[Item Page] Remove Item',
  props<{ id: number }>()
)

export const clearItems = createAction(
  '[Item Page] Remove Items',
)

export const searchItem = createAction(
  '[Item Page] Search Item',
  props<{ searchQuery: string | null }>()
)

export const loadItemsSuccess = createAction(
  '[Item API] Items Load Success',
  props<{ items: Item[] }>()
)

export const loadItemsFailure = createAction(
  '[Item API] Items Load Failure',
  props<{ error: string }>()
)

export const setEventExecutionTime = createAction(
  '[Item API] Items event execution time',
  props<{ eventExecutionTime: number }>()
)