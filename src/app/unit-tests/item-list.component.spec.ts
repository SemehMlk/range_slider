import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ItemListComponent } from './item-list.component';

describe('ItemListComponent', () => {
  let spectator: Spectator<ItemListComponent>;
  const createComponent = createComponentFactory({
    component: ItemListComponent,
    // Declare any mocks or dependencies that your component needs
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  // Test case for checking if the component initializes with an empty items array
  it('should initialize with an empty items array', () => {
    expect(spectator.component.items).toEqual([]);
  });

  // Test case for OnInit lifecycle hook
  it('should call OnInit', () => {
    const onInitSpy = jest.spyOn(spectator.component, 'ngOnInit');
    spectator.component.ngOnInit();
    expect(onInitSpy).toHaveBeenCalled();
  });

  // Test case for OnDestroy lifecycle hook
  it('should clean up subscriptions on destroy', () => {
    const onDestroySpy = jest.spyOn(spectator.component, 'ngOnDestroy');
    spectator.component.ngOnDestroy();
    expect(onDestroySpy).toHaveBeenCalled();
    // Expect the subscriptions to have been cleared
    expect(spectator.component.subscriptions.length).toBe(0);
  });

  // Test case for checking the items are populated after an asynchronous call
  it('should populate items after async operation', async () => {
    // Mock the asynchronous operation
    const items = [{ /* your item structure */ }];
    spectator.component.items = items;
    spectator.detectChanges();
    await spectator.fixture.whenStable();
    expect(spectator.component.items).toEqual(items);
  });

  // Add more test cases as per the functionality of your component...
});

