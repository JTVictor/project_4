import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../auth/Auth';

class Navbar extends React.Component {

  state = {
    navbarOpen: false
  }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false });
    }
  }

  logout = () => {
    Auth.logout();
    this.props.history.push('/');
  }

  render() {
    console.log(Auth.isAuthenticated());
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">



        <a role="button"
          className={`navbar-burger${this.state.navbarOpen ? ' is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={this.toggleNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>


        <div className={`navbar-menu${this.state.navbarOpen ? ' is-active' : ''}`}>
          <div className="navbar-end">
            <Link to="/criminals"  className="navbar-item">Wishlists</Link>

            {Auth.isAuthenticated() && <Link to="/wishlists/new" className="navbar-item">New</Link>}

            {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}

            {Auth.isAuthenticated() && <a onClick={this.logout} className="navbar-item">Logout</a>}

            {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}

          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
