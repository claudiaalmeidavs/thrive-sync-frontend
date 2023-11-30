import React, { useState, useEffect } from "react";
import "./ActivityPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ActivityPage () {
  const { id } = useParams();
  const [ activity, setActivity] = useState({});

  const navigate = useNavigate();

  const fetchActivities = () => {
    axios.get(`http://localhost:5000/activities/${id}`)
    .then((response) => {
        console.log(response.data);
        setActivity(response.data[0])
    })
  }
  useEffect(() => {
    fetchActivities();
  }, []);

  // Function to get emoji based on activity status
  const getStatusEmoji = (status) => {
    switch (status) {
      case "Not started":
        return "🔴";
      case "A new habit":
        return "⏳";
      case "Implemented":
        return "✅";
      default:
          return "";
      }
    };

    const getCategoryImage = (category) => {
      switch (category) {
        case "General":
          return "general-image";
        case "Exercise":
          return "exercise-image";
        case "Meditation":
          return "meditation-image";
        case "Nutrition":
          return "nutrition-image";
        case "Sleep":
          return "sleep-image";
        default:
          return null
      }
    }

    function onClickDelete () {
        axios
        .delete(`http://localhost:5000/activities/${id}`)
        .then(navigate("/profile"));
    }

    return (
      <div className="activity-page">
        <p>
          <Link to="/profile" className="back-link">
            Back
          </Link>
        </p>
        <div className={`activity-page-outer-container ${getCategoryImage(activity.activity_subject)}`}>
          <div>
            {activity.id ? (
              <div className="activity-page-container">
                <h2 className="activity-card-heading">
                  My health goal: {activity.activity_title}
                </h2>
                  <p className="activity-page-paragraph">
                    {activity.creation_date.substring(0, 10)}
                  </p>
                <p className="activity-page-paragraph" id="activity-status-p">
                  {activity.activity_status}{" "}
                  {getStatusEmoji(activity.activity_status)}
                </p>
                <div className="activity-details">
                  <p className="activity-page-paragraph">
                    <strong>I want to...</strong> {activity.activity_description}
                  </p>
                  <p className="activity-page-paragraph">
                    <strong>Priority:</strong> {activity.activity_priority}
                  </p>
                  <p className="activity-page-paragraph">
                    <strong>Category:</strong> {activity.activity_subject}
                  </p>
                </div>
                <button className="delete-button" onClick={onClickDelete}>🗑️ Delete entry</button>
              </div>
            ) : (
              <p>Activity loading...</p>
            )}
          </div>
        </div>
      </div>
    );
  }