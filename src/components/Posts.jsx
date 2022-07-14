import React from "react";
import styled from "styled-components";
import axios from "axios";
import Pagination from "./Pagination";

const Posts = () => {
  // 총 게시물 수
  const [posts, setPosts] = React.useState([]);

  // 페이지 당 게시물 수
  const [limit, setLimit] = React.useState(10);

  // 현재 페이지 번호
  const [page, setPage] = React.useState(1);

  // 첫 게시물의 위치
  const offset = (page - 1) * limit;

  React.useEffect(() => {
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((res) => {
      setPosts(res.data);
    });
  }, []);

  const countedPosts = ({ target }) => {
    setLimit(Number(target.value));
  };

  return (
    <>
      <Layout>
        <header>
          <h1>게시글 목록</h1>
        </header>

        <label>
          페이지 당 표시할 게시물:&nbsp;
          <select type="number" value={limit} onChange={countedPosts}>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>

        <main>
          {posts.slice(offset, offset + limit).map(({ id, title, body }) => {
            return (
              <article key={id}>
                <h3>
                  {id}. {title}
                </h3>
                <p>{body}</p>
              </article>
            );
          })}
        </main>

        <footer>
          <Pagination
            total={posts.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      </Layout>
    </>
  );
};

export default Posts;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;
