import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/App.css";
import "../Styles/MainProject.css";

import CheckBoxIcon from "@mui/icons-material/CheckBox";

const MainProject = () => {
    const navigate = useNavigate();
    
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch education data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = sessionStorage.getItem("studentId");

        const response = await fetch(
          `http://localhost/api/getProjectData.php?student_id=${studentId}`
        );
        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok) {
          setProjectData(data);
        } else {
          console.error("Error fetching project data");
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
    return <p>Loading...</p>; 
  }
    
  return (
    <div className="boarder-container">
      <div className="form-student-row">
        <div className="form-group col-md-6">
          <label for="inputEmail4">PROJECT</label>
        </div>
        <hr
          className="long-line"
          style={{ width: "100%", border: "1px solid black" }}
        />
      </div>
      {projectData.map((projectItem) => (
        <div key={projectItem.project_id} className="row-grid">
          <div className="left-side-project">
            <CheckBoxIcon />
          </div>

          <div className="right-side">
            <div className="labels-container-project">
              <label htmlFor="label1">Project Name : </label>
              <span id="label1"> {projectItem.project_name}</span>
            </div>

            <div className="labels-container">
              <label htmlFor="label1">Project Owner : </label>
              <span id="label1"> {projectItem.owner}</span>
            </div>

            <div className="labels-container">
              <label htmlFor="label1">Start Date :</label>
              <span id="label1"> {projectItem.start_date}</span>
            </div>

            <div className="labels-container">
              <label htmlFor="label1">End Date :</label>
              <span id="label1"> {projectItem.end_date}</span>
            </div>

            <div className="labels-container">
              <label htmlFor="label1">Description :</label>
              <span id="label1"> {projectItem.project_description}</span>
            </div>
          </div>

          <div>
            <button className="main-primary-btn">Approved</button>
          </div>
        </div>
      ))}
      ;
      <div className="btn-row-project">
        <button className="main-primary-btn">Cancel</button>
        <button className="main-primary-btn">Edit</button>
        <button className="main-primary-btn">Delete</button>
        <button
          className="main-primary-btn"
          onClick={() => {
            navigate("/projects");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default MainProject;
