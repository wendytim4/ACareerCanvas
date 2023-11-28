import '../Styles/App.css';
import '../Styles/Activity.css';
import { Link } from "react-router-dom";

import React from 'react';

const CoCurriculum=()=>{
return (
        <div className='boarder-container'>
              <div className="form-project-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">Co-Curriculum Activity</label>
                    <input type="text" className="form-control" id="inputEmail4"/>
                  </div>

                  <div className="form-group col-md-6">
                    <label for="inputEmail">Organization</label>
                    <input type="text" className="form-control" id="inputEmail4" />
                  </div>
              </div>

              <div className="form-project-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">Start Date</label>
                    <input type="text" className="form-control" id="inputEmail4"/>
                  </div>

                  <div className="form-group col-md-6">
                    <label for="inputEmail">End Date</label>
                    <input type="text" className="form-control" id="inputEmail4" />
                  </div>
              </div>     
    
            <div className="form-project-row">
              <div className="form-project-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">Co-Curriculum Description</label>
                    <input type="text" className="form-control" id="description" style={{width: '995px', height: '100px'}}/>
                  </div>
              </div>

              <div className="form-project-row">
                  <div className="form-group col-md-6">
                    <div className="moveDown"><h6><Link to ="/save"> Add New Co-Curriculum </Link></h6></div>
                  </div> 
              </div>



            </div>     

            <div className="btn-row-activity">
                    <button type="submit" className="main-primary-btn">cancel</button>
                    <button type="submit" className="main-primary-btn">save</button>
              </div>

        </div>
    )
  }
export default CoCurriculum;
