import React from 'react';
import axios from 'axios';
import Auth from './Auth';
import Flash from './Flash';

class AuthLogin extends React.Component {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/api/login',
      method: 'POST',
      data: this.state
    })
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/wishlists');
      })
      .catch(() => {
        Flash.setMessage('danger', 'Invalid credentials.');
        this.props.history.replace('/login');
      });
  }

  handleChange = ({target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="media-content">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="email">Email</label>
            <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
          </div>
          <div className="field">
            <label className="password">Password</label>
            <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          </div>
          <button className="button">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthLogin;
