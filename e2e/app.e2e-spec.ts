import { FundshareAppPage } from './app.po';

describe('fundshare-app App', () => {
  let page: FundshareAppPage;

  beforeEach(() => {
    page = new FundshareAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
