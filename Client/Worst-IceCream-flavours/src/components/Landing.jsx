// landing.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const [state, setState] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://squad-55-worst-icecream-isharode.onrender.com/icecream');
        setState(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('login');
    setAuthenticated(!!isAuthenticated);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://squad-55-worst-icecream-isharode.onrender.com/delete/${id}`);

      const response = await axios.get('https://squad-55-worst-icecream-isharode.onrender.com/icecream');
      setState(response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleAdd = () => {
    // Logic to handle adding new items
    // Redirect to the add page or perform the necessary action
    navigate('/form');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('login');
    setAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <div className='main'>
        <nav className='navbar'>
          <div className='searchbar'>
            <input className='input' type="text" placeholder="Search..." />
          </div>
          <div className='buttons'>
          <div>
            {authenticated && (
              <button className="add-button" onClick={handleAdd}>
                <p className='addup'>Add</p>
              </button>
            )}
          </div>

          {authenticated ? (
            <div>
              <button className="logout-button" onClick={handleLogout}>
                <p className='logout'>Logout</p>
              </button>
            </div>
          ) : (
            <div>
              <NavLink to="/login">
                <button  className="login-button">
                <p className='loginn'>Login</p>
                </button>
              </NavLink>
            </div>
          )}

          <div>
            <NavLink to="/signup" >
              <button className='signup-button'>
              <p className='signup'>Signup</p>
              </button>
            </NavLink>
          </div>
          </div>
        </nav>
        <div className='tagline'>
          <h2>Taste the Mistake: A regrettable spoonful in every bite! 😬 </h2>
        </div>

        <div className='content'>
          <div className='card-container'>
            {state.map((icecream) => {
              return (
                <div className='card' key={icecream._id}>
                  <div className='images'>
                    <img src={icecream.image} alt={icecream.flavour} />
                  </div>
                  <div className='flav'>
                    <h2>{icecream.flavour}</h2>
                  </div>
                  <div className='taste-color'>
                    <p>Taste: {icecream.taste}</p>
                    <p>Color: {icecream.color}</p>
                  </div>
                  <div>
                    <p>Rating: {icecream.rating}/10</p>
                  </div>
                  {authenticated && (
                    <div className='up-del'>
                      <button className='delete' onClick={() => handleDelete(icecream._id)}>
                        Delete
                      </button>
                      <button className="update">
                        <Link to={`/update/${icecream._id}`} className='uplink'>
                          Update
                        </Link>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
