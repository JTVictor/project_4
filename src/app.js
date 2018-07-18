import React from 'react';
import ReactDOM from 'react-dom';
import WishlistsIndex from './components/wishlists/Index';
import WishlistsShow from './components/wishlists/Show';
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';
import Navbar from './components/common/Navbar';
import WishlistsNew from './components/wishlists/New';


import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bulma';
import './scss/style.scss';

class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
        <main>
          <Navbar />
          <Switch>
            <Route path="/wishlists/new" component={WishlistsNew} />
            <Route path="/wishlists/:id" component={WishlistsShow} />
            <Route path="/wishlists" component={WishlistsIndex} />
            <Route path="/login" component={AuthLogin} />
            <Route path="/register" component={AuthRegister} />
          </Switch>
        </main>
      </BrowserRouter>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
