import React, { useState, useEffect } from 'react';
import '../../scss/cursor.scss';

export const Cursor = () => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState('blcok');

    useEffect(() => {

        const addEventListeners = () => {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseenter', onMouseEnter);
            document.addEventListener('mouseleave', onMouseLeave);
        }

        const removeEventListeners = () => {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mouseenter', onMouseEnter);
        }

        addEventListeners();
        return () => removeEventListeners()
    }, []);

    const onMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY })

    const onMouseLeave = () => setHidden('none');
    const onMouseEnter = () => setHidden('block');

    return (
        <span
            className="cursor"
            style={{
                left: `${position.x - 5}px`,
                top: `${position.y - 5}px`,
                display: hidden,
                backgroundColor: window.location.pathname === '/' ? 'white' : '#3c80ff'
            }}
        />
    )
}