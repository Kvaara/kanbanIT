import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private snackService: SnackService) {}

  async ngOnInit(): Promise<void> {
    await this.checkIfOpeningAuthDrawer();
    
  }

  async checkIfOpeningAuthDrawer() {
    const { openAuthDrawer } = await firstValueFrom(this.route.data)
    if (openAuthDrawer) this.snackService.openAuthDrawer();
  }

}
