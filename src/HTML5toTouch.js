import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MouseTransition, TouchTransition } from 'react-dnd-multi-backend';

// for native browsers => HTML5Backend
// for mobile browsers => TouchBackend
// preview => show preview of dragged item
// MouseTransition => transition effect for mouse
// TouchTransition => transition effect for touch

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      preview: true,
      transition: MouseTransition,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: false, delayTouchStart: 100 },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

export default HTML5toTouch;
