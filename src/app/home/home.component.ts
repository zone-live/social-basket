import { Component, OnInit } from '@angular/core';
import { FundService } from '.././fund.service';
//import { Fund } from './fund.interface';
import { Fund } from '../.././Fund';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    public actualFund: any;
    public valueBought;
    public todaysValue;
    public earnings;
    public grossProff;
    public liquidProff;

    funds: Fund[];

    model: Fund;


    constructor(private fundService:FundService) {

        this.actualFund = [];

        this.fundService.getFunds()
          .subscribe(funds => {
              console.log(funds);
              this.funds = funds;
          })
    }


    ngOnInit() {

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

         var newFund = {
            name: submitFund.name,
            isin: submitFund.isin,
            value_bought: this.valueBought,
            earnings: this.earnings,
            todays_value: this.todaysValue,
            gross_proffit: this.grossProff,
            liquid_proff: this.liquidProff
         }

      this.fundService.addFund(newFund)
       .subscribe(fund => {
           this.funds.push(fund);
           submitFund.name = '';
       })

        console.log(this.actualFund);
    }

    deleteFund(id) {
        var funds = this.funds;
        this.fundService.deleteFund(id)
            .subscribe(data => {
                if (data.n == 1) {
                    for (var i = 0; i < funds.length; i++) {
                        if (funds[i]._id == id) {
                            funds.splice(i, 1);
                        }
                    }
                }
            })
    }

    updateFund(fund) {
        var _fund = {
            _id: fund._id,
            name: fund.name,
            isin: fund.isin
        };

        this.fundService.updateFund(_fund)
          .subscribe(data => {
              fund.name = fund.name;
              fund.isin = fund.isin;
          })
    }




}
