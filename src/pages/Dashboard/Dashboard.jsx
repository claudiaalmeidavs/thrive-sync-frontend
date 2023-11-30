import HealthCard from "../../components/HealthCard/HealthCard";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Dashboard.css"

export default function Dashboard () {
    // fetch data from database
    const [activities, setActivities] = useState([]);
    const fetchActivities = () => {
      axios.get("http://localhost:5000/activities/")
      .then((response) => {
          console.log(response.data)
          setActivities(response.data)
      })
    }
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
    const todoActivities = activities.filter(activity => activity.activity_status === 'To Do');
    const inProgressActivities = activities.filter(activity => activity.activity_status === 'In Progress');
    const doneActivities = activities.filter(activity => activity.activity_status === 'Done');

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-heading">Dashboard</h2>
            <div className="cards-container">
                <div className="to-do-container">
                    <h2 className="status-heading" id="to-do">To do</h2>
                    {todoActivities.map((activity) => (
                    <HealthCard key={activity.id} activity={activity} activityId={activity.id} updateStatus={updateActivityStatus}/>
                        ))}
                </div>
                <div className="in-progress-container">
                    <h2 className="status-heading" id="in-progress">In progress</h2>
                    {inProgressActivities.map((activity) => (
                    <HealthCard key={activity.id} activity={activity} activityId={activity.id} updateStatus={updateActivityStatus}/>
                        ))}
                </div>
                <div className="done-container">
                    <h2 className="status-heading" id="done">Done</h2>
                    {doneActivities.map((activity) => (
                    <HealthCard key={activity.id} activity={activity} activityId={activity.id} updateStatus={updateActivityStatus}/>
                        ))}
                </div>
            </div>
        </div>
    )
}