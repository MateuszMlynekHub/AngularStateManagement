/* eslint-disable @typescript-eslint/no-namespace */

import { Item } from "../../shared/models/items.model";

export namespace ItemsActions {
  export class LoadItems {
    static readonly type = '[Items] Load Items';
  }

  export class AddItems {
    static readonly type = '[Items] Add Item';
    constructor(public itemsCount: number) {}
  }
  
  export class RemoveItem {
    static readonly type = '[Items] Remove Item';
    constructor(public id: number) {}
  }

  export class ClearItems {
    static readonly type = '[Items] Clear Items';
  }

  export class SearchItem {
    static readonly type = '[Items] Search Item';
    constructor(public searchQuery: string | null) {}
  }

  export class LoadItemsSuccess {
    static readonly type = '[Items] Load Items Success';
    constructor(public items: Item[]) {}
  }

  export class LoadItemsFailure {
    static readonly type = '[Items] Load Items Failure';
    constructor(public error: string) {}
  }

  export class SetEventExecutionTime {
    static readonly type = '[Items] Set Event Execution Time';
    constructor(public eventExecutionTime: number) {}
  }
}