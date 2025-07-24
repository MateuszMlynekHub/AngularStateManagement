import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { ItemsReducer } from './ngrx/state/items.reducer'
import { IonicStorageModule } from '@ionic/storage-angular'
import { TranslateModule } from '@ngx-translate/core'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideEffects } from '@ngrx/effects'
import { ItemsEffects } from './ngrx/state/items.effects'
import { provideStore as provideNgRxStore, } from '@ngrx/store';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { ItemState } from './ngxs/state/items.states'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    //NGRX
    provideRouter(routes),
    provideNgRxStore({ items: ItemsReducer }),
    provideEffects([ItemsEffects]),
    importProvidersFrom(
      TranslateModule.forRoot(),
      IonicStorageModule.forRoot(),
      //NGXS
      NgxsModule.forRoot([ItemState]),
      NgxsReduxDevtoolsPluginModule.forRoot(),
    ),
    provideNoopAnimations(),
      //NGXS
  ]
}
