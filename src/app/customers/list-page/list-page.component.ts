import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  customers: Customer[] = [];

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
  }

}
