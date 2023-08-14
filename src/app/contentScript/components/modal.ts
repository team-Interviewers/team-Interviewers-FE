import { style } from '@vanilla-extract/css';

/* Modal CSS */
const modalStyles = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '100000',
  padding: '20px',
  backgroundColor: 'white',
  border: '1px solid black',
  borderRadius: '5px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  color: '#000000',
  transition: 'ease-in-out 0.15s',
  display: 'none',
});

/* Create Modal HTML Components */
const div = document.createElement('div');
div.className = modalStyles;
div.innerHTML = '<h1>Modal :)</h1>';

export const modalDiv = div;
