import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import Pagination from "react-js-pagination";

const Home = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    console.log("test");
    const fetchPosts = (pageNumber = 1) => {
      axios
        .get(`https://dummyjson.com/posts?skip=${pageNumber}&limit=10`)
        .then((resPosts) => {
          const posts = resPosts.data.posts;
          posts.forEach((post, i) => {
            axios
              .get(`https://dummyjson.com/users/${post.userId}`)
              .then((resUsers) => {
                posts[i].user = resUsers.data;
                const refresh = [...data.data];
                setData({ data: refresh });
              });
          });
          setData({
            data: posts,
          });
          console.log("posts", posts);
        });
    };
    fetchPosts();
  }, [activePage]);

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setActivePage({ activePage: pageNumber });
  };

  const pagination = {
    flex: 1,
    alignItems: "center",
  };
  return (
    <div className="App">
      {data.data &&
        data.data.map((item, i) => (
          <Card key={i}>
            <Card.Body>
              <Card.Title key={item.id}>
                {item.user?.firstName || "loading..."}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      {console.log(data)}
      <Pagination
        style={pagination}
        totalItemsCount={30}
        onChange={(e) => handlePageChange(e)}
        activePage={activePage}
        itemsCountPerPage={10}
        pageRangeDisplayed={5}
      />
    </div>
  );
};

export default Home;
