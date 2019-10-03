import {Component, OnInit} from '@angular/core';
import {ElectronService} from './core/services';
import {TranslateService} from '@ngx-translate/core';
import {AppConfig} from '../environments/environment';
import {BackendService} from './services/backend.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import * as ls from 'local-storage';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public electronService: ElectronService,
    public backendService: BackendService,
    private ngxService: NgxUiLoaderService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    // console.log('AppConfig', AppConfig);
    if (electronService.isElectron) {
      console.log(process.env);
      // console.log('Mode electron');
      // console.log('Electron ipcRenderer', electronService.ipcRenderer);
      // console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      // console.log('Mode web');
    }
  }

  ngOnInit() {
    let userData = ls.get<string>('userData');
    if (userData) {
      userData = JSON.parse(userData);
      // @ts-ignore
      this.authService.fetchDetail(userData._id);
    }

    this.backendService.isLoading.subscribe(isLoading => {
      if (isLoading) {
        this.ngxService.start();
      } else {
        this.ngxService.stop();
      }
    });
  }
}
