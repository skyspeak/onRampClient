import { FlexPage } from './app.po';

describe('flex App', () => {
  let page: FlexPage;

  beforeEach(() => {
    page = new FlexPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
