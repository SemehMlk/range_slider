import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ItemListService } from './item-list.service';

describe('ItemListService', () => {
  let spectator: SpectatorService<ItemListService>;
  const createService = createServiceFactory({
    service: ItemListService
    // Ajoutez ici les mocks des dépendances si nécessaire.
  });

  beforeEach(() => spectator = createService());

  it('should clear items', () => {
    spectator.service.clearItems();
    expect(spectator.service.items).toEqual(/* valeur attendue */);
    // Autres assertions...
  });

  describe('fetchItems', () => {
    it('should emit items when an array is provided', async () => {
      const items = [/* ... */];
      await spectator.service.fetchItems(items);
      expect(spectator.service.items).toHaveEmitted(items);
    });
  
    it('should emit true then false for isLoading when fetching items', async () => {
      const items = spectator.service.fetchItems([/* ... */]);
      expect(spectator.service.loading$).toHaveEmittedSequence([true, false]);
    });
  
    // Plus de tests...
  });

  describe('clearItems', () => {
    it('should clear items and close dropdown', () => {
      spectator.service.clearItems();
      expect(spectator.service.items).toHaveEmitted([]);
      expect(spectator.service.openDropdown$).toHaveEmitted(false);
    });
  });

  describe('fetchAllItems', () => {
    it('should fetch all items if not currently fetching', async () => {
      mockIsFetchingAllSubject(false);
      await spectator.service.fetchAllItems();
      // Vérifiez que fetchItems a été appelé
    });
  
    it('should not fetch items if already fetching all', async () => {
      mockIsFetchingAllSubject(true);
      await spectator.service.fetchAllItems();
      // Vérifiez que fetchItems n'a pas été appelé
    });
  
    // Plus de tests...
  });

  describe('searchItems', () => {
    it('should cancel loading and perform a search', async () => {
      const searchTerm = 'query';
      mockSearchTerm(searchTerm);
      await spectator.service.searchItems();
      expect(spectator.service.items).toHaveBeenLastCalledWith(searchTerm);
    });
  
    it('should clear items if search term is empty', async () => {
      mockSearchTerm('');
      await spectator.service.searchItems();
      expect(spectator.service.items).toHaveEmitted([]);
    });
  
    // Plus de tests...
  });

  describe('Getters and Setters', () => {
    it('should set and get the dataSource correctly', () => {
      const dataSource = { /* ... */ };
      spectator.service.dataSource = dataSource;
      expect(spectator.service.dataSource).toBe(dataSource);
    });
  
    // Tests pour les autres getters et setters...
  });
  
});
