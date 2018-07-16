import React from 'react';
import ReactDOM from 'react-dom';
import WishlistsIndex from './components/wishlists/Index';
import WishlistsShow from './components/wishlists/Show';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/wishlists/:id" component={WishlistsShow} />
            <Route path="/wishlists" component={WishlistsIndex} />
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
