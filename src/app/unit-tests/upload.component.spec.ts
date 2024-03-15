import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { LnsUploadComponent } from './upload.component';
import { UploadValidationService } from './services/upload-validation.service';

describe('LnsUploadComponent', () => {
  let spectator: Spectator<LnsUploadComponent>;
  let component: LnsUploadComponent;

  const createComponent = createComponentFactory({
    component: LnsUploadComponent,
    mocks: [UploadValidationService],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle selected files', () => {
    const mockFiles = [{ name: 'test.pdf', size: 2000 }];
    const validationService = spectator.inject(UploadValidationService);
    const spy = spyOn(validationService, 'scan').and.callThrough();
    spectator.output('selectedFiles').subscribe(selectedFiles => {
      expect(selectedFiles).toEqual(mockFiles);
    });
    component.onSelectedFiles(mockFiles);
    expect(spy).toHaveBeenCalledWith(mockFiles);
  });

  it('should set inline property correctly', () => {
    const inlineSetterSpy = spyOnProperty(component, 'inline', 'set');
    component.inline = true;
    expect(inlineSetterSpy).toHaveBeenCalledWith(true);
  });
  
  it('should set extensions property correctly', () => {
    const newExtensions = ['pdf', 'doc'];
    component.extensions = newExtensions;
    expect(component.extensions).toEqual(newExtensions);
    // Vous devriez également vérifier que le service de validation est appelé correctement.
  });
  
  it('should set maxFileSize property correctly', () => {
    const newSize = 1024;
    component.maxFileSize = newSize;
    expect(component.maxFileSize).toBe(newSize);
    // Vérifiez également l'appel à validationService.updateParameters.
  });

  it('should emit files when actionClick is triggered', () => {
    const actionClickSpy = spyOn(component.actionClick, 'next');
    const fakeEvent = { file: {}, action: 'upload' };
    component.onActionClick(fakeEvent);
    expect(actionClickSpy).toHaveBeenCalledWith(fakeEvent);
  });
  
  it('should filter selected files correctly', () => {
    // Préparez un ensemble de fichiers mockés pour le test
    const mockFiles = [{ id: 1, name: 'test1.pdf' }, { id: 2, name: 'test2.pdf' }];
    component.onSelectedFiles(mockFiles);
    // Appelez la méthode qui doit filtrer les fichiers et émettre le résultat
    // Vérifiez si le résultat attendu est émis
  });
  it('should pass correct inline value to lnsc-validation-display', () => {
    spectator.setInput('inline', true);
    spectator.detectComponentChanges();
    const validationDisplay = spectator.query('lnsc-validation-display');
    expect(validationDisplay).toHaveAttribute('inline', 'true');
  });
});
