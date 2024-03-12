// landing.jsx
import './Landing.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink,Link } from 'react-router-dom';

function App() {
  const [state, setState] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://squad-55-worst-icecream-isharode.onrender.com/delete/${id}`);
    
      const response = await axios.get('https://squad-55-worst-icecream-isharode.onrender.com/icecream');
      setState(response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <div className='main'>
        <nav className='navbar'>
          <div className='searchbar'>
            <input className='input' type="text" placeholder="Search..." />
          </div>
          <div className='about'>
            <NavLink to="/form" className="register-button">
              <p className='login'>Add</p>
            </NavLink>
          </div>

          <div>
          <NavLink to="/login" className="login-button">
              <p className='login'>Login</p>
            </NavLink>
          </div>

          <div>
          <NavLink to="/signup" className="signup-button">
             <p className='signup'>Signup
             </p>
            </NavLink>
          </div>
        </nav>
        <div className='tagline'>
          <h2>Taste the Mistake: A regrettable spoonful in every bite! 😬 </h2>
        </div>

        <div className='content'>
          <div className='card-container'>
            {state.map((icecream) => {
              console.log("Current icecream:", icecream);
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
