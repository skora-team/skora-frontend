<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
>>>>>>> fe9de68 (First Commit)
