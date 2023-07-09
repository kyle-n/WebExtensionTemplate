import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  useEffect(() => {
    console.log('hello from the popup!');
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>My New Web Extension</h1>
    </div>
  );
};

const rootElem = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElem);
root.render(<App />);
