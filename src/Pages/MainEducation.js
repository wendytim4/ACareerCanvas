import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "../Styles/App.css";
import "../Styles/MainEducation.css";

const MainEducation = () => {
  const navigate = useNavigate();

  
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch education data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = sessionStorage.getItem("studentId");

        const response = await fetch(
          `http://localhost/careercanvas/getEducationData.php?student_id=${studentId}`
        );
        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok) {
          setEducationData(data);
        } else {
          console.error("Error fetching education data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <div className="boarder-container">
      <div className="form-student-row">
        <div className="form-group col-md-6">
          <label for="inputEmail4">EDUCATION</label>
        </div>
        <hr
          className="long-line"
          style={{ width: "100%", border: "1px solid black" }}
        />
      </div>

      {educationData.map((educationItem) => (
        <div key={educationItem.education_id} className="row-grid">
          <div left-side>
            <CheckBoxIcon />
          </div>

          <div className="right-side">
            <div className="labels-container">
              <label htmlFor="label1">School :</label>
              <span id="label1">{educationItem.university_name}</span>
            </div>

            <div className="labels-container">
              <label htmlFor="label1">Program :</label>
              <span id="label1">{educationItem.program_of_study}</span>
            </div>

            <div className="labels-container">
              <label htmlFor="label1">Start Date :</label>
              <span id="label1">{educationItem.start_date}</span>
            </div>

            <div className="labels-container">
              <label htmlFor="label1">End Date :</label>
              <span id="label1">{educationItem.end_date}</span>
            </div>
          </div>

          <div className="approval-status">
            <button type="submit" className="main-primary-btn">
              Approved
            </button>
          </div>
        </div>
      ))}

      <div className="btn-row-education">
        <button type="submit" className="main-primary-btn">
          cancel
        </button>
        <button type="submit" className="main-primary-btn">
          edit
        </button>
        <button type="submit" className="main-primary-btn">
          delete
        </button>
        <button
          type="submit"
          className="main-primary-btn"
          onClick={() => navigate("/education")}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default MainEducation;
