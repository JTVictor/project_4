import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Base64 from '../../common/Base64';

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
    axios.get('/api/wishlists')
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
        <div className="filters">
          <input className="input" placeholder="Search" onChange={this.handleSearch} />

          <div className="control">
            <div className="select is-fullwidth">
              <select onChange={this.handleSort}>
                <option value="name|asc">Name (A-Z)</option>
                <option value="name|desc">Name (Z-A)</option>)
              </select>
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          {this.state.wishlists.map(wishlist =>
            <div key={wishlist._id} className="column is-one-third-desktop is-half-tablet">
              <Link to={`/wishlists/${wishlist._id}`}>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2 className="title">{wishlist.listOwner}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>

        <form onSubmit={this.handleSubmit}>

          <Base64 name="image" handleChange={this.handleChange} />
          <button>Submit</button>

        </form>

      </section>
    );
  }
}

export default WishlistsIndex;
