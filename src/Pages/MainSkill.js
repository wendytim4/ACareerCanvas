import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import '../Styles/MainSkill.css';
import '../Styles/App.css';


const MainSkill = () => {
    const navigate = useNavigate();
    const [skillData, setskillData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    
    // Fetch education data from the backend when the component mounts
    useEffect(() => {
        const fetchData = async () => {
        try {
            const studentId = sessionStorage.getItem("studentId");
            const response = await fetch(
            `http://localhost/api/getskill.php?student_id=${studentId}`
            );
            const data = await response.json();
            console.log("API Response:", data);

            if (response.ok) {
            setskillData(data);
            } else {
            console.error("Error fetching skill data");
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

    const handleCheckboxChange = (skill_id) => {
      setSelectedItems((prevSelectedItems) => {
        const isAlreadySelected = prevSelectedItems.includes(skill_id);
    
        if (isAlreadySelected) {
          // If already selected, uncheck the item by filtering it out
          return prevSelectedItems.filter((id) => id !== skill_id);
        } else {
          // If not selected, check the item by adding it to the array
          return [...prevSelectedItems, skill_id];
        }
      });
    };

    const selectedSkills = skillData.filter((skillItem) =>
    selectedItems.includes(skillItem.skill_id)
      );

      console.log("Submitting data:", selectedSkills);
    
    
      const handleCheckAll = () => {
        const allExperienceIds = skillData.map((item) => item.skill_id);
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
            "http://localhost/api/skill_cv.php",
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
            "http://localhost/api/skill_cvdel.php",
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


return (
   <div className='boarder-container'>
      <div className="form-student-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">PROJECT</label>
        </div>
        <hr className="long-line" style={{ width: '100%', border: '1px solid black' }} />
      </div>

    {skillData.map((skillItem) => (

        <div key={skillItem.skill_id} className='row-grid'>
          
          <div className='left-side-experience'>
            <CheckBoxIcon
              color={selectedItems.includes(skillItem.skill_id) ? "primary" : "disabled"}
              onClick={() => handleCheckboxChange(skillItem.skill_id)}
            />
          </div>

          <div className='right-side'>

          <div className="labels-container">
              <label htmlFor="label1">Skill :</label>
              <span id="label1">{skillItem.skill_name}</span>
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
        <button type="button" className="main-primary-btn" onClick={handledelete}>
          Remove from CV
        </button>
      </div>
    </div>
  );
};

export default MainSkill;





