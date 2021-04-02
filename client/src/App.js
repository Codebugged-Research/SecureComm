import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './MainComponent.js';
import {
  ChakraProvider
} from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
