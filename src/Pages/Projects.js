import "../Styles/Projects.css";
import { Link } from "react-router-dom";

import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Projects = () => {
  const [projectName, setprojectName] = useState("");
  const [projectOwner, setprojectOwner] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectDescription, setprojectDescription] = useState("");

  const handleSave = async () => {
    console.log("Form Data:", {
      projectName,
      projectOwner,
      startDate,
      endDate,
      projectDescription,
    });
    const data = {
      projectName,
      projectOwner,
      startDate,
      endDate,
      projectDescription,
    };

    try {
      const response = await fetch(
        "http://localhost/careercanvas/project.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.message);
        // Redirect or perform additional actions upon successful save
      } else {
        console.error(responseData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="boarder-container">
      <div className="form-project-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            name="projectName"
            value={projectName}
            onChange={(e) => setprojectName(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="inputEmail">Project Owner</label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            name="projectOwner"
            value={projectOwner}
            onChange={(e) => setprojectOwner(e.target.value)}
          />
        </div>
      </div>

      <div className="form-project-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="inputEmail4"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="inputEmail">End Date</label>
          <input
            type="date"
            className="form-control"
            id="inputEmail4"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-project-row">
        <div className="form-project-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Project Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="projectDescription"
              style={{ width: "990px", height: "100px" }}
              onChange={(e) => setprojectDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="form-project-row">
          <div className="form-group col-md-6">
            <div className="moveDown">
              <h6>
                <Link to="/save"> Add New Project</Link>
              </h6>
            </div>
          </div>
        </div>

        <div className="btn-row-project-form">
          <button type="submit" className="main-primary-btn">
            cancel
          </button>
          <button
            type="button"
            className="main-primary-btn"
            onClick={handleSave}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};
export default Projects;
