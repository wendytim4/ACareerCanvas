import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/App.css";
import "../Styles/Education.css";

const Education = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    universityName: "",
    programOfStudy: "",
    startDate: "",
    endDate: "",
    student_id: "",
    location: "",
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
  }, []); 

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
        "http://localhost/api/education.php",
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
      <div className="form-archive-row">
        <div className="form-group col-md-6">
          <label htmlFor="universityName">University Name</label>
          <input
            type="text"
            className="form-control"
            id="universityName"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="programOfStudy">Program of Study</label>
          <select
            className="form-control"
            id="programOfStudy"
            name="programOfStudy"
            value={formData.programOfStudy}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a program
            </option>
            <option value="Bsc Computer Science">Bsc Computer Science</option>
            <option value="Bsc Management Information Systems">
              Bsc Management Information Systems
            </option>
            <option value="Bsc Business Administration">
              Bsc Business Administration
            </option>
            <option value="Bsc Computer Engineering">
              Bsc Computer Engineering
            </option>
            <option value="Bsc Electrical and Electronics Engineering">
              Bsc Electrical and Electronics Engineering
            </option>
            <option value="Bsc Mechanical Engineering">
              Bsc Mechanical Engineering
            </option>
          </select>
        </div>
      </div>

      <div className="form-project-row">
        <div className="form-group col-md-6">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <input type="hidden" name="student_id" value={formData.student_id} onChange={handleChange}/>
      <div className="form-education-row">
        <div className="form-group col-md-6">
          <div className="moveble">
            <h6>
              <Link to="/save"> Add New Education Details </Link>
            </h6>
          </div>
        </div>
      </div>

      <div className="btn-row-education-form">
        <button type="button" className="main-primary-btn" onClick={handleSave}>
          save
        </button>
      </div>
    </div>
  );
};

export default Education;
