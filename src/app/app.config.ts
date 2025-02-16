import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { ItemsReducer } from './ngrx/state/items.reducer'
import { IonicStorageModule } from '@ionic/storage-angular'
import { TranslateModule } from '@ngx-translate/core'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideEffects } from '@ngrx/effects'
import { ItemsEffects } from './ngrx/state/items.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideStore({ items: ItemsReducer }),
    provideEffects([ItemsEffects]),
    importProvidersFrom(
      TranslateModule.forRoot(),
      IonicStorageModule.forRoot()),
      provideNoopAnimations(),
]
}
