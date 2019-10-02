import 'reflect-metadata';
import '../polyfills';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {AppRoutingModule} from './app-routing.module';
// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
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
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import { UpdateItemComponent } from './pages/update-item/update-item.component';
import {DataTablesModule} from 'angular-datatables';
import { MyItemsComponent } from './pages/my-items/my-items.component';

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
    RegisterComponent,
    UpdateItemComponent,
    MyItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    AppRoutingModule,
    DataTablesModule,
    ToastrModule.forRoot(),
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
