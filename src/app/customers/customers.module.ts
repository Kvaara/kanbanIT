import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';


@NgModule({
  declarations: [
    DetailPageComponent,
    ListPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule,
  ]
})
export class CustomersModule { }
