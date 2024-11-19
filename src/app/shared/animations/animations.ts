import { trigger, state, style, transition, animate } from '@angular/animations';

export const zoomInAnimation = trigger('zoomInAnimation', [
  transition(':enter', [ // Animación cuando el elemento entra al DOM
    style({ transform: 'scale(0)', opacity: 0 }), // Estado inicial
    animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })) // Estado final
  ]),
]);


