import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/App.css";
import "../Styles/MainProject.css";

import CheckBoxIcon from "@mui/icons-material/CheckBox";

const MainProject = () => {
  const navigate = useNavigate();
    
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
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

  const handleCheckboxChange = (project_id) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.includes(project_id);

      if (isAlreadySelected) {
        return prevSelectedItems.filter((id) => id !== project_id);
      } else {
        return [...prevSelectedItems, project_id];
      }
    });
  };

  const handleCheckAll = () => {
    const allExperienceIds = projectData.map((item) => item.project_id);
    setSelectedItems(allExperienceIds);
  };

  const handleUncheckAll = () => {
    setSelectedItems([]);
  };

  const handleCheckSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", projectData);
    console.log(projectData[0].student_id);
    console.log(projectData[0].end_date);
    if (!projectData[0].student_id) {
      console.error("Missing student_id in projectData");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/api/project_cv.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData[0]),
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
      console.log("Error");
      //console.error("Error:", error);
    }
  };

//   if (
//     !Array.isArray(experienceData) ||
//     experienceData.length === 0 ||
//   experienceData.message
//   ) {
//     return (
//       <div className="boarder-container">
//         <div className="form-student-row">
//           <div className="form-group col-md-6">
//             <label htmlFor="inputEmail4">EXPERIENCE</label>
//             <hr
//               className="long-line"
//               style={{ width: "100%", border: "1px solid black" }}
//             />
//           </div>
//         </div>
//         <div className="right-side">
//           <div className="labels-container">
//             <label htmlFor="label1">
//               {experienceData.message || "No education data found"}
//             </label>
//           </div>
//         </div>

//         <div className="btn-row-education">
//           <button
//             type="submit"
//             className="main-primary-btn"
//             onClick={() => navigate("/experience")}
//           >
//             Add
//           </button>
//         </div>
//       </div>
//     );
//   }
  return (
    <div className='boarder-container'>
      <div className="form-student-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">PROJECT</label>
        </div>
        <hr className="long-line" style={{ width: '100%', border: '1px solid black' }} />
      </div>

      {projectData.map((projectItem) => (
        <div key={projectItem.project_id} className='row-grid'>
          <div className='left-side-experience'>
            <CheckBoxIcon
              color={selectedItems.includes(projectItem.project_id) ? "primary" : "disabled"}
              onClick={() => handleCheckboxChange(projectItem.project_id)}
            />
          </div>

          <div className='right-side'>
          <div className="labels-container">
              <label htmlFor="label1">Project Name :</label>
              <span id="label1">{projectItem.project_name}</span>
          </div>

          <div className="labels-container">
              <label htmlFor="label1">Project Owner :</label>
              <span id="label1">{projectItem.project_owner}</span>
          </div>

          <div className="labels-container">
              <label htmlFor="label1">Start Date :</label>
              <span id="label1">{projectItem.start_date}</span>
          </div>

          <div className="labels-container">
              <label htmlFor="label1">End Date :</label>
              <span id="label1">{projectItem.end_date}</span>
          </div> 

          <div className="labels-container">
              <label htmlFor="label1">Project Description One:</label>
              <span id="label1">{projectItem.project_description}</span>
          </div>  

          <div className="labels-container">
              <label htmlFor="label1">Project Description Two:</label>
              <span id="label1">{projectItem.project_descriptionone}</span>
          </div> 

          <div className="labels-container">
              <label htmlFor="label1">Project Description One:</label>
              <span id="label1">{projectItem.project_descriptiontwo}</span>
          </div> 

          </div>

          <div className="approval-status">
          <button className='main-primary-btn'>Approved</button>
          </div>
          </div>
          ))}

      <div className="btn-row-exp">
        <button type="button" className="main-primary-btn" onClick={handleCheckAll}>
          Check All
        </button>
        <button type="button" className="main-primary-btn" onClick={handleUncheckAll}>
          Uncheck All
        </button>
        <button type="button" className="main-primary-btn" onClick={handleCheckSubmit}>
          Submit Checked
        </button>
      </div>
    </div>
  );
};


export default MainProject;









 