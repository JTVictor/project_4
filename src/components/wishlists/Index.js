import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Base64 from '../../common/Base64';
import Auth from '../auth/Auth';

class WishlistsIndex extends React.Component {

  constructor() {
    super();
    this.state = {
      wishlists: [],
      sort: 'name|asc',
      items: []
    };
  }

  componentDidMount() {
    axios.get('/api/wishlists', { headers: { 'Authorization': `Bearer ${Auth.getToken()}` }})
      .then(res => this.setState({ wishlists: res.data }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/vision',
      data: this.state
    })
      .then(res => console.log(res));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  render() {
    return (
      <section>


        <div className="columns is-multiline">
          {this.state.wishlists.map(wishlist =>
            <div key={wishlist._id} className="column is-one-third-desktop is-half-tablet">
              <Link to={`/wishlists/${wishlist._id}`}>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2 className="title">{wishlist.event} - {wishlist.date}</h2>
                      <h3 className="items">{wishlist.items.length} items on this list.</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>



      </section>
    );
  }
}

export default WishlistsIndex;
