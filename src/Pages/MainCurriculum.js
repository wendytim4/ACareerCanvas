import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import '../Styles/App.css';
import '../Styles/MainCurriculum.css';

const MainCurriculum = () => {
    const navigate = useNavigate()
    const [curriculumData, setCurriculumData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);

  // Fetch education data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = sessionStorage.getItem("studentId");

        const response = await fetch(
          `http://localhost/api/getcurriculum.php?student_id=${studentId}`
        );
        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok) {
          setCurriculumData(data);
        } else {
          console.error("Error fetching curriculum data");
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


  const handleCheckboxChange = (curriculum_id) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.includes(curriculum_id);
  
      if (isAlreadySelected) {
        // If already selected, uncheck the item by filtering it out
        return prevSelectedItems.filter((id) => id !== curriculum_id);
      } else {
        // If not selected, check the item by adding it to the array
        return [...prevSelectedItems, curriculum_id];
      }
    });
  };

  const selectedSkills = curriculumData.filter((curriculumItem) =>
    selectedItems.includes(curriculumItem.curriculum_id)
    );

    console.log("Submitting data:", selectedSkills);

  const handleCheckAll = () => {
    const allExperienceIds = curriculumData.map((item) => item.curriculum_id);
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
        "http://localhost/api/curriculum_cv.php",
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


  const handledelete = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", selectedSkills);

    try {
      const response = await fetch(
        "http://localhost/api/curriculum_cvdel.php",
        {
          method: "DELETE",
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
        console.log("Deleted Data sent successfully", data);
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
            <label htmlFor="inputEmail4">EXTRA CURRICULUM ACTIVITIES</label>
          </div>
          <hr className="long-line" style={{ width: '100%', border: '1px solid black' }} />
        </div>

        {curriculumData.map((curriculumItem) => (
          <div key={curriculumItem.curriculum_id} className='row-grid'>
            <div className='left-side-achievement'>
              <CheckBoxIcon
                color={selectedItems.includes(curriculumItem.curriculum_id) ? "primary" : "disabled"}
                onClick={() => handleCheckboxChange(curriculumItem.curriculum_id)}
              />
            </div>

            <div className='right-side'>
                <div className="labels-container">
                    <label htmlFor="label1">Organization :</label>
                    <span id="label1">{curriculumItem.organization_name}</span>
                </div>

                <div className="labels-container">
                    <label htmlFor="label1">Activity :</label>
                    <span id="label1">{curriculumItem.activity_name}</span>
                </div>

                <div className="labels-container">
                    <label htmlFor="label1">Start Date :</label>
                    <span id="label1">{curriculumItem.start_date}</span>
                </div>

                <div className="labels-container">
                    <label htmlFor="label1">End Date :</label>
                    <span id="label1">{curriculumItem.end_date}</span>
                </div> 
  
                <div className="labels-container">
                    <label htmlFor="label1">Description :</label>
                    <span id="label1">{curriculumItem.description}</span>

                </div>

                <div className="labels-container">
                    <label htmlFor="label1">Description :</label>
                    <span id="label1">{curriculumItem.descriptionone}</span>

                </div>

                <div className="labels-container">
                    <label htmlFor="label1">Description :</label>
                    <span id="label1">{curriculumItem.descriptiontwo}</span>

                </div>

                <div> 
                    <button className='main-primary-btn'>Approved</button>
                </div>
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
        <button type="button" className="main-primary-btn" onClick={handledelete}>
         Remove from CV
        </button>
        <button
          type="submit"
          className="main-primary-btn"
          onClick={() => navigate("/activity")}
        >
          Add
        </button>
      </div>
    </div>
  );
};


export default MainCurriculum;
