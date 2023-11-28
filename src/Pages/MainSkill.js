import React from 'react';
import { useNavigate } from "react-router-dom";
import '../Styles/MainSkill.css';
import '../Styles/App.css';


import CheckBoxIcon from '@mui/icons-material/CheckBox';

const MainSkill = () => {
    const navigate = useNavigate()
  return (
      <div className='boarder-container'>
            <div className="form-student-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">SKILL</label>
                  </div>
                  <hr className="long-line"  style={{ width: '100%', border: '1px solid black' }}/>
            </div>

        <div className='row-skill'>

            <div className='left-side-experience'>
                <CheckBoxIcon/>
            </div>

            <div className='right-side'>

                <div className="labels-container">
                    <label htmlFor="label1">Achivement :</label>
                    <span id="label1"> 2nd Place</span>
                </div>
            </div>
        </div>

        <div className='row-skill'>

            <div className='left-side-experience'>
                <CheckBoxIcon/>
            </div>

            <div className='right-side'>

                <div className="labels-container">
                    <label htmlFor="label1">Achivement :</label>
                    <span id="label1"> 2nd Place</span>
                </div>
            </div>
        </div>

        <div className='btn-row-skill' id='skills'> 
            <button className='main-primary-btn' onClick={()=> {navigate("/")}}>Cancel</button>
            <button className='main-primary-btn' onClick={()=> {navigate("/")}}>Edit</button>
            <button className='main-primary-btn'onClick={()=> {navigate("/")}}>Delete</button>
            <button className='main-primary-btn'onClick={()=> {navigate("/skills")}}>Add</button>
        </div> 

    </div>
  );
};

export default MainSkill;
