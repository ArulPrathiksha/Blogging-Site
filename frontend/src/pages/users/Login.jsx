import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import { loginUser } from '../../controllers/usersController';
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
  //use user context
  const { setUser } = useContext(UserContext);

  //use navigate hook
  const navigate = useNavigate();
  //Error state
  const [error, setError] = useState(null);

  //form data state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //login the user
      await loginUser(email, password);
      //update user state
      setUser({ email, posts: [] });
      //Navigate to Dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="card">
        <h1 className="title">Login to your Account</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn">Login</button>
        </form>
        {error && <Alert msg={error} />}
      </section>
    </div>
  );
};

export default Login;
