import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import router from './Routes';

import { Cursor } from './Components/Partial/Cursor/Cursor.jsx';
import { MagnetEffect } from './Components/Partial/Cursor/MagnetEffect';

import './Components/scss/main.scss';

function App() {

  useEffect(() => {
    document.querySelectorAll('.item a').forEach(el => new MagnetEffect(el));
  }, []);

  return (
    <React.Fragment>
      <Cursor />
      <Router>
        <Switch>
          {
            router.map((routes, id) => (
              routes.exact
                ? <Route key={id} exact path={routes.link} component={routes.component} />
                : <Route key={id} path={routes.link} component={routes.component} />
            ))
          }
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
