import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [ 
        style({opacity:0}),
        animate(300, style({opacity:1})) 
      ]),
      transition(':leave', [ 
        style({transform: 'scale(1)', opacity: 1}),
        animate(200, style({transform: 'scale(0)', opacity: 0})) 
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private snackService: SnackService,
    private title: Title,
  ) {}

  async ngOnInit(): Promise<void> {
    this.title.setTitle("Home");
    await this.checkIfOpeningAuthDrawer();
  };

  async checkIfOpeningAuthDrawer() {
    const { openAuthDrawer } = await firstValueFrom(this.route.data)
    if (openAuthDrawer) this.snackService.openAuthDrawer();
  };
}
