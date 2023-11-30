import HealthCard from "../../components/HealthCard/HealthCard";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard () {

    // fetch data from database
    const [activities, setActivities] = useState([]);
    const fetchActivities = () => {
      axios.get("http://localhost:5000/activities/")
      .then((response) => {
          // console.log(response.data)
          setActivities(response.data)
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
    };

    useEffect(() => {
      fetchActivities();
    }, []);

    // Update the status
    const updateActivityStatus = (activityId, newStatus) => {
          axios
            .put(`http://localhost:5000/activities/${activityId}`, { activity_status: newStatus })
            .then((response) => {
              // console.log(response);
              const updatedActivities = activities.map((activity) => {
                if (activity.id === activityId) {
                  return { ...activity, activity_status: newStatus };
                }
                return activity;
              });
              setActivities(updatedActivities);
            })
            .catch((error) => console.error(error));
        };
    

    // to fetch the activities in the columns
    const todoActivities = activities.filter(activity => activity.activity_status === "Not started");
    const inProgressActivities = activities.filter(activity => activity.activity_status === "A new habit");
    const doneActivities = activities.filter(activity => activity.activity_status === "Implemented");

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-heading">My health habits</h2>
            {activities.length > 0 ? (<div className="cards-container">
                <div className="to-do-container">
                    <h2 className="status-heading" id="to-do">Not started</h2>
                    {todoActivities.map((activity) => (
                    <HealthCard key={activity.id} activity={activity} activityId={activity.id} updateStatus={updateActivityStatus}/>
                        ))}
                </div>
                <div className="in-progress-container">
                    <h2 className="status-heading" id="in-progress">A new habit</h2>
                    {inProgressActivities.map((activity) => (
                    <HealthCard key={activity.id} activity={activity} activityId={activity.id} updateStatus={updateActivityStatus}/>
                        ))}
                </div>
                <div className="done-container">
                    <h2 className="status-heading" id="done">Implemented</h2>
                    {doneActivities.map((activity) => (
                    <HealthCard key={activity.id} activity={activity} activityId={activity.id} updateStatus={updateActivityStatus}/>
                        ))}
                        </div>
                </div>) : <div className="no-activities-message">No activities registered. <Link to="/" className="no-activities-message">Create new.</Link></div>}
                
        </div>
    )
}