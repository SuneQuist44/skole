import React from 'react';
import '../../scss/home.scss';

export const Home = () => {
    return (
        <ul id="items-container">
            { (window.location.pathname === '/') ? null : <li className="item"><a href="/">Home</a></li>}
            <li className="item"><a href="/portfolio">Portfolio</a></li>
            <li className="item"><a href="/contact">Contact</a></li>
        </ul>
    );
};