import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/App.css";
import '../Styles/Achievements.css';

const Achievements=()=>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    achievement_name: "",
    organization_name: "",
    year_attained: "",
    student_id: "",
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
      formData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    console.log(formData);
    if (!formData.student_id) {
      console.error("Missing student_id in formData");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/api/achievements.php",
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
              <div className="form-archive-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="achievement_name">Achievement</label>
                    <input
                     type="text"
                     className="form-control"
                     id="achievement_name"
                     name="achievement_name"
                     value={formData.achievement_name}
                     onChange={handleChange}
                     />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="organization_name">Organization</label>
                    <input
                      type="text"
                      className="form-control"
                      id="organization_name"
                      name="organization_name"
                      value={formData.organization_name}
                      onChange={handleChange}
                       />
                  </div>
              </div>

              <div className="form-project-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="year_attained">Year Attained</label>
                    <input 
                       type="date"
                       className="form-control"
                       id="year_attained"
                       name="year_attained"
                       value={formData.year_attained}
                       onChange={handleChange}
                      />
                  </div>


                  <input type="hidden" name="student_id" value={formData.student_id} onChange={handleChange}/>
                  <div className="form-project-row">
                      <div className="form-group col-md-6">
                        <div className="moveUp">
                          <h6><Link to ="/save"> Add New Achievement </Link></h6></div>
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
export default Achievements;