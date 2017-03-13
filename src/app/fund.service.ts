import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FundService {

  constructor(private http:Http) {
      console.log('fund service initialized');
  }

  getFunds() {
      return this.http.get('/api/funds')
        .map(res => res.json());
  }

  addFund(newFund) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('/api/fund', JSON.stringify(newFund), {headers: headers})
        .map(res => res.json());
  }

  deleteFund(id) {
      return this.http.delete('/api/fund/'+id)
        .map(res => res.json());
  }

  updateStatus(fund) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('/api/fund/'+fund._id, JSON.stringify(fund), {headers: headers})
        .map(res => res.json());
  }

}
