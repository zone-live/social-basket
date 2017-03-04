import { Component, OnInit } from '@angular/core';
import { Fund } from './fund.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    public fund : Fund;
    public actualFund: any;
    public valueBought;
    public todaysValue;
    public earnings;
    public grossProff;
    public liquidProff;

    constructor() {
        this.actualFund = [];
    }

    ngOnInit() {
        this.fund = {
            name: '',
            isin: '',
            subs_date: '',
            up_number: 0,
            up_quote: 0,
            value_bought: 0,
            up_price: 0,
            at_date: '',
            todays_value: 0,
            earnings: 0,
            gross_proff: 0,
            liquid_proff: 0,
            days_passed: 0
        }
    }

    getValueBought(up_number, up_quote) {
        this.valueBought = Number(up_number) * Number(up_quote);
        console.log(this.valueBought);
    }

    getEarnings(todays_value, value_bought) {
        console.log('todays_value: ' + todays_value);
        console.log('value_bought: ' + value_bought);
        console.log('todays_value - value_bought = ' + (todays_value - value_bought));
        this.earnings = todays_value - value_bought;
        return this.earnings;
    }

    getTodaysValue(up_price, up_number) {
        this.todaysValue = Number(up_price) * Number(up_number);
        console.log(this.todaysValue);
    }

    getGrossProff(todays_value, value_bought) {
        console.log(todays_value + ' ' + value_bought);
        console.log(this.getEarnings(todays_value, value_bought) / value_bought);
        this.grossProff = this.getEarnings(todays_value, value_bought) / value_bought;
        return this.grossProff;
    }

    getLiquidProff(todays_value, value_bought) {
        console.log(todays_value + ' ' + value_bought);
        console.log((this.getEarnings(todays_value, value_bought)*0.72) / value_bought);
        this.liquidProff = (this.getEarnings(todays_value, value_bought)*0.72) / value_bought;
        return this.liquidProff;
    }

    getDaysPassed(subs_date, at_date) {
        return subs_date - at_date;
    }

    addFund(submitFund, event) {
        console.log(submitFund);
        event.preventDefault();
        this.getValueBought(submitFund.up_number, submitFund.up_quote)
        this.getTodaysValue(submitFund.up_price, submitFund.up_number)
        this.getEarnings(this.todaysValue, this.valueBought)
        this.getGrossProff(this.todaysValue, this.valueBought)
        this.getLiquidProff(this.todaysValue, this.valueBought)

        this.actualFund.push({
            'name': submitFund.name,
            'isin': submitFund.isin,
            'value_bought': this.valueBought,
            'earnings': this.earnings,
            'todays_value': this.todaysValue,
            'gross_proffit': this.grossProff,
            'liquid_proff': this.liquidProff
        });

        console.log(this.actualFund);
    }

}
