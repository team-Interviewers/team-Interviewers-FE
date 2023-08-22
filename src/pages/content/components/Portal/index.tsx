import { createRoot } from 'react-dom/client';
import Portal from '@root/src/pages/content/components/Portal/Portal';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';

refreshOnUpdate('pages/content');

/* Portal Component 생성 */
const portalDiv = document.createElement('div');
portalDiv.id = 'portal';
document.body.insertBefore(portalDiv, document.body.firstChild);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = portalDiv.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

attachTwindStyle(rootIntoShadow, shadowRoot);

createRoot(rootIntoShadow).render(<Portal />);
