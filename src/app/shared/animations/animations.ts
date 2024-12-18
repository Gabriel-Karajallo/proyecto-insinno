import { trigger, state, style, transition, animate } from '@angular/animations';

export const zoomInAnimation =
  trigger('zoomInAnimation', [
    transition(':enter', [ // Animación cuando el elemento entra al DOM
      style({ transform: 'scale(0)', opacity: 0 }), // Estado inicial
      animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })) // Estado final
    ]),
  ]);

export const sliderAnimation =
  trigger('slideIn', [
    state('void', style({
      height: '0',
      opacity: '0',
      padding: '0',
      margin: '0'
    })),
    state('*', style({
      height: '*',
      opacity: '1',
      padding: '10px 20px',
      margin: '10px 0'
    })),
    transition('void <=> *', [
      animate('0.3s ease-out')
    ])
  ]);
