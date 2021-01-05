import React, { useState } from 'react';
import useAuth from '../../Partial/Auth/Auth.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Components
import { Header, Footer, Article } from '../../Partial/Sections/Components';

const routes = [
    { route: '/', name: <FontAwesomeIcon icon={faHome} /> },
    { route: '/portfolio', name: <FontAwesomeIcon icon={faBookmark} /> },
    { route: '/contact', name: <FontAwesomeIcon icon={faIdCardAlt} /> },
]

export function Register() {
    const { createAccount } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount(name, email.trim(), password.trim());
    }

    return (
        <section className="section-login">
            <Header routes={routes} />
            <Article title={'New Login'} desc={'Some text here!'} />
            <Footer title={'Login Footer'} />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </section>
    )
}