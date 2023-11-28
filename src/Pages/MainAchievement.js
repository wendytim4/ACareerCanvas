import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../Styles/MainAchievement.css';
import '../Styles/App.css';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

const MainAchievement = () => {
    const navigate = useNavigate()

  return (
      <div className='boarder-container'>

            <div className="form-student-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">ACHIEVEMENT</label>
                  </div>
                  <hr className="long-line"  style={{ width: '100%', border: '1px solid black' }}/>
            </div>

        <div className='row-grid'>

            <div className='left-side-achievement'>
                <CheckBoxIcon/>
            </div>

            <div className='right-side'>

                <div className="labels-container">
                    <label htmlFor="label1">Achivement :</label>
                    <span id="label1"> 2nd Place</span>
                </div>

                <div className="labels-container">
                    <label htmlFor="label1">Organization :</label>
                    <span id="label1"> Ashesi D:lab </span>
                </div>

            </div>

            <div> 
                <button className='main-primary-btn'>Approved</button>
            </div>
            
        </div>

        <div className='btn-row-achievement'> 
            <button className='main-primary-btn' onClick={()=> {navigate("/")}}>Cancel</button>
            <button className='main-primary-btn' onClick={()=> {navigate("/achievements")}}>Edit</button>
            <button className='main-primary-btn' onClick={()=> {navigate("/")}}>Delete</button>
            <button className='main-primary-btn' onClick={()=> {navigate("/achievements")}}>Add</button>
        </div> 

    </div>
  );
};

export default MainAchievement;
