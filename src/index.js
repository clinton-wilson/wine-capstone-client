import React from 'react';
import { createRoot } from "react-dom/client"
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Wine } from './Wine';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Wine />
  </BrowserRouter>
);


