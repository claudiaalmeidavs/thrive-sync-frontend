import { Link } from "react-router-dom";
import "./HealthCard.css"

export default function HealthCard ({activity, activityId, updateStatus}) {
  const handleChange = (event) => {
    const newStatus = event.target.value;
    updateStatus(activityId, newStatus);
  };  

  // To format title based on status
  const getTitleColor = (status) => {
    switch(status) {
      case "Not started":
        return "not-started-title";
      case "A new habit":
        return "new-habit-title";
      case "Implemented":
        return "implemented-title";
      default:
        return "";
    }
  };

      return (
        <div className="card-container">
        {activity ? (
            <div className="inner-card-container">
                <div className={`health-card-heading-container ${getTitleColor(activity.activity_status)}`}>
                  <h3 className="health-card-heading">{activity.activity_title}</h3>
                </div>
                <div className="date-and-time card-line">
                  <p><strong>Date</strong>: {activity.creation_date.substring(0, 10)}</p>
                  <p>{activity.creation_date.substring(11,16)}</p>
                </div>
                <p className="card-line"><strong>Priority</strong>: {activity.activity_priority}</p>
                <p className="card-line"><strong>Category:</strong> {activity.activity_subject}</p>     
                <form className="card-line" card-line>
                  <label  htmlFor="change-status"><strong>
                    Change status</strong>:{" "}
                      <select className="status-select" onChange={handleChange}>
                        <option value="">
                          ▼ Select Status
                        </option>
                        <option value="Not started">Not started</option>
                        <option value="A new habit">A new habit</option>
                        <option value="Implemented">Implemented</option>
                      </select>
                  </label>
                </form>
                <p className="card-text link-text"><Link to={`/profile/${activityId}`} className="see-activity-link card-line">View activity details</Link></p>
            </div>
        ) : null}
        </div>
      )
}