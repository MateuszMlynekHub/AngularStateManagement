import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzResultModule } from 'ng-zorro-antd/result'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { TranslateModule } from '@ngx-translate/core'
import { TabsOption } from '../../models/tabs.model'

@Component({
  selector: 'app-tabs-handler',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzResultModule, NzTabsModule, TranslateModule],
  templateUrl: './tabs-handler.component.html',
  styleUrls: ['./tabs-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsHandlerComponent {
  @Input() tabs: TabsOption[] | null = null
}
