import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ang-forms';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'it']);
    translate.setDefaultLang('en');
  }

  switchLang(langCode: string) {
    this.translate.use(langCode);
  }
}
