import "../Styles/Projects.css";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Projects = () =>
{
  const [formData, setFormData] = useState({
    project_name: "",
    project_owner: "",
    start_date: "",
    end_date: "",
    student_id: "",
    project_description:"",
  });
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentId = sessionStorage.getItem("studentId");

        if (studentId && !isNaN(studentId)) {
          const response = await fetch(
            `http://localhost/api/student.php?student_id=${studentId}`
          );

          if (response.ok) {
            const data = await response.json();
            setFormData((prevData) => ({
              ...prevData,
              ...data,
              student_id: parseInt(studentId),
            }));
          } else {
            console.error("Error fetching student data");
          }
        } else {
          console.error("Invalid or missing studentId in sessionStorage");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStudentData();
  }, []); // Update the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    if (!formData.student_id) {
      console.error("Missing student_id in formData");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/api/project.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("Response:", response);

      if (response.ok) {
        console.log(data.message);
        console.log("Data sent successfully", data);
      } else {
        console.error(data.error);
        console.error("Error sending data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    
    }
  };

  return (
    <div className="boarder-container">
      <div className="form-project-row">
        <div className="form-group col-md-6">
          <label htmlFor="project_name">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="project_name"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="project_owner">Project Owner</label>
          <input
            type="text"
            className="form-control"
            id="project_owner"
            name="project_owner"
            value={formData.project_owner	}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-project-row">
        <div className="form-group col-md-6">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            className="form-control"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-project-row">
        <div className="form-project-row">
          <div className="form-group col-md-6">
            <label htmlFor="project_description">Project Description</label>
            <input
              type="text"
              className="form-control"
              id="project_description"
              name="project_description"
              style={{ width: "800px", height: "100px" }}
              value={formData.project_description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-project-row">
          <div className="form-group col-md-6">
            <div className="moveDown">
              <h6>
                <Link to="/MainProject"> Add New Project</Link>
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
