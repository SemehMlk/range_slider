import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { LnsSliderComponent } from './slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LnsSliderComponent', () => {
  let spectator: Spectator<LnsSliderComponent>;
  let component: LnsSliderComponent;

  const createComponent = createComponentFactory({
    component: LnsSliderComponent,
    imports: [FormsModule, ReactiveFormsModule]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  // ... autres tests

  it('should display the slider prefix and suffix', () => {
    const prefix = 'Prefix';
    const suffix = 'Suffix';
    component.sliderPrefix = prefix;
    component.sliderSuffix = suffix;
    spectator.detectChanges();

    const prefixEl = spectator.query('.slider-prefix');
    const suffixEl = spectator.query('.slider-suffix');
    expect(prefixEl).not.toBeNull();
    expect(prefixEl.textContent).toContain(prefix);
    expect(suffixEl).not.toBeNull();
    expect(suffixEl.textContent).toContain(suffix);
  });

  it('should show error message when there is a validation error', () => {
    component.hasValidationError = true;
    spectator.detectChanges();
    const errorEl = spectator.query('.error-message');
    expect(errorEl).not.toBeNull();
  });

  it('should not show error message when there is no validation error', () => {
    component.hasValidationError = false;
    spectator.detectChanges();
    const errorEl = spectator.query('.error-message');
    expect(errorEl).toBeNull();
  });

    // Test pour vérifier que la valeur du slider est mise à jour dans le modèle lorsque l'utilisateur modifie le slider
    it('should update the model when slider value changes', () => {
        // Supposons que vous avez un élément input dans votre composant
        const input = spectator.query('input');
        const newValue = '42';
        spectator.typeInElement(newValue, input);
        expect(component.sliderValue).toBe(+newValue);
      });
    
      // Test pour vérifier que le composant affiche le message d'erreur lorsque la validation échoue
      it('should display error message when there is a validation error', () => {
        // Activez la validation d'erreur
        component.hasValidationError = true;
        spectator.detectChanges();
        // Supposons que le message d'erreur est affiché dans un composant ou une directive spécifique
        const errorComponent = spectator.query(byDirective(LnsErrorMessageComponent));
        expect(errorComponent).toExist();
        expect(errorComponent).toHaveClass('error-message'); // ou autre classe CSS pertinente
      });
    
      // Test pour vérifier que le message d'erreur n'est pas affiché lorsque la validation est réussie
      it('should not display error message when there is no validation error', () => {
        // Désactivez la validation d'erreur
        component.hasValidationError = false;
        spectator.detectChanges();
        const errorComponent = spectator.query(byDirective(LnsErrorMessageComponent));
        expect(errorComponent).not.toExist();
      });

  // Plus de tests...
});
