import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [ 
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [ 
        style({transform: 'scale(1)', opacity: 1}),
        animate(200, style({transform: 'scale(0)', opacity: 0})) 
      ]),
    ]),
  ]
})
export class ListPageComponent implements OnInit{
  customers: Customer[] = [];
  isPageReady = false;

  constructor(
    private customerService: CustomerService,
    private seo: SeoService  
  ) {}

  async ngOnInit(): Promise<void> {
    this.seo.generateCustomerTags({
      title: "List of KanbanIT customers",
      description: "List filled with all of the KanbanIT customers who have used this service to make kanbans that make their lifes easier.",
      content: "website",
    });
    this.customers = await this.customerService.getAllCustomers();
    this.isPageReady = true;
  }

}
