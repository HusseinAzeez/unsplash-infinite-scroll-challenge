import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Image from "./Image";

class Images extends Component {
  state = {
    images: [],
    start: 1,
    count: 30
  };

  componentDidMount() {
    const { count, start } = this.state;
    axios
      .get(`api/photos?count=${count}&start=${start}`)
      .then(res => this.setState({ images: res.data }));
  }

  fetchImages = () => {
    const { count, start } = this.state;
    this.setState({ start: start + count });
    axios
      .get(`api/photos?count=${count}&start=${start}`)
      .then(res =>
        this.setState({ images: this.state.images.concat(res.data) })
      );
  };

  render() {
    console.log(this.state);
    return (
      <div className="images">
        <InfiniteScroll
          dataLength={this.state.images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.images.map(image => (
            <Image key={image.id} image={image} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default Images;
