import React from 'react';
import axios from 'axios';
import Auth from '../auth/Auth';

class WishlistsNew extends React.Component {

  state = {
    errors: {}
  };

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/api/wishlists',
      method: 'POST',
      data: this.state,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/wishlists'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Event</label>
          <input className="input" name="event" placeholder="Event" onChange={this.handleChange} value={this.state.event || ''}/>
          {this.state.errors.event &&<small>{this.state.errors.event}</small>}
        </div>

        <div className="field">
          <label className="label">Date</label>
          <input className="input" type="date" name="date" placeholder="Date of Event"
            onChange={this.handleChange} value={this.state.date || ''}/>
          {this.state.errors.date &&<small>{this.state.errors.date}</small>}
        </div>

        <button className="button">CREATE NEW EVENT</button>
      </form>
    );
  }
}


export default WishlistsNew;
