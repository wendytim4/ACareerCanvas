import React, { Link,useState, useEffect } from "react";

const Display = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/careercanvas/fetchStudentData.php"
        );
        const data = await response.json();

        if (response.ok) {
          setFormData(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  if (!formData) {
    return <div>Loading...</div>; // Add loading state or handle the case when data is not available
  }
    
  return (
    <div>
      <div>
        <p>First Name: {formData.firstName}</p>
        <p>Last Name: {formData.lastName}</p>
        <p>GitHub: {formData.githubUsername}</p>
        <p>LinkedIn: {formData.linkedInProfile}</p>
        <p>Email: {formData.email}</p>
        <p>Contact: {formData.phoneNumber}</p>
        <p>City: {formData.city}</p>
        <p>Country: {formData.country}</p>
        <p>Address: {formData.address}</p>
      </div>

      <div className="form-education-row">
        <div className="form-group col-md-6">
          <div className="moveble">
            <h6>
              <Link to="/maineducation"> Next </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
