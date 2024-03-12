import { useForm } from "react-hook-form";
import { useState } from "react";
// For navigation
import { NavLink } from "react-router-dom";
import "./Form.css";

function App() {
  const [state, setState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // On click of SIGN UP, showing data entered in console
  const onSubmit = (data) => {
    console.log(data);
    setState(true);
  };


  return (
    <div>
      <div>
      <nav>
      <div className="logo">sIGNUP Page</div>
      
      </nav>
    </div>
      <div className="contain">
        
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="app">
            {state && <p className="success">REGISTRATION SUCCESSFUL!</p>}

            <label>Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              {...register("username", {
                required: "Username is Required!",
                minLength: {
                  value: 3,
                  message: "username must be more than 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "username must be less than 30 characters",
                },
              })}
            />
            {errors.username && <p className="mon">{errors.username.message}</p>}


            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is Required!",
                minLength: {
                  value: 10,
                  message: "Password must be more than 10 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password must be less than 30 characters",
                },
                pattern: {
                  // For atleast one special character included 
                  value: /.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-].*/,
                  message: "Please include at least one special character",
                },
              })}
            />
            {errors.password && <p className="mon">{errors.password.message}</p>}

           
            <div className="button">
              <input type="submit" value="SIGNUP" />
            </div>

            <p className="usser">Already a user? <NavLink to="/login" className="login-link">Login</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;