import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { LnsFileItemListComponent } from './file-item-list.component';
import { FileModel } from '../models';

describe('LnsFileItemListComponent', () => {
  let spectator: Spectator<LnsFileItemListComponent>;
  const createComponent = createComponentFactory({
    component: LnsFileItemListComponent,
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initialize `files` input correctly', () => {
    const mockFiles: FileModel[] = [{ name: 'test-file.png', size: 1234 }];
    spectator.setInput('files', mockFiles);
    expect(spectator.component.files).toEqual(mockFiles);
  });

  it('should emit `cancelClick` event when triggered', () => {
    const mockFile: FileModel = { name: 'test-file.png', size: 1234 };
    const cancelClickSpy = spyOn(spectator.component.cancelClick, 'emit');
    spectator.component.cancelClick.emit(mockFile);
    expect(cancelClickSpy).toHaveBeenCalledWith(mockFile);
  });

  it('should return the current list of files via getFiles()', () => {
    const mockFiles: FileModel[] = [
      { name: 'test-file1.png', size: 1234 },
      { name: 'test-file2.png', size: 5678 }
    ];
    spectator.setInput('files', mockFiles);
    const files = spectator.component.getFiles();
    expect(files).toEqual(mockFiles);
  });
  
  it('should emit `actionClick` event when an action is triggered', () => {
    const mockAction: FileActionClick = { action: 'delete', file: { name: 'test-file.png', size: 1234 } };
    const actionClickSpy = spyOn(spectator.component.actionClick, 'emit');
    spectator.component.actionClick.emit(mockAction);
    expect(actionClickSpy).toHaveBeenCalledWith(mockAction);
  });
});
