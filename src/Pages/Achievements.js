import '../Styles/Achievements.css';
import { Link } from "react-router-dom";

import React from 'react';


const Achievements=()=>{
return (
        <div className='boarder-container'>
              <div className="form-archive-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">Achievement</label>
                    <input type="text" className="form-control" id="inputEmail4"/>
                  </div>

                  <div className="form-group col-md-6">
                    <label for="inputEmail">Organization</label>
                    <input type="text" className="form-control" id="inputEmail4" />
                  </div>
              </div>

              <div className="form-project-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">Year Attained</label>
                    <input type="text" className="form-control" id="inputEmail4"/>
                  </div>

                  <div className="form-project-row">
                      <div className="form-group col-md-6">
                        <div className="moveUp"><h6><Link to ="/save"> Add New Achievement </Link></h6></div>
                      </div> 
                  </div>

              </div>     


              <div className="btn-row-achievements">
                  <button type="submit" className="main-primary-btn">cancel</button>
                  <button type="submit" className="main-primary-btn">save</button>
              </div>
          </div>

    )
  }
export default Achievements;