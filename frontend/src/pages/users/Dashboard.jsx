import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, getUserPosts } from '../../controllers/postsController.js';
import { UserContext } from '../../contexts/UserContext.jsx';
import Post from '../../components/Post.jsx';
import Alert from '../../components/Alert.jsx';
import Success from '../../components/Success.jsx';

const Dashboard = () => {
  //use user context
  const { user, setUser } = useContext(UserContext);

  //loading state
  const [loading, setLoading] = useState(true);

  //error state
  const [error, setError] = useState(null);

  //success state
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const { userPosts, email } = await getUserPosts();
      setUser({ email, posts: userPosts });
      //remove th loading
      setLoading(false);
    }, 500);
  }, []);

  //handle delete
  const handleDelete = async (_id) => {
    if (confirm('Do you want to delete this post ? ')) {
      try {
        //delete post
        const data = await deletePost(_id);
        setSuccess(data.success);
      } catch (error) {
        setError(error.message);
      }
      //remove th eparticular post
      const newPost = user.posts.filter((post) => post._id !== _id);
      //update user state
      setUser({ ...user, posts: newPost });
    }
  };
  return (
    <section className="card w-auto">
      <p>{user.email}</p>
      <h1 className="title">User Dashboard</h1>
      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}
      {user.posts.length === 0 && <p>No Posts yet!!</p>}
      {success && <Success msg={success} />}
      {error && <Alert msg={error} />}
      {user.posts &&
        user.posts.map((post) => (
          <div key={post._id}>
            <Post post={post}>
              <div className="flex items-center">
                <Link
                  className="fa-solid fa-pen-to-square nav-link 
                text-green-500 hover:bg-green-200"
                  title="Update"
                  state={post}
                  to="/update"
                ></Link>
                <button
                  className="fa-solid fa-trash-can  nav-link 
                text-red-500 hover:bg-red-200"
                  title="Delete"
                  onClick={() => handleDelete(post._id)}
                ></button>
              </div>
            </Post>
          </div>
        ))}
    </section>
  );
};
export default Dashboard;
