import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzResultModule } from 'ng-zorro-antd/result'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { TranslateModule } from '@ngx-translate/core'
import { TabsOption } from '../../models/tabs.model'
import { RouterModule } from '@angular/router'
import { ItemActionsService } from '../../services/item-actions.service'
import { ItemActionsListComponent } from '../item-action-list/item-action.component'

@Component({
  selector: 'app-tabs-handler',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzResultModule, NzTabsModule, TranslateModule, RouterModule, ItemActionsListComponent],
  templateUrl: './tabs-handler.component.html',
  styleUrls: ['./tabs-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsHandlerComponent {
  public readonly actions = inject(ItemActionsService)
  @Input() tabs: TabsOption[] | null = null
}
