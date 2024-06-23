import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../controllers/postsController';
import Alert from '../../components/Alert';
import { PostContext } from '../../contexts/PostContext';

const Create = () => {
  //post context
  const { posts, setPosts } = useContext(PostContext);

  //use navigate hook
  const navigate = useNavigate();

  //error state
  const [error, setError] = useState(null);

  //form data state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState([]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      //create new post
      const data = await createPost(title, body, image);
      //update post state
      setPosts([...posts, data.post]);
      //navigate to dashboard
      navigate('/dashboard');
      console.log('data : ' + data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <section className="card">
        <h1 className="title">Create new Post</h1>
        <form onSubmit={handleCreate} encType="multipart/form-data">
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
          <input
            type="file"
            name="image"
            multiple
            onChange={(e) => setImage(e.target.files)}
          />
          <button className="btn">Create</button>
        </form>
        {error && <Alert msg={error} />}
      </section>
    </div>
  );
};

export default Create;
