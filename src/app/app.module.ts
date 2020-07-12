import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { ErrorComponent } from './Error/error.component';
import { ProductModule } from './products/product.module';
import { AppRoutingModule } from './app-routing.module';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    CustomerModule,
    AppRoutingModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
