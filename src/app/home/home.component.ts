import { Component, OnInit } from '@angular/core';
import { Fund }    from './fund';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    newFund: any;
    funds: any;
    fundObj: any;

    constructor() {
        this.newFund = '';
        this.funds = [];
    }

    ngOnInit() {
    }

    addFund(event) {
        this.fundObj = {
            newFund: this.newFund
        }
        this.funds.push(this.fundObj);
        this.newFund = '';
        event.preventDefault();
    }

    //model = new Fund('isin', 'name', 'subs_date', 2, 31, 10 );

    //get diagnostic() { return JSON.stringify(this.model); }
}
