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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
     e.preventDefault();
    axios
      .post("http://localhost:5000/activities", formData)
      .then(() => {
        navigate("/profile");
      })

      .catch((error) => console.error(error))
  };

    return (
    <div className="register-activity-outer-container">
    <div className="register-activity-inner-container">
      <form className="register-activity-form" onSubmit={handleSubmit}>
        <h1 className="h1-title">Register a new activity</h1>
          <div className="username">
            <div className="username-first-line">
              <label className="form-item" htmlFor="username">Username</label>
              <h3 className="h3-text">John Doe</h3>
            </div>
            <div className="username-second-line">
              <label  htmlFor="email">Email</label>
              <h3 className="h3-text">JohnDoe@email.com</h3>
            </div>
          </div>
          <div className="form-section-title">
            <label className="form-item form-section-heading" htmlFor="title">I want to...</label>
            <textarea type="text" className="txtarea-title" name="activity_title" value={formData.activity_title}
            onChange={handleChange} />
          </div>
          <div className="form-first-section">  
          <div className="priority-section">
          <label className="form-item form-section-heading" htmlFor="priority">Priority</label>
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
          </div>
          <div className="form-goals-section">
          <label className="form-item form-section-heading" htmlFor="desc">What's your general goal?</label>
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
        </div>
        <div className="activity-description-section">
          <label className="form-section-heading" htmlFor="desc">Describe your new activity</label>
          <textarea type="text" className="txtarea-desc" name="activity_description" value={formData.activity_description}
          onChange={handleChange} />
        </div>
        <button className="btn-submit">Submit</button>
      </form>
    </div>
    </div>
    )
}