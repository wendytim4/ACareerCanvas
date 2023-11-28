import '../Styles/App.css';
import '../Styles/Skills.css';
import { Link, useNavigate } from "react-router-dom";

import React from 'react';

const Skills=()=>{
  const navigate = useNavigate()

return (
      <div className='boarder-container'>
            <div className="form-skills-row">
              <div className="form-group col-md-6">
                  <div className="heading">
                    <h1>SKILLS</h1>
                  </div>
              </div> 
            </div>

        <div className="skill-form">

            <div className="form-skills-row">
                <div className="form-group col-md-6">
                  <label for="inputEmail4">Add Skill</label>
                  <input type="text" className="form-control" id="inputEmail4"/>
                </div>
            </div>  

            <div className="form-btn">
                  <button type="submit" className="main-primary-btn" onClick={()=> {navigate('/')}}>cancel</button>
                  <button type="submit" className="main-primary-btn" onClick={()=> {navigate('/')}}>save</button>
            </div>
            
        </div>
      </div>
    )
  }
export default Skills;