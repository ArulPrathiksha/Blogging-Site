import { useContext, useEffect, useState } from 'react';
import { getPosts } from '../../controllers/postsController.js';
import { PostContext } from '../../contexts/PostContext';
import Post from '../../components/Post';

const Home = () => {
  const { posts, setPosts } = useContext(PostContext);

  //loading state
  const [loading, setLoading] = useState(true);

  //grab all posts on page load
  useEffect(() => {
    setTimeout(async () => {
      //get all posts
      const data = await getPosts();
      //update posts
      setPosts(data.posts);
      //remove th eloading
      setLoading(false);
    }, 1000);
  }, []);
  console.log(posts);
  return (
    <section className="card w-auto">
      <h1 className="title">Latest Posts</h1>
      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))}
    </section>
  );
};

export default Home;
