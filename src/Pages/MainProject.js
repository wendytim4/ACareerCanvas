import React from 'react';
import { useNavigate } from "react-router-dom";
import '../Styles/App.css';
import '../Styles/MainProject.css';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

const MainProject = () => {
    const navigate = useNavigate()
  return (
      <div className='boarder-container'>
            <div className="form-student-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">PROJECT</label>
                  </div>
                  <hr className="long-line"  style={{ width: '100%', border: '1px solid black' }}/>
            </div>

        <div className='row-grid'>

            <div className='left-side-project'>
                <CheckBoxIcon/>
            </div>

            <div className='right-side'>

            <div className="labels-container-project">
                    <label htmlFor="label1">Project Name : </label>
                    <span id="label1"> Software Engineer</span>
                </div>

                <div className="labels-container">
                    <label htmlFor="label1">Project Owner : </label>
                    <span id="label1"> Chotel Developers</span>
                </div>

                <div className="labels-container">
                    <label htmlFor="label1">Start Date :</label>
                    <span id="label1"> 12/02/2021</span>
                </div>

                <div className="labels-container">
                    <label htmlFor="label1">End Date :</label>
                    <span id="label1"> 12/02/2021</span>
                </div> 
  
                <div className="labels-container">
                    <label htmlFor="label1">Description :</label>
                    <span id="label1">I am a highly motivated and results-driven professional with a proven track record in project management. I have successfully led cross-functional teams to deliver complex projects on time and within budget. My expertise lies in developing and implementing strategic plans, mitigating risks, and ensuring seamless communication among team members and stakeholders. I excel in identifying and leveraging opportunities for process improvement, driving efficiency, and optimizing project workflows. My commitment to excellence and my ability to adapt to dynamic environments make me a valuable asset in achieving project objectives and organizational success. </span>
                </div>  

            </div>

            <div> 
                <button className='main-primary-btn'>Approved</button>
            </div>
        </div>

        <div className='btn-row-project'> 
            <button className='main-primary-btn'>Cancel</button>
            <button className='main-primary-btn'>Edit</button>
            <button className='main-primary-btn'>Delete</button>
            <button className='main-primary-btn' onClick={()=> {navigate("/projects")}}>Add</button>
        </div> 

    </div>
  );
};

export default MainProject;
