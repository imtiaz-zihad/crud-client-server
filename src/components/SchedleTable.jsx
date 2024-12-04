import { FaFile, FaTrash } from "react-icons/fa";
import { MdDone, MdOutlineDoneAll } from "react-icons/md";
import { Link } from "react-router-dom";

const ScheduleTable = ({ schedule, idx, scheduleData, setScheduleData }) => {
  const { _id, title, day, date, hour,isCompleted } = schedule;
  
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/schedule/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = scheduleData.filter((schedule) => id != schedule._id);
        setScheduleData(newData);
      });
  };
  const handleUpdateStatus = (id) => {
    fetch(`http://localhost:5000/status/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = scheduleData.map((schedule) =>
          schedule._id === id ? { ...schedule, isCompleted: true } : schedule
        );
        setScheduleData(newData);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };
  
  return (
    <>
      <tr>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{day}</td>
        <td>{date}</td>
        <td>{hour}</td>
        <td>
          <div className="flex gap-4">
            {" "}
            <button
              onClick={() => handleDelete(_id)}
              className="bg-pink-500 px-4 py-2 rounded text-white"
            >
              <FaTrash className=""></FaTrash>
            </button>
            <button className="bg-pink-500 px-4 py-2 rounded text-white">
              <Link to={`/update/${_id}`}>
                {" "}
                <FaFile />
              </Link>
            </button>
            <button onClick={()=>handleUpdateStatus(_id)} className="bg-pink-500 px-4 py-2 rounded text-white">
              {isCompleted ? <MdOutlineDoneAll /> : <MdDone />}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ScheduleTable;
