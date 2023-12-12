import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import '../Styles/App.css';
import '../Styles/MainExperience.css';

const MainExperience = () => {
  const navigate = useNavigate();
  const [experienceData, setExperienceData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // Fetch education data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = sessionStorage.getItem("studentId");
        console.log(studentId);
        const response = await fetch(
          `http://localhost/api/getExperience.php?student_id=${studentId}`
        );
        const data = await response.json();

        if (response.ok) {
          setExperienceData(data);
        } else {
          console.error("Error fetching experience data");
        }
      } catch (error) {
        console.error("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();  
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }

  const handleCheckboxChange = (experience_id) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.includes(experience_id);
  
      if (isAlreadySelected) {
        // If already selected, uncheck the item by filtering it out
        return prevSelectedItems.filter((id) => id !== experience_id);
      } else {
        // If not selected, check the item by adding it to the array
        return [...prevSelectedItems, experience_id];
      }
    });
  };

  const selectedSkills = experienceData.filter((experienceItem) =>
  selectedItems.includes(experienceItem.experience_id)
    );

    console.log("Submitting data:", selectedSkills);

  const handleCheckAll = () => {
    const allExperienceIds = experienceData.map((item) => item.experience_id);
    setSelectedItems(allExperienceIds);
  };

  const handleUncheckAll = () => {
    setSelectedItems([]);
  };

  const handleCheckSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", selectedSkills);
       

    try {
      const response = await fetch(
        "http://localhost/api/experience_cv.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedSkills),
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
          <label htmlFor="inputEmail4">EXPERIENCE</label>
        </div>
        <hr className="long-line" style={{ width: '100%', border: '1px solid black' }} />
      </div>

      {experienceData.map((experienceItem) => (
        <div key={experienceItem.experience_id} className='row-grid'>
          <div className='left-side-experience'>
            <CheckBoxIcon
              color={selectedItems.includes(experienceItem.experience_id) ? "primary" : "disabled"}
              onClick={() => handleCheckboxChange(experienceItem.experience_id)}
            />
          </div>

          <div className='right-side'>

          <div className="labels-container">
              <label htmlFor="label1">School :</label>
              <span id="label1">{experienceItem.job_title}</span>
          </div>

          <div className="labels-container">
              <label htmlFor="label1">Program :</label>
              <span id="label1">{experienceItem.organization_name}</span>
          </div>

          
          <div className="labels-container">
              <label htmlFor="label1">City :</label>
              <span id="label1">{experienceItem.city}</span>
          </div>

          <div className="labels-container">
              <label htmlFor="label1">Country :</label>
              <span id="label1">{experienceItem.country}</span>
          </div>

          <div className="labels-container">
              <label htmlFor="label1">Start Date :</label>
              <span id="label1">{experienceItem.start_date}</span>
          </div>

          <div className="labels-container">
              <label htmlFor="label1">End Date :</label>
              <span id="label1">{experienceItem.end_date}</span>
          </div> 
          <div class
          Name="labels-container">
              <label htmlFor="label1">Description One:</label>
              <span id="label1">{experienceItem.job_description}</span>
          </div>  

          <div className="labels-container">
              <label htmlFor="label1">Description Two:</label>
              <span id="label1">{experienceItem.job_descriptionone}</span>
          </div> 

          <div className="labels-container">
              <label htmlFor="label1">Description Three:</label>
              <span id="label1">{experienceItem.job_descriptiontwo}</span>
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

export default MainExperience;
