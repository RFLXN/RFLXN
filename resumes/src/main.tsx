import { createRoot } from 'react-dom/client';
import Resume, { resumeMeta } from './content/resume.mdx';
import './styles.css';

declare global {
  interface Window {
    __resumeRenderReady?: Promise<void>;
  }
}

document.documentElement.lang = resumeMeta.lang;
document.title = resumeMeta.title;
document.documentElement.dataset.renderReady = 'false';

const rootElement = document.querySelector('#root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

window.__resumeRenderReady = new Promise((resolve) => {
  createRoot(rootElement).render(<Resume />);

  requestAnimationFrame(() => {
    document.documentElement.dataset.renderReady = 'true';
    resolve();
  });
});
