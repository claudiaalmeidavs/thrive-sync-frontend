import React, {useState} from "react";
import "./registerActivity.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterActivity () {

  const navigate = useNavigate();

 const [formData, setFormData] = useState({
    activity_priority: "",
    activity_title: "",
    activity_subject: "",
    activity_description: "",
 });
  
  const [imageFile, setImageFile] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
   
    const file = e.target.files[0];
    //  console.log(file)
    setImageFile(file);
};


  const handleSubmit = (e) => {
     e.preventDefault();
    axios
      .post("http://localhost:5000/activities", formData)
      .then((response) => {
        console.log(response);
        navigate("/profile");
      })

      .catch((error) => console.error(error))
  };

    return (
    <div className="register-activity-container">
      <form className="register-activity-form" onSubmit={handleSubmit}>
        <h1 className="h1-title">Register a new activity</h1>
        <div className="form-first-column">
          <label className="form-item" htmlFor="username">Username</label>
          <h3 className="h3-text">John Doe</h3>
          <label  htmlFor="email">Email</label>
          <h3 className="h3-text">JohnDoe@email.com</h3>
          <label className="form-item" htmlFor="title">Title</label>
          <textarea type="text" className='txtarea-small' name="activity_title" value={formData.activity_title}
          onChange={handleChange} />
          <label className="form-item" htmlFor="priority">Priority</label>
          <label htmlFor="high">
            <input type="radio" name="activity_priority" value="High" checked={formData.activity_priority === 'High'}
            onChange={handleChange} />High priority
          </label>
          <label htmlFor="medium">
            <input type="radio" name="activity_priority" value="Medium" checked={formData.activity_priority === 'Medium'}
            onChange={handleChange}/>Medium priority
          </label>
          <label htmlFor="low">
            <input type="radio" name="activity_priority" value="Low" checked={formData.activity_priority === 'Low'}
             onChange={handleChange} />Low priority
          </label> 
          <label className="form-item" htmlFor="desc">What do you want to achieve?</label>
          <label htmlFor="">
            <input
              type="radio"
              name="activity_subject"
              value="General"
              checked={formData.activity_subject === "General"}
              onChange={handleChange}/>General
          </label>
          <label htmlFor="">
            <input type="radio" name="activity_subject" value="Exercise" checked={formData.activity_subject === "Exercise"}
            onChange={handleChange} />Exercise
          </label>
          <label htmlFor="">
            <input type="radio" name="activity_subject" value="Meditation" checked={formData.activity_subject === "Meditation"}
            onChange={handleChange} />Meditation
          </label>
            <label htmlFor="">
            <input type="radio" name="activity_subject" value="Nutrition" checked={formData.activity_subject === "Nutrition"}
            onChange={handleChange}/>Nutrition
          </label>
            <label htmlFor="">
            <input type="radio" name="activity_subject" value="Sleeping" checked={formData.activity_subject === "Sleeping"}
            onChange={handleChange}/>Sleeping
          </label>
        </div>
          <label htmlFor="desc">Describe your new activity</label>
          <textarea type="text" className='txtarea-desc' name="activity_description" value={formData.activity_description}
          onChange={handleChange} />
          <label htmlFor="desc">Upload the Screenshot</label>
          <div id='screenshot'>
            <input type="file" onChange={handleImageChange} />
              {imageFile && <img id="screen-img" src={URL.createObjectURL(imageFile)} alt="Selected" />}
            </div>
            <button className="btn-submit">Submit</button>
      </form>
    </div>
    )
}