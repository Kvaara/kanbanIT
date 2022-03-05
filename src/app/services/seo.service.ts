import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title, 
    private meta: Meta, 
    private router: Router
  ) {

    
  }

  generateCustomerTags({
    title = "", 
    description = "", 
    image = "",
    content = "",
  }) {
    let firstNameTag = "";
    let secondNameTag = "";

    if (content === "profile") {
      const firstAndSecondName = title.split(" ");
      firstNameTag = firstAndSecondName[0];
      secondNameTag = firstAndSecondName[1] ?? "";
    }
    this.title.setTitle(title);
    this.meta.addTags([
      // Open Graph tags
      { name: "og:url", content: `www.google.com/${this.router.url}`},

      { name: "og:type", content: content},
      { name: "profile:first_name", content: firstNameTag},
      { name: "profile:last_name", content: secondNameTag},

      
      { name: "og:title", content: title},
      { name: "og:description", content: description},
      { name: "og:image", content: image},
      
      // Twitter tags
      { name: "twitter:card", content: "summary"},
      { name: "twitter:site", content: "@kvaara"},

    ]);
  };  
}
