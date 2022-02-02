describe('Navigation', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Should display navigation layout', async () => {
    await expect(element(by.id('navigation-layout'))).toBeVisible();
  });

  it('should be able to navigate to info page', async () => {
    await element(by.id('info-button')).tap();
    await expect(element(by.text('contact@cerealis.fr'))).toBeVisible();
  });

  it('should be able to navigate to camera page', async () => {
    await element(by.id('scan')).tap();
    await expect(element(by.id('camera-page'))).toBeVisible();
  });
});
