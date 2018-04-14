import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

export const routerTransition =
    trigger('routerTransition', [
        // route 'enter' transition
        transition('* <=> *', [

            // styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.5s', style({ opacity: 1 }))
        ]),
    ]);
