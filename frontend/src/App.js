// frontend/src/App.js

import React from 'react';
import { generateNewPost } from './utils/generatePost';

function App() {
  const handleGeneratePost = () => {
    generateNewPost();
  };

  return (
    <div className="App">
      <h1>Generador de Posts</h1>
      <button onClick={handleGeneratePost}>Generar Nuevo Post</button>
    </div>
  );
}

export default App;
