import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Components
import { Header, Footer, Article } from '../../Partial/Sections/Components';

const routes = [
    { route: '/', name: <FontAwesomeIcon icon={faHome} /> },
    { route: '/portfolio', name: <FontAwesomeIcon icon={faBookmark} /> },
]

export function Contact() {
    return (
        <section className="section-contact">
            <Header routes={routes} />
            <Article title={'New Contact'} desc={'Some text here!'} />
            <Footer title={'Contact Footer'} />
        </section>
    )
}