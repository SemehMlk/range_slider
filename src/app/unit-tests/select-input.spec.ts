import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SelectInputComponent } from './select-input.component';
import { MockService } from 'jest-mock';

// Mock des services utilisés dans le composant
const mockItemListService = MockService(ItemListService, {
  // ...implémenter les méthodes et les propriétés nécessaires
});

const mockSelectionService = MockService(SelectionService, {
  // ...implémenter les méthodes et les propriétés nécessaires
});

const mockConfigurationService = MockService(ConfigurationService, {
  // ...implémenter les méthodes et les propriétés nécessaires
});

describe('SelectInputComponent', () => {
  let spectator: Spectator<SelectInputComponent>;
  const createComponent = createComponentFactory({
    component: SelectInputComponent,
    providers: [
      { provide: ItemListService, useValue: mockItemListService },
      { provide: SelectionService, useValue: mockSelectionService },
      { provide: ConfigurationService, useValue: mockConfigurationService }
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should exist', () => {
    expect(spectator.component).toBeTruthy();
  });

  // Teste l'initialisation du composant
  it('should initialize with default values', () => {
    expect(spectator.component.activeClear).toBe(true);
    // Ajouter des expect pour les autres valeurs par défaut
  });

  // Écris des tests pour chaque getter et setter
  // Par exemple, pour hasSelection
  it('should determine if there is a selection', () => {
    spectator.component.selectedItems = [];
    expect(spectator.component.hasSelection).toBeFalsy();

    spectator.component.selectedItems = [{ label: 'Item 1', value: 1 }];
    expect(spectator.component.hasSelection).toBeTruthy();
  });

  // Teste les méthodes publiques et les handlers d'événements
  // Par exemple, pour onClear
  it('should clear selection', () => {
    const event = new MouseEvent('click');
    spectator.component.selectedItems = [{ label: 'Item 1', value: 1 }];
    spectator.component.onClear(event);
    expect(mockSelectionService.clear).toHaveBeenCalled();
    expect(spectator.component.selectedItems).toHaveLength(0);
  });

  // Continuer à écrire des tests pour les autres méthodes et cas d'utilisation

});
