import '../Styles/Resume.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {View, Text} from 'react-native';

const AshesiResume = () => {

  const navigate = useNavigate()

  const [educationData, setEducationData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [achievementData, setachievementData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curriculumData, setCurriculumData] = useState([]);



  const [skills, setSkills] = useState(['JavaScript']);

     // Fetch education data from the backend when the component mounts
useEffect(() => {
  const educationData = async () => {
    try {
      const studentId = sessionStorage.getItem("studentId");

      const response = await fetch(
        `http://localhost/api/getEducationData.php?student_id=${studentId}`
      );
      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        setEducationData(data);
      } else {
        console.error("Error fetching experience data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  };


  const studentData = async () => {
    try {
      const studentId = sessionStorage.getItem("studentId");

      const response = await fetch(
        `http://localhost/api/getstudent.php?student_id=${studentId}`
      );
      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        setStudentData(data);
      } else {
        console.error("Error fetching student data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  };
  const achievmentData = async () => {
    try {
        const studentId = sessionStorage.getItem("studentId");

        const response = await fetch(
        `http://localhost/api/getachievement_cv.php?student_id=${studentId}`
        );
        
        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok) {
          setachievementData(data);
        } else {
        console.error("Error fetching Achievement data");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        setLoading(false); 
    }
    };
    const experiencData = async () => {
      try {
        const studentId = sessionStorage.getItem("studentId");

        const response = await fetch(
          `http://localhost/api/getExperience.php?student_id=${studentId}`
        );
        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok) {
          setExperienceData(data);
        } else {
          console.error("Error fetching experience data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); 
      }
    };

    const projectData = async () => {
      try {
        const studentId = sessionStorage.getItem("studentId");

        const response = await fetch(
          `http://localhost/api/getProjectData.php?student_id=${studentId}`
        );
        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok) {
          setProjectData(data);
        } else {
          console.error("Error fetching project data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };


  educationData();
  studentData();
  achievmentData();
  experiencData();
  projectData();
  projectData();
}, []); 

if (loading) {
  return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
}



   


  return (

    <div className='container-resume'>

      {studentData.map((studentItem) => (
      <header>
            <h5>{studentItem.full_name}</h5>   
            <h6 className='header'>{studentItem.addresss}  {studentItem.city}</h6>
            <h6 className='header'>{studentItem.phonenumber} | {studentItem.country} </h6>
            <h6 className='header'>{studentItem.email} | {studentItem.linkedin} | {studentItem.github}</h6>
      </header>
      ))}

      <div className='inner_container'>
        <section>
        <h5 className='nameTag' style={{ marginBottom: '0px' }}>EDUCATION</h5>
            <hr className="long"  style={{  width: '100%', margin: '0 auto', border: '1px solid black', borderColor: 'black' }}/>
            <ul>
            {educationData.map((educationItem) => (
                <li>
                <strong className="school">{educationItem.university_name}</strong> <strong><span className="location">{educationItem.location}</span></strong>
                </li>
            ))}
            {educationData.map((educationItem) => (
                <li>
                <strong className="degree">{educationItem.program_of_study}</strong> <strong>{educationItem.start_date}-{educationItem.end_date}</strong>
                </li>
            ))}
            </ul>
        </section>

        <section>
        <h5 className='nameTag' style={{ marginBottom: '0px' }}>ACHIEVEMENTS/AWARDS</h5>
            <hr className="long"  style={{  width: '100%', margin: '0 auto', border: '1px solid black', borderColor: 'black' }}/>
            <ul>
            {achievementData.map((achievementItem) => (
                <li key={achievementItem.achievment_id}>
                {/* <strong className="school">{}</strong> <strong><span className="location">{}</span></strong> */}
                <strong className="awards">{achievementItem.achievement_name} - {achievementItem.organization_name}</strong> <strong><span className="">{achievementItem.year_attained}</span></strong>
                </li>
            ))}
            {/* {education.map((award, index) => (
                <li key={index}>
                <strong className="degree">{edu.degree}</strong> <strong>{edu.year}</strong>
                </li>
            ))} */}
            </ul>
            
        </section>

        <section>
            <h5 className='nameTag' style={{ marginBottom: '0px' }}>WORK EXPERIENCE</h5>
            <hr className="long"  style={{  width: '100%', margin: '0 auto', border: '1px solid black', borderColor: 'black' }}/>
            <ul>

            {experienceData.map((experienceItem) => (
                <li key={experienceItem.experience_id}  >
                <strong className="experience">{experienceItem.organization_name} - {experienceItem.city},{experienceItem.country}</strong> <strong><span className="">{experienceItem.start_date}-{experienceItem.end_date}</span></strong>
                <strong className="experience">{experienceItem.position} </strong>

                {experienceData.map((experienceItem) => (
                    <View key={experienceItem.experience_id}>
                       <Text> • {experienceItem.job_description}</Text>
                       <Text> • {experienceItem.job_descriptionone}</Text>
                       <Text> • {experienceItem.job_descriptiontwo}</Text>

                    </View>
                    ))}
             
                </li>
            ))}
            </ul>
        </section>

        <section>
            <h5 className='nameTag' style={{ marginBottom: '0px' }}>PROJECT AND RESEARCH </h5>
            <hr className="long"  style={{  width: '100%', margin: '0 auto', border: '1px solid black', borderColor: 'black' }}/>
            <ul>

            {projectData.map((projectItem) => (
                <li key={projectItem.project_id} >
                <strong className="experience">{projectItem.project_name} - {projectItem.project_owner}</strong> <strong><span className="">{projectItem.start_date}-{projectItem.end_date}</span></strong>
                

                {projectData.map((projectItem) => (
                    <View key={projectItem.experience_id}>
                       <Text> • {projectItem.project_description}</Text>
                       <Text> • {projectItem.project_descriptionone}</Text>
                       <Text> • {projectItem.project_descriptiontwo}</Text>

                    </View>
                    ))}
                </li>
            ))}
            </ul>
        </section>

        <section>
            <h5 className='nameTag' style={{ marginBottom: '0px' }}>CO-CURRICULAR ACTIVITIES  </h5>
            <hr className="long"  style={{  width: '100%', margin: '0 auto', border: '1px solid black', borderColor: 'black' }}/>
            <ul>

            {curriculumData.map((curriculumItem) => (
                <li key={curriculumItem.curriculum_id} >
                <strong className="experience">{curriculumItem.organization_name}</strong> <strong><span className="">{curriculumItem.start_date}-{curriculumItem.end_date}</span></strong>
                <strong className="experience">{curriculumItem.	activity_name} </strong>

                {curriculumData.map((curriculumItem) => (
                    <View key={curriculumItem.curriculum_id}>
                       <Text> • {curriculumItem.description}</Text>
                       <Text> • {curriculumItem.descriptionone}</Text>
                       <Text> • {curriculumItem.descriptiontwo}</Text>

                    </View>
                    ))}
                </li>
            ))}
            </ul>
        </section>

        <section>
        <h5 className='nameTag' style={{ marginBottom: '0px' }}>SKILLS  </h5>
            <hr className="long"  style={{  width: '100%', margin: '0 auto', border: '1px solid black', borderColor: 'black' }}/>

            <ul>
            {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
            ))}
            </ul>
        </section>

        <section>
        <h5 className='nameTag' style={{ marginBottom: '0px' }}>REFERENCES </h5>
            <hr className="long"  style={{  width: '100%', margin: '0 auto', border: '1px solid black', borderColor: 'black' }}/>

            <ul>
            Available upon request 
            *STEM – Science, Technology, Engineering and Mathematics 
            </ul>
        </section>

            
      </div>
    </div>
  );
};

export default AshesiResume;



