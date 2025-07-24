import { createStore, select, withProps } from '@ngneat/elf'
import { getAllEntities, getEntitiesCount, selectAllEntities, selectEntitiesCount, withEntities } from '@ngneat/elf-entities'
import { combineLatest, map } from 'rxjs'
import { ItemStateModel } from '../../shared/models/state.model'
import { Item } from '../../shared/models/items.model'
type ItemProps = Omit<ItemStateModel, 'items' | 'itemsCount'>

export const itemsStore = createStore(
  { name: 'items' },
  withEntities<Item>({ idKey: 'id' }),
  withProps<ItemProps>({
    error: null,
    searchQuery: null,
    eventType: null,
    eventExecutionTime: null,
  })
)

export const items$ = itemsStore.pipe(selectAllEntities())
export const totalCount$ = itemsStore.pipe(selectEntitiesCount())
export const searchQuery$ = itemsStore.pipe(select((s) => s.searchQuery))
export const meta$ = itemsStore.pipe(
  select(({ error, eventType, eventExecutionTime }) => ({
    error,
    eventType,
    eventExecutionTime,
  }))
)

export const filteredItems$ = combineLatest([items$, searchQuery$]).pipe(
  map(([items, q]) =>
    q ? items.filter((it) => it.id.toString().includes(q)) : items
  )
)

export const itemStateModel$ = combineLatest([
  filteredItems$,
  totalCount$,
  searchQuery$,
  meta$,
]).pipe(
  map(([items, totalCount, searchQuery, meta]): ItemStateModel => ({
    items,
    itemsCount: searchQuery ? items.length : totalCount,
    searchQuery,
    ...meta,
  }))
)

export const getItemsSync  = () => itemsStore.query(getAllEntities())
export const getItemsCountSync = () => itemsStore.query(getEntitiesCount())
