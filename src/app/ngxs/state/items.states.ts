import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { ItemsService } from '../../shared/services/items.service'
import { from } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { ItemStateModel, EventTypeEnum } from '../../shared/models/state.model'
import { item, Item } from '../../shared/models/items.model'
import { ItemsActions } from './items.actions'
import { initialState } from '../../ngrx/state/app.state'

@State<ItemStateModel>({
  name: 'items',
  defaults: initialState
})
@Injectable()
export class ItemState {
  private startTime = 0
  private endTime = 0

  constructor(private itemsService: ItemsService) {}

  /*** SELECTORS ***/
  @Selector()
  static items(state: ItemStateModel) {
    return state.items
  }

  @Selector()
  static fullState(state: ItemStateModel) {
    return state
  }


  /*** LOAD ITEMS ***/
  @Action(ItemsActions.LoadItems)
  loadItems(ctx: StateContext<ItemStateModel>) {
    // mark that a load started
    ctx.patchState({ eventType: EventTypeEnum.LOAD })

    return from(this.itemsService.getItems()).pipe(
      tap(items =>
        ctx.dispatch(new ItemsActions.LoadItemsSuccess(items))
      ),
      catchError(err =>
        ctx.dispatch(new ItemsActions.LoadItemsFailure(err.toString()))
      )
    )
  }

  @Action(ItemsActions.LoadItemsSuccess)
  loadSuccess(ctx: StateContext<ItemStateModel>, { items }: ItemsActions.LoadItemsSuccess) {
    ctx.patchState({
      items,
      error: null
    })
  }

  @Action(ItemsActions.LoadItemsFailure)
  loadFailure(ctx: StateContext<ItemStateModel>, { error }: ItemsActions.LoadItemsFailure) {
    ctx.patchState({ error })
  }


  /*** SAVE TIMED ON ADD / REMOVE / CLEAR ***/
  private timeAndSave(ctx: StateContext<ItemStateModel>, saveFn: () => void) {
    this.startTime = performance.now()
    saveFn()
    const items = ctx.getState().items
    return from(this.itemsService.saveItems(items)).pipe(
      tap(() => {
        this.endTime = performance.now()
        console.log("endTime", this.endTime)
        console.log("startTime", this.startTime)
        ctx.patchState(new ItemsActions.SetEventExecutionTime(this.endTime - this.startTime))
      })
    )
  }

  @Action(ItemsActions.AddItems)
  addItems(ctx: StateContext<ItemStateModel>, { itemsCount }: ItemsActions.AddItems) {
    return this.timeAndSave(ctx, () => {
      const state = ctx.getState()
      const newItems: Item[] = Array.from({ length: itemsCount }, (_, i) =>  ({...item,id: i}))
      ctx.patchState({
        items: [...state.items, ...newItems],
        itemsCount: state.itemsCount + itemsCount,
        eventType: EventTypeEnum.ADD
      })
    })
  }

  @Action(ItemsActions.RemoveItem)
  removeItem(ctx: StateContext<ItemStateModel>, { id }: ItemsActions.RemoveItem) {
    return this.timeAndSave(ctx, () => {
      const state = ctx.getState()
      const kept = state.items.filter(item => item.id !== id)
      ctx.patchState({
        items: kept,
        itemsCount: kept.length,
        eventType: EventTypeEnum.REMOVE
      })
    })
  }

  @Action(ItemsActions.ClearItems)
  clearItems(ctx: StateContext<ItemStateModel>) {
    return this.timeAndSave(ctx, () => {
      ctx.patchState({
        items: [],
        eventType: EventTypeEnum.REMOVE
      })
    })
  }


  @Action(ItemsActions.SearchItem)
  searchItem(
    ctx: StateContext<ItemStateModel>,
    { searchQuery }: ItemsActions.SearchItem
  ) {
    const state = ctx.getState()
    const startTime = performance.now()
  
    if (!searchQuery) {
      // No query: simulate "loading more" by adding state.itemsCount items
      const itemsToAdd     = state.itemsCount
      const newItemsCount  = state.itemsCount + itemsToAdd
      const execTime       = performance.now() - startTime
  
      ctx.patchState({
        itemsCount: newItemsCount,
        eventExecutionTime: execTime
      })
    } else {
      // Filter existing items by ID
      const filtered = state.items.filter(item =>
        item.id.toString().includes(searchQuery)
      )
      const execTime = performance.now() - startTime
  
      ctx.patchState({
        items: filtered,
        eventExecutionTime: execTime
      })
    }
  }
  
}