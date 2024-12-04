import { useLoaderData } from "react-router-dom";
import ScheduleTable from "../../components/SchedleTable";
import { useEffect, useState } from "react";

const Schedule = () => {
  const data = useLoaderData();

  const [search,setSearch] =useState('')
  const [scheduleData, setScheduleData] = useState(data);

  useEffect(() =>{
    fetch(`http://localhost:5000/schedule?searchParams=${search}`).then((res) => res.json()).then((data) =>{
     setScheduleData(data)
      
    })
  },[search])

  return (
    <>
      <div className="w-[400px] mx-auto mb-4">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="search"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="w-1/2 mx-auto bg-slate-50">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>serial</th>
                <th>Title</th>
                <th>Day</th>
                <th>Date</th>
                <th>Time</th>
                <th>Auction</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.length === 0 ? (
                <p>no data found</p>
              ) : (
                scheduleData.map((schedule, index) => (
                  <ScheduleTable
                    key={schedule._id}
                    idx={index}
                    schedule={schedule}
                    scheduleData={scheduleData}
                    setScheduleData={setScheduleData}
                  ></ScheduleTable>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Schedule;
