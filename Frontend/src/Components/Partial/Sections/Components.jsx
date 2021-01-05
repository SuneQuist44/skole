import React from 'react';
import '../../scss/components.scss';
import useAuth from '../Auth/Auth.jsx';

export const Header = ({ title, background, routes }) => {
    let { loggedIn, user, logout } = useAuth();
    return (
        <header className="header">
            <h2>T.</h2>
            <section className="routes">
                <ul>
                    {routes.map((route, id) => (
                        <li key={id} className="item"><a href={route.route}>{route.name}</a></li>
                    ))}
                </ul>
            </section>
            <ul className="user">
                {loggedIn === true
                    ? <React.Fragment>
                        <li className="routes__item">{user.name}</li>
                        <li className="routes__item" onClick={logout}><a href="/">Logout</a></li>
                    </React.Fragment>
                    : <React.Fragment>
                        <li className="routes__item"><a href="/register">Register</a></li>
                        <li className="routes__item"><a href="/login">Login</a></li>
                    </React.Fragment>
                }
            </ul>
        </header>
    )
}

export const Article = ({ title, desc }) => {
    return (
        <article>
            <h2>{title}</h2>
            <p>{desc}</p>
        </article>
    )
}

export const Footer = ({ title }) => {
    return (
        <footer>
            <h2>{title}</h2>
        </footer>
    )
}

export const Registration = ({ inputs }) => {
    return (
        <React.Fragment>

        </React.Fragment>
    );
}