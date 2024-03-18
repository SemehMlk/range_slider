import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { LnsValidationDisplayComponent } from './validation-display.component';
import { UploadValidationService } from './upload-validation.service';
import { of } from 'rxjs';

describe('LnsValidationDisplayComponent', () => {
  let spectator: Spectator<LnsValidationDisplayComponent>;
  let mockValidationService: jest.Mocked<UploadValidationService>;

  const createComponent = createComponentFactory({
    component: LnsValidationDisplayComponent,
    providers: [
      mockProvider(UploadValidationService, {
        validationMessages: of('Test Validation Message'),
        errors: of(['Error 1', 'Error 2'])
      })
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    mockValidationService = spectator.inject(UploadValidationService) as jest.Mocked<UploadValidationService>;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should subscribe to validationMessages on init', () => {
    expect(spectator.component.validationMessage).toEqual('Test Validation Message');
  });

  it('should subscribe to errors on init', () => {
    expect(spectator.component.errors).toEqual(['Error 1', 'Error 2']);
  });

  it('should unsubscribe on destroy', () => {
    const subscriptionSpy = jest.spyOn(spectator.component.subscriptions[0], 'unsubscribe');
    spectator.component.ngOnDestroy();
    expect(subscriptionSpy).toHaveBeenCalled();
  });

  // Additional tests for @Input() properties can be added here
});
