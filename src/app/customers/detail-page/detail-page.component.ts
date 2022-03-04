import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  customerID: string = "";


  constructor(
    private seo: SeoService,
    private route: ActivatedRoute, 
    private customerService: CustomerService,
  ) {

  }

  async ngOnInit() {
    this.customerID = this.route.snapshot.paramMap.get("id")!;

    const customer = await this.customerService.getCustomerByID(this.customerID);

    this.seo.generateCustomerTags({
      title: customer?.name,
      description: customer?.bio,
      image: customer?.image,
      content: "profile",
    });
  }

}
