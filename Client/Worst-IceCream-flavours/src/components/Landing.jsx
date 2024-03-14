import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const [icecreams, setIcecreams] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedUser, setSelectedUser] = useState("All");
  const [uniqueUsers, setUniqueUsers] = useState(["All"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://squad-55-worst-icecream-isharode.onrender.com/icecream');
        setIcecreams(response.data);
        
        // Extract unique usernames
        const users = ["All", ...new Set(response.data.map(item => item.created_by).filter(Boolean))];
        setUniqueUsers(users);
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
      setIcecreams(response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleAdd = () => {
    navigate('/form');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('login');
    setAuthenticated(false);
    navigate('/');
  };

  // Filter icecreams based on selected user
  const filteredIcecreams = icecreams.filter(
    icecream => selectedUser === "All" || icecream.created_by === selectedUser
  );

  return (
    <>
      <div className='main'>
        <nav className='navbar'>
          <div className='searchbar'>
            <input className='input' type="text" placeholder="Search..." />
          </div>
          <div className='buttons'>
            {authenticated && (
              <button className="add-button" onClick={handleAdd}>
                Add
              </button>
            )}

            {authenticated ? (
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="login-button">Login</button>
                </NavLink>
                <NavLink to="/signup">
                  <button className='signup-button'>Signup</button>
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {authenticated && (
          <div className="dropdown-container">
            <select
              onChange={(e) => setSelectedUser(e.target.value)}
              value={selectedUser}
            >
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        )}

        <div className='tagline'>
          <h2>Taste the Mistake: A regrettable spoonful in every bite! 😬</h2>
        </div>

        <div className='content'>
          <div className='card-container'>
            {filteredIcecreams.map((icecream) => (
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
                    <Link to={`/update/${icecream._id}`} className="update">Update</Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;