import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ItemActionsService {
  private addItemsSubject = new Subject<number>()
  private clearItemsSubject = new Subject<void>()
  private searchQuerySubject = new Subject<string | null>()

  readonly addItems$: Observable<number> = this.addItemsSubject.asObservable()
  readonly clearItems$: Observable<void> = this.clearItemsSubject.asObservable()
  readonly searchQuery$: Observable<string | null> = this.searchQuerySubject.asObservable()

  fireAddItems(count: number) {
    this.addItemsSubject.next(count)
  }

  fireClearItems() {
    this.clearItemsSubject.next()
  }
  
  fireSearchQuery(query: string | null) {
    this.searchQuerySubject.next(query)
  }
}
