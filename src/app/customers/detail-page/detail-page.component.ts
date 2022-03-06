import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  customerID: string = "";
  customer?: Customer;
  isPageReady = false;

  constructor(
    private seo: SeoService,
    private route: ActivatedRoute, 
    private customerService: CustomerService,
  ) {

  }

  async ngOnInit() {
    this.customerID = this.route.snapshot.paramMap.get("id")!;

    this.customer = await this.customerService.getCustomerByID(this.customerID);

    this.seo.generateCustomerTags({
      title: this.customer?.name,
      description: this.customer?.bio,
      image: this.customer?.image,
      content: "profile",
    });
  }

  readyThePage() {
    this.isPageReady = true;
    console.log("asdasd");
  }

}
