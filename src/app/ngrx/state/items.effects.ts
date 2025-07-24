import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  switchMap,
  from,
  map,
  catchError,
  of,
  withLatestFrom,
  tap,
} from 'rxjs'
import {
  loadItemsFailure,
  loadItemsSuccess,
  loadItems,
  removeItem,
  clearItems,
  searchItem,
  addItems,
  setEventExecutionTime,
} from './items.actions'
import { ItemsService } from '../../shared/services/items.service'
import { Store } from '@ngrx/store'
import { selectAllItems, SelectItemsState } from './items.selectors'

@Injectable()
export class ItemsEffects {
  private readonly actions$ = inject(Actions)
  private readonly itemsService = inject(ItemsService)
  private readonly store = inject(Store)
  startTime = 0
  endTime = 0

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      switchMap(() =>
        from(this.itemsService.getItems()).pipe(
          map((items) => loadItemsSuccess({ items: items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  )

  saveItems$ = createEffect(
    () =>
      this.actions$.pipe(
        tap(() => (this.startTime = performance.now())),
        ofType(addItems, removeItem, clearItems),
        withLatestFrom(this.store.select(selectAllItems)),
        switchMap(([, items]) => from(this.itemsService.saveItems(items))),
        tap(() => {
          this.endTime = performance.now()
          this.store.dispatch(
            setEventExecutionTime({
              eventExecutionTime: this.endTime - this.startTime,
            })
          )
        })
      ),
    { dispatch: false }
  )

  searchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchItem),
      withLatestFrom(this.store.select(SelectItemsState)),
      switchMap(([{ searchQuery }, state]) => {
        const startTime = performance.now()
        if (!searchQuery) {
          const action = addItems({ itemsCount: state.itemsCount })
          const executionTime = performance.now() - startTime
          return of(
            loadItems(),
            action,
            setEventExecutionTime({ eventExecutionTime: executionTime })
          )
        } else {
          const filteredItems = state.items.filter((item) =>
            item.id.toString().includes(searchQuery)
          )
          const executionTime = performance.now() - startTime
          return of(
            loadItemsSuccess({ items: filteredItems }),
            setEventExecutionTime({ eventExecutionTime: executionTime })
          )
        }
      })
    )
  )
}
