import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App_Collection_Image from './App_Collection_Image';
import App from './App';
import Directus from './Directus';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>                 
            </Route>
            <Route path="/:title" element={<App_Collection_Image />}/>
            <Route path="/:title/:number" element={<App_Collection_Image />}/>
            <Route path="/directus" element={<Directus />} /> 

        </Routes>
    </BrowserRouter>    
);
reportWebVitals();
