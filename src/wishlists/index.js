import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Base64 from '../common/Base64';

class WishlistsIndex extends React.Component {

  constructor() {
    super();
    this.state = {
      wishlists: [],
      sort: 'name|asc'
    };
  }

  componentDidMount() {
    axios.get('/api/wishlists')
      .then(res => this.setState({ wishlists: res.data }));
  }

    handleSearch = (e) => {
      this.setState({ search: e.target.value });
    }

    filteredWishlists = (wishlists) => {
      const re = new RegExp(this.state.search, 'i');
      return wishlists.filter(wishlist => {
        return re.test(wishlist.name)||re.test(wishlist.crimes);
      });
    }

      handleSort = (e) => {
        this.setState({ sort: e.target.value });
      }

      sortedWishlists = (wishlists) => {
        const [ prop, dir ] = this.state.sort.split('|');
        return _.orderBy(wishlists, prop, dir);
      }

      sortedAndFilteredWishlists = () => {
        const filtered = this.filteredWishlists(this.state.wishlists);
        return this.sortedWishlists(filtered);
      }

      handleSubmit = (e) => {
        e.preventDefault();
        axios({
          method: 'POST',
          url: '/api/vision',
          data: this.state
        })
          .then(res => console.log(res.data));
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
              {this.sortedAndFilteredWishlists().map(wishlist =>
                <div key={wishlist._id} className="column is-one-third-desktop is-half-tablet">
                  <Link to={`/wishlists/${wishlist._id}`}>
                    <div className="card">
                      <div className="card-image">
                        <figure className="image">
                          <img src={wishlist.image} />
                        </figure>
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <h2 className="title">{wishlist.name}</h2>
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
