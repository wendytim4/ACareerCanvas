import '../Styles/App.css';
import '../Styles/Skills.css';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



const Skills=()=>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skill_name: "",
    skill_id:"",
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
        "http://localhost/api/skill.php",
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
      <div className='boarder-container'>
            <div className="form-skills-row">
            <div className="form-group col-md-6">
              <label htmlFor="skill_name">Skill Name</label>
              <input
                type="text"
                className="form-control"
                id="skill_name"
                name="skill_name"
                value={formData.skill_name}
                onChange={handleChange}
              />
              </div> 
            </div>
        
        <input type="hidden" name="student_id" value={formData.student_id}/> 
        <div className="skill-form">
            <div className="form-skills-row">
                <div className="form-group col-md-6">
                <h6>
                  <Link to="/save"> Add New Skill </Link>
                </h6>
                </div>
            </div>  

            <div className="btn-row-education-form">
              <button type="button" className="main-primary-btn" onClick={handleSave}>
                save
              </button>
            </div>
            
        </div>
      </div>
    );
  };
export default Skills;