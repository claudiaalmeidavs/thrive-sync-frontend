import React, { useState, useEffect } from "react";
import "./ActivityPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ActivityPage () {
  const { id } = useParams();
  const [ activity, setActivity] = useState({});

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

  return (
    <div className="ticket-page">
    <p><Link to="/tickets"className="back-link">Back</Link></p>
    <h1>Activity Page</h1>
    <div className="ticket-page-container">
      {activity.id ? (
        <div className="card">
          <h3 className="card-heading card-header">Activity #{activity.id}</h3>
          <div className="card-body card-text">
            <p className="paragraph"><span className="bold">Description:</span> {activity.activity_description}</p>
            <p className="paragraph"><span className="bold">Priority:</span> {activity.activity_priority}</p>
            <p className="paragraph"><span className="bold">Category:</span> {activity.activity_subject}</p>
            <p className="paragraph"><span className="bold">Creation date: </span>{activity.creation_date.substring(0, 10)}</p>
            <p className="paragraph"><span className="bold">Ticket status:</span> {activity.activity_status}</p>
            <p className="paragraph"><span className="bold">Requested by user id:</span> {activity.user_id}</p>
          </div> 
        </div>
        ) : <p>Activity loading...</p>}       
    </div>
    </div>
  );
};
