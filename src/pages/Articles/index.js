import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { Card } from "react-bootstrap";

export default class Home extends Component {
  state = {
    data: [],
    activePage: 1,
  };

  async componentDidMount() {
    this.updatePost();
  }

  updatePost(pageNumber = 1) {
    axios
      .get(`https://dummyjson.com/posts?skip=${pageNumber}&limit=10`)
      .then((resPosts) => {
        const posts = resPosts.data.posts;

        posts.forEach((post, i) => {
          axios
            .get(`https://dummyjson.com/users/${post.userId}`)
            .then((resUsers) => {
              posts[i].user = resUsers.data;
              let refresh = [...this.state.data];
              refresh[i] = posts[i];
              this.setState({ data: refresh });
            });
        });

        this.setState({
          data: posts,
        });

        console.log("posts", posts);
      });
  }

  handlePageChange = (pageNumber) => {
    this.updatePost(pageNumber);
    this.setState({ activePage: pageNumber });
  };
  render() {
    const allData = this.state.data.map((item, i) => {
      const card = {
        margin: 20,
        padding: 10,
        border: "2px solid #00adb5",
      };

      return (
        <Card style={card} key={i}>
          <Card.Body>
            <Card.Title key={item.id}>
              {item.user?.firstName || "loading..."}
            </Card.Title>
          </Card.Body>
        </Card>
      );
    });
    const pagination = {
      flex: 1,
      alignItems: "center",
    };
    return (
      <div className="App">
        <Card>
          <Card.Body>
            <Card.Title>{allData}</Card.Title>
          </Card.Body>
        </Card>

        <Pagination
          style={pagination}
          totalItemsCount={30}
          onChange={this.handlePageChange}
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          pageRangeDisplayed={5}
        />
      </div>
    );
  }
}
