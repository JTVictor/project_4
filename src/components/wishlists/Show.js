import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Base64 from '../../common/Base64';
import Auth from '../auth/Auth';

class WishlistsShow extends React.Component {

  constructor() {
    super();
    this.state = {
      wishlist: {
        items: []
      }
    };
  }

  componentDidMount() {
    axios.get(`/api/wishlists/${this.props.match.params.id}`)
      .then(res => this.setState({ wishlist: res.data }));
  }

  saveWishlist = () => {
    axios({
      url: `/api/wishlists/${this.props.match.params.id}`,
      method: 'PUT',
      data: this.state.wishlist,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/api/vision',
      data: this.state
    })
      .then(res => {
        const item = {
          image: this.state.image,
          label: res.data.label
        };
        const items = this.state.wishlist.items.concat(item);
        const wishlist = { ...this.state.wishlist, items };
        this.setState({ wishlist }, this.saveWishlist);
      });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  render() {
    return (
      <section>
        <div className="card">
          <div className="card-content">
            <div className="content">
              <h1 className="title">{this.state.wishlist.listOwner}</h1>
              <h3 className="title">{this.state.wishlist.event} - {this.state.wishlist.date}</h3>
            </div>
          </div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <Base64 name="image" handleChange={this.handleChange} />
          <button>Submit</button>
        </form>





        <div className="columns is-multiline">
          {this.state.wishlist.items.map((item, index) =>
            <div className="column is-one-quarter" key={index}>
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <div>
                      <img className="giftImage" src={item.image} />
                      <h4>{item.label}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </section>
    );
  }
}

export default WishlistsShow;
