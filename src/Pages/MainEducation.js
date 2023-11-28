import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Styles/App.css";
import "../Styles/Education.css";
import axios from "axios";

const Education = () => {
  const navigate = useNavigate();
  const { student_id } = useParams();
  const [studentId, setStudentId] = useState(null);
  const [universityName, setUniversityName] = useState("");
  const [programOfStudy, setProgramOfStudy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const response = await axios.get(
          `http://localhost/careercanvas/getStudentId.php?student_id=${student_id}`
        );

        if (response.status === 200) {
          setStudentId(response.data.studentId);
        } else {
          console.error("Error fetching student ID");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStudentId();
  }, [student_id]);

  const handleSave = async () => {
    console.log("Form Data:", {
      universityName,
      programOfStudy,
      startDate,
      endDate,
      studentId,
    });

    if (!universityName || !programOfStudy || !startDate || !endDate) {
      console.error("All fields are required");
      return;
    }

    const data = {
      universityName,
      programOfStudy,
      startDate,
      endDate,
      studentId
    };

    try {
      const response = await axios.post(
        "http://localhost/careercanvas/education.php",
        data
      );

      if (response.status === 200) {
        console.log("Data sent successfully");
        
      } else {
        console.error("Error sending data");
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
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="programOfStudy">Program of Study</label>
          <select
            className="form-control"
            id="programOfStudy"
            value={programOfStudy}
            onChange={(e) => setProgramOfStudy(e.target.value)}
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

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
