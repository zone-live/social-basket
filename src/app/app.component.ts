import { Component } from '@angular/core';
import { FundService } from './fund.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FundService]
})
export class AppComponent {}
