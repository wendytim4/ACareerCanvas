import { useState } from "react";
import "../Styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.first_name || !data.last_name || !data.email || !data.password) {
      console.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/careercanvas/register.php",
        data
      );

      if (response.status === 200) {
        console.log("Data sent successfully");
         navigate("/studentprofile");
      } else {
        console.error("Error sending data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main-box">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Create an account</h1>
          </div>
        </div>

        <div className="row">
          <div className="row-md-6"> First Name</div>
          <div className="row-md-6">
            <input
              type="text"
              name="first_name"
              className="form-control"
              onChange={handleChange}
              value={data.first_name}
            />
          </div>
        </div>

        <div className="row">
          <div className="row-md-6"> Last Name</div>

          <div className="row-md-6">
            <input
              type="text"
              name="last_name"
              className="form-control"
              onChange={handleChange}
              value={data.last_name}
            />
          </div>
        </div>

        <div className="row">
          <div className="row-md-6"> Email</div>
          <div className="row-md-6">
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={data.email}
            />
          </div>
        </div>

        <div className="row">
          <div className="row-md-6"> Password</div>
          <div className="row-md-6">
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={data.password}
            />
          </div>
        </div>

        <div className="row">
          <button
            type="submit"
            name="Submit"
            value="Sign Up"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            save
          </button>
        </div>

        <div className="row">
          <div className="col-md-12 text-center">
            <h6>
              Already have an account ? <Link to="/login"> Login </Link>
            </h6>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
