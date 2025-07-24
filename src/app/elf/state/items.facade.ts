import { inject, Injectable } from '@angular/core'
import { from, EMPTY, Observable } from 'rxjs'
import { tap, catchError, finalize } from 'rxjs/operators'

import {
  addEntities,
  setEntities,
  deleteEntitiesByPredicate,
  upsertEntities,
  updateEntities,
} from '@ngneat/elf-entities'
import { setProp, setProps } from '@ngneat/elf'

import { ItemsService } from '../../shared/services/items.service'
import { EventTypeEnum } from '../../shared/models/state.model'
import { Item, item } from '../../shared/models/items.model'
import {
  itemsStore,
  getItemsSync,
  getItemsCountSync,
  itemStateModel$,
} from './items.store'
import { ItemStateModel } from '../../shared/models/state.model'

@Injectable({ providedIn: 'root' })
export class ItemsFacade {
  private readonly itemsService = inject(ItemsService)
  private startTime = 0
  fullState$: Observable<ItemStateModel> = itemStateModel$

  loadItems(): Observable<unknown> {
    itemsStore.update(setProp('eventType', EventTypeEnum.LOAD))

    return from(this.itemsService.getItems()).pipe(
      tap((items: Item[]) => {
        itemsStore.update(
          setEntities(items),
          setProps({ error: null, searchQuery: null })
        )
      }),
      catchError((err) => {
        itemsStore.update(setProp('error', err?.toString?.() ?? String(err)))
        return EMPTY
      })
    )
  }

  private timeAndSave(mutator: () => void): Observable<unknown> {
    this.startTime = performance.now()
    mutator()

    const currentItems = getItemsSync()

    return from(this.itemsService.saveItems(currentItems)).pipe(
      finalize(() => {
        const exec = performance.now() - this.startTime
        itemsStore.update(setProp('eventExecutionTime', exec))
      })
    )
  }

  addItems(itemsCount: number): Observable<unknown> {
    return this.timeAndSave(() => {
      const currentCount = getItemsCountSync()
      const newItems: Item[] = Array.from({ length: itemsCount }, (_, i) => ({
        ...item,
        id: currentCount + i,
      }))

      itemsStore.update(
        addEntities(newItems),
        setProp('eventType', EventTypeEnum.ADD)
      )
    })
  }

  upsertItem(it: Item): Observable<unknown> {
    return this.timeAndSave(() => {
      itemsStore.update(
        upsertEntities(it),
        setProp('eventType', EventTypeEnum.ADD)
      )
    })
  }

  updateItemName(id: number, name: string): Observable<unknown> {
    return this.timeAndSave(() => {
      itemsStore.update(updateEntities(id, (e) => ({ ...e, name })))
    })
  }

  removeItem(id: number): Observable<unknown> {
    return this.timeAndSave(() => {
      itemsStore.update(
        deleteEntitiesByPredicate((it) => it.id === id),
        setProp('eventType', EventTypeEnum.REMOVE)
      )
    })
  }

  clearItems(): Observable<unknown> {
    return this.timeAndSave(() => {
      itemsStore.update(
        setEntities([]),
        setProps({ eventType: EventTypeEnum.REMOVE, searchQuery: null })
      )
    })
  }

  searchItem(searchQuery: string | null): void {
    const start = performance.now()
    itemsStore.update(
      setProps({ searchQuery, eventType: EventTypeEnum.SEARCH })
    )
    const exec = performance.now() - start
    itemsStore.update(setProp('eventExecutionTime', exec))
  }
}
