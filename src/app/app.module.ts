import 'reflect-metadata';
import '../polyfills';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {HomeModule} from './home/home.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './componets/header/header.component';
import {CardListComponent} from './pages/card-list/card-list.component';
import {MyOrderComponent} from './pages/my-order/my-order.component';
import {OrdersAllComponent} from './pages/orders-all/orders-all.component';
import {AddVendorComponent} from './pages/add-vendor/add-vendor.component';
import {VendorListComponent} from './pages/vendor-list/vendor-list.component';
import {AddItemComponent} from './pages/add-item/add-item.component';
import {ItemListComponent} from './pages/item-list/item-list.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardListComponent,
    MyOrderComponent,
    OrdersAllComponent,
    AddVendorComponent,
    VendorListComponent,
    AddItemComponent,
    ItemListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
