// Components
import { Home } from './Components/Pages/Home/Home.jsx';
import { Portfolio } from './Components/Pages/Portfolio/Portfolio.jsx';
import { Contact } from './Components/Pages/Contact/Contact.jsx';
import { Login } from './Components/Pages/Login/Login.jsx';
import { Register } from './Components/Pages/Register/Register.jsx';

const routes = [
    {
        link: '/',
        exact: true,
        component: Home
    },
    {
        link: '/portfolio',
        component: Portfolio
    },
    {
        link: '/contact',
        component: Contact
    },
    {
        link: '/login',
        component: Login
    },
    {
        link: '/register',
        component: Register
    }
]

export default routes;