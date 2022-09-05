import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

const POST_PAR_PAGE = 10;

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Author = ({ user }) => {
  return user ? (
    <h3>
      {user.firstName} {user.lastName}
    </h3>
  ) : (
    <h3>Anonymous</h3>
  );
};
function usePage() {
  const query = useQuery();
  const history = useHistory();
  const [getter, setter] = useState(() => {
    return query.get("page") ;
  });

  useEffect(() => {
    history.push(`/articles?page=${Math.max(1, getter+1)}`)
  }, [getter]);
  return [getter, setter]
}

export const Articles = () => {
  const [page, setPage] = usePage(0);
  const [posts, setPosts] = useState();
  const [users, setUsers] = useState();

  const load = useCallback(async () => {
    let response = await axios.get(
      `https://dummyjson.com/posts?skip=${
        POST_PAR_PAGE * page
      }&limit=${POST_PAR_PAGE}`
    );
    setPosts(response.data.posts);
    console.log(response.data.posts)
    response = await axios.get(`https://dummyjson.com/users`);
    setUsers(response.data.users);
  }, [page]);
  
  useEffect(() => {
    load();
  }, [load]);

  return (
    posts &&
    users && (
      <div style={{ padding: "25px" }}>
        <h2>
          Showing users: {page * POST_PAR_PAGE + 1} -{" "}
          {(page + 1) * POST_PAR_PAGE}
        </h2>
        {posts.map((p) => (
          <div   style={{
            padding: "16px",
            margin: "16px",
            borderRadius: "5px",
            border: "2px black solid",
          }}>
            <h2>{p.title}</h2>
            <Author user={users.find((u) => u.id === p.userId)} />
            <p>{p.body}</p>
            <>
              {p.tags.map((t) => (
                <span>{t} | </span>
              ))}
            </>
          </div>
        ))}
        <div>
          {/* pagination */}
          <div  style={{
              marginTop: "2px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}>
            {/* back */}
            <button style={{ marginLeft: "auto" }} onClick={() => setPage(page - 1)}>
              Back
            </button>

            {/* current */}
            <span style={{ marginRight: "1rem", marginLeft: "1rem" }}>
              {page + 1}
            </span>

            {/* next */}
            <button style={{ marginRight: "auto" }} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    )
  );
};