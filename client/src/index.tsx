import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateQRHome from './CreateQRHome';
import FoundQRHome from "./FoundQRHome";
import QRReaderHome from './QRReaderHome';
import QRGenerateHome from './QRGenerateHome';
import PageNotFound from './PageNotFound'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateQRHome />} />
        <Route path="/FoundQRHome" element={<FoundQRHome />} />
        <Route path="/CreateQRHome" element={<CreateQRHome />} />
        <Route path="/QRReaderHome" element={<QRReaderHome />} />
        <Route path="/QRGenerateHome" element={<QRGenerateHome />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
