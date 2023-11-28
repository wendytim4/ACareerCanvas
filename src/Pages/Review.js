import React from 'react';
import { Link } from "react-router-dom";
import '../Styles/MainExperience.css';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Review = () => {
  return (
      <div className='boarder-container'>
        
            <div className="form-student-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">EXPERIENCE</label>
                  </div>
                  <hr className="long-line"  style={{ width: '100%', border: '1px solid black' }}/>
            </div>

        <div className='row-grid'>

            <div className='left-side-experience'>
                <CheckBoxIcon/>
            </div>

            <div className='right-side'>

                <div className="labels-container">
                    <label htmlFor="label1">School :</label>
                    <span id="label1"> Ashesi University</span>
                </div>

                <div className="labels-container">
                    <label htmlFor="label1">Program :</label>
                    <span id="label1"> Computer Science</span>
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
                <button className='main-primary-btn'>Approve</button>
            </div>
        </div>

        <div className='btn-row-exp'> 
            <button className='main-primary-btn'>Cancel</button>
            <button className='main-primary-btn'>Review</button>
        </div> 



    </div>
  );
};

export default Review;
