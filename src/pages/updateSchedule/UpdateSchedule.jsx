
import  { useState } from "react";

import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const formatTime12Hour = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes}:${seconds} ${ampm}`;
};

const UpdateSchedule = () => {
  const { id } = useParams();
  const singleScheduleData = useLoaderData();
  const [title, setTitle] = useState(singleScheduleData?.title);
  const [day, setDay] = useState(singleScheduleData?.day);
  const [date, setDate] = useState(singleScheduleData?.date);
  // const [hour, setHour] = useState(singleScheduleData?.hour);

  console.log(singleScheduleData);

  const handleUpdateSchedule = () => {
    const data = {
      title: title,
      day:day,
      date:date,
      // hour:hour
    }
    fetch(`http://localhost:5000/schedule/${id}`, {
      method: "PATCH",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)

    })
      .then((res) => res.json())
      .then((result) => {
        Swal.fire('data updated')
      });
  };
  return (
    <div>
      <div className="bg-[#F4F3F0] lg:p-24">
        <h2 className="text-3xl text-center font-bold">Update Gym Schedule</h2>
        <form onSubmit={handleUpdateSchedule}>
          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Title</span>
              </label>
              <input
                type="text"
                name="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Date</span>
              </label>
              <DatePicker
                value={date}
                selected={date}
                className="input input-bordered w-full"
                onChange={(date) => setDate(date)}
              />
            </div>
          </div>
          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Day</span>
              </label>

              <select
                className="input input-bordered "
                name="day"
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Time</span>
              </label>

              <DatePicker
                className="input input-bordered w-full"
                readOnly
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                // value={hour}
                // selected={hour}
                // onChange={(hour) => setHour(hour)}
              />
            </div>
          </div>

          {/* End of Labels */}
          <input
            type="submit"
            value="Update Schedule"
            className="btn w-full bg-pink-500 text-white mt-6"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateSchedule;
