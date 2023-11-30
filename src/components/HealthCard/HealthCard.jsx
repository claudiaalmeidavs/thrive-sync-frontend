import { Link } from "react-router-dom";
import "./HealthCard.css"


export default function HealthCard ({activity, activityId, updateStatus}) {
  const handleChange = (event) => {
    const newStatus = event.target.value;
    updateStatus(activityId, newStatus);
  };  
      return (
        <div className="card-container">
        {activity ? (
            <div className="inner-card-container">
                <h3 className="card-heading">Activity #{activity.id}</h3>
                <div className="date-and-time">
                  <p className="card-text"><strong>Date</strong>: {activity.creation_date.substring(0, 10)}</p>
                  <p>{activity.creation_date.substring(11,16)}</p>
                </div>
                <p className="card-text"><strong>Priority</strong>: {activity.activity_priority}</p>
                <p className="card-text"><strong>Category:</strong> {activity.activity_subject}</p>     
                <form className="center">
                  <label htmlFor="change-status"><strong>
                    Change status</strong>{" "}
                      <select className="status-select" onChange={handleChange}>
                        <option value="">---</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                  </label>
                </form>
                <br />
                <p className="card-text link-text"><Link to={`/profile/${activityId}`} className="see-activity-link">View activity details</Link></p>
            </div>
        ) : null}
        </div>
      )
}