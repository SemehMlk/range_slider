import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { LnsDropAreaComponent } from './drop-area.component';

describe('LnsDropAreaComponent', () => {
  let spectator: Spectator<LnsDropAreaComponent>;
  const createComponent = createComponentFactory({
    component: LnsDropAreaComponent
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should emit files on drop', () => {
    const mockFileList = {
      0: new File([''], 'test-file.png'),
      length: 1,
      item: (index: number) => new File([''], 'test-file.png')
    };
    const event = new DragEvent('drop', {
      dataTransfer: {
        files: mockFileList,
        items: {
          0: { kind: 'file', type: 'image/png' },
          length: 1,
          item: (index: number) => ({ kind: 'file', type: 'image/png' })
        },
        types: ['Files'],
        clearData: () => {}
      }
    });
    spyOn(spectator.component.files, 'emit');
    spectator.component.onDrop(event);
    expect(spectator.component.files.emit).toHaveBeenCalledWith(jasmine.any(Array));
  });

  // ...

it('should handle dragover event correctly', () => {
    const dragEvent = new DragEvent('dragover');
    spyOn(dragEvent, 'preventDefault');
    spyOn(dragEvent, 'stopPropagation');
    spectator.component.onDragOver(dragEvent);
    expect(dragEvent.preventDefault).toHaveBeenCalled();
    expect(dragEvent.stopPropagation).toHaveBeenCalled();
    expect(spectator.component.state).toEqual('dragover');
    expect(spectator.component.cdRef.detectChanges).toHaveBeenCalled();
  });
  
  it('should handle dragleave event correctly', () => {
    spectator.component.previousState = 'default';
    const dragEvent = new DragEvent('dragleave');
    spyOn(dragEvent, 'preventDefault');
    spyOn(dragEvent, 'stopPropagation');
    spectator.component.onDragLeave(dragEvent);
    expect(dragEvent.preventDefault).toHaveBeenCalled();
    expect(dragEvent.stopPropagation).toHaveBeenCalled();
    expect(spectator.component.state).toEqual('default');
    expect(spectator.component.cdRef.detectChanges).toHaveBeenCalled();
  });
  
  it('should emit files when file input changes', () => {
    const inputEvent = new Event('change');
    const inputElement = {
      files: [new File([''], 'test-file.png')]
    };
    spyOn(inputEvent, 'currentTarget').and.returnValue(inputElement);
    spyOn(spectator.component.files, 'emit');
    spectator.component.onChanges(inputEvent as any); // Cast as any because our mock is partial
    expect(spectator.component.files.emit).toHaveBeenCalledWith(jasmine.any(Array));
  });
  
  it('should convert files to FileToUpload objects', () => {
    const mockFiles = [new File(['content'], 'test-file.png', { type: 'image/png' })];
    const fileUploads = spectator.component.toFileUpload(mockFiles);
    expect(fileUploads.length).toEqual(1);
    expect(fileUploads[0].name).toEqual('test-file.png');
    expect(fileUploads[0].size).toEqual(mockFiles[0].size);
    expect(fileUploads[0].type).toEqual(mockFiles[0].type);
  });
  
  // ... Additional tests as needed to cover all code paths ...
  
});
