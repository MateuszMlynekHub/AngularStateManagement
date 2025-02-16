import { inject, Injectable } from '@angular/core'
import { Storage } from '@ionic/storage-angular'
import { Item } from '../models/items.model'

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private readonly storage = inject(Storage)
  private storageInitialised = false

  async getItems(): Promise<Item[]> {
    if (!this.storageInitialised) await this.storage.create()
    return await this.storage.get('items') || []
  }

  async saveItems(items: Item[]) {
    if (!this.storageInitialised) await this.storage.create()
    return this.storage.set('items', items)
  }
}
