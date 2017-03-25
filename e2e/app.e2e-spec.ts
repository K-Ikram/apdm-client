import { Angular2FirstPage } from './app.po';

describe('angular2-first App', () => {
  let page: Angular2FirstPage;

  beforeEach(() => {
    page = new Angular2FirstPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
