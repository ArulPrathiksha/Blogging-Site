import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updatePost } from '../../controllers/postsController';
import Alert from '../../components/Alert';
import { PostContext } from '../../contexts/PostContext';

const Update = () => {
  //post context
  const { posts, setPosts } = useContext(PostContext);

  //use navigate hook
  const navigate = useNavigate();
  const { state } = useLocation();

  //error state
  const [error, setError] = useState(null);

  //form data state
  const [title, setTitle] = useState(state.title);
  const [body, setBody] = useState(state.body);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      //update new post
      const data = await updatePost(state._id, title, body);
      //update post state
      setPosts([...posts, data.post]);
      //navigate to dashboard
      navigate('/dashboard');
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <section className="card">
        <h1 className="title">Update the Post</h1>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            className="input"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            rows="6"
            className="input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Caption for Post"
          ></textarea>
          <button className="btn">Update</button>
        </form>
        {error && <Alert msg={error} />}
      </section>
    </div>
  );
};

export default Update;
