import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import '../Styles/MainAchievement.css';
import '../Styles/App.css';

const MainAchievement = () => {
    const navigate = useNavigate();
    const [achievementData, setachievementData] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessages, setErrorMessages] = useState([]);
     
    // Fetch education data from the backend when the component mounts
    useEffect(() => {

        const fetchData = async () => {
        try {
            const studentId = sessionStorage.getItem("studentId");

            const response = await fetch(
            `http://localhost/api/getachievement.php?student_id=${studentId}`
            );
            
            const data = await response.json();
            console.log("API Response:", data);

            if (response.ok) {
              setachievementData(data);
            } else {
            console.error("Error fetching Achievement data");
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

    const handleCheckboxChange = (achievement_id) => {
      setSelectedItems((prevSelectedItems) => {
        const isAlreadySelected = prevSelectedItems.includes(achievement_id);
    
        if (isAlreadySelected) {
          // If already selected, uncheck the item by filtering it out
          return prevSelectedItems.filter((id) => id !== achievement_id);
        } else {
          // If not selected, check the item by adding it to the array
          return [...prevSelectedItems, achievement_id];
        }
      });
    };

    const selectedSkills = achievementData.filter((achievementItem) =>
    selectedItems.includes(achievementItem.achievement_id)
      );

      console.log("Submitting data:", selectedSkills);
  
    const handleCheckAll = () => {
      const allExperienceIds = achievementData.map((item) => item.achievement_id);
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
          "http://localhost/api/achievement_cv.php",
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
          "http://localhost/api/achievements_cvdel.php",
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
            <label htmlFor="inputEmail4">ACHIEVEMENT</label>
          </div>
          <hr className="long-line" style={{ width: '100%', border: '1px solid black' }} />
        </div>

        {achievementData.map((achievementItem) => (
          <div key={achievementItem.achievement_id} className='row-grid'>
            <div className='left-side-achievement'>
              <CheckBoxIcon
                color={selectedItems.includes(achievementItem.achievement_id) ? "primary" : "disabled"}
                onClick={() => handleCheckboxChange(achievementItem.achievement_id)}
              />
            </div>
            
            <div className='right-side'>
                <div className="labels-container">
                    <label htmlFor="label1">Achivement :</label>
                    <span id="label1">{achievementItem.achievement_name}</span>
                </div>

                <div className="labels-container">
                    <label htmlFor="label1">Organization :</label>
                    <span id="label1">{achievementItem.organization_name}</span>
                </div>


                <div className="labels-container">
                    <label htmlFor="label1">Year Attained :</label>
                    <span id="label1">{achievementItem.year_attained}</span>
                </div>

            </div>

            <div> 
                <button className='main-primary-btn'>Approved</button>
            </div>
            
        </div>
        ))}



        
        
        <div className="btn-row-exp">
        <button type="button" className="main-primary-btn" onClick={handleCheckAll}>
          Check All
        </button>
        <button type="button" className="main-primary-btn" onClick={handledelete}>
          Remove from CV
        </button>
        <button type="button" className="main-primary-btn" onClick={handleUncheckAll}>
          Uncheck All
        </button>
        <button type="button" className="main-primary-btn" onClick={handleCheckSubmit}>
          Submit Checked
        </button>
        <button
          type="submit"
          className="main-primary-btn"
          onClick={() => navigate("/achievements")}
        >
          Add
        </button>
      </div>
    </div>
      
  );
};

export default MainAchievement;
