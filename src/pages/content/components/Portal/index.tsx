import { createRoot } from 'react-dom/client';
import Portal from '@root/src/pages/content/components/Portal/Portal';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/content');

/* Portal Component 생성 */
const portalDiv = document.createElement('div');
portalDiv.id = 'portal';
document.body.insertBefore(portalDiv, document.body.firstChild);

createRoot(portalDiv).render(<Portal />);
