export class Fund {

  constructor(
    public isin: string,
    public name: string,
    public subs_date: string,
    public up_number: number,
    public up_quote: number,
    public value: number
  ) {  }

}
