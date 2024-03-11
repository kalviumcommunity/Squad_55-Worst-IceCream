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
      // After deletion, fetch the updated data
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
        </nav>
        <div className='tagline'>
          <h2>Taste the Mistake: A regrettable spoonful in every bite! 😬 </h2>
        </div>

        <div className='content'>
          <div className='card-container'>
            {state.map((player) => {
              console.log("Current Player:", player);
              return (
                <div className='card' key={player._id}>
                  <div className='images'>
                    <img src={player.image} alt={player.flavour} />
                  </div>
                  <div className='flav'>
                    <h2>{player.flavour}</h2>
                  </div>
                  <div className='taste-color'>
                    <p>Taste: {player.taste}</p>
                    <p>Color: {player.color}</p>
                  </div>
                  <div>
                    <p>Rating: {player.rating}/10</p>
                  </div>
                  <div className='up-del'>
                    <button className='delete' onClick={() => handleDelete(player._id)}>
                      Delete
                    </button>
                    <Link to={`/update/${player._id}`} className="update">
                        Update
                      </Link>
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
