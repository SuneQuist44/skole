import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Components
import { Header, Footer, Article } from '../../Partial/Sections/Components';

export function Portfolio() {

    const routes = [
        { route: '/', name: <FontAwesomeIcon icon={faHome} /> },
        { route: '/contact', name: <FontAwesomeIcon icon={faIdCardAlt} /> },
    ]

    return (
        <section className="section-portfolio">
            <Header routes={routes} />
            <Article title={'New Portfolio'} desc={'Some text here!'} />
            <Footer title={'Portfolio Footer'} />
        </section>
    )
}