import { useState } from "react";
import axios from "axios";

function BookAppointment() {
  const [info, setInfo] = useState({});
  const [doctor, setDoctor] = useState("");
  const [error, setError] = useState({});
  const [phase, setPhase] = useState(0);
  const errorA = Object.values(error);

  function handleInfo(key, value) {
    setInfo({ ...info, [key]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(info).length !== 6) {
      handleError("required");
    }
    for (let x in info) {
      if (!info[x]) {
        handleError(x);
      }
    }
    postReq(info);
  }

  function handleError(x) {
    switch (x) {
      case "fname":
        setError({ ...error, [x]: "First Name" });
        break;
      case "lname":
        setError({ ...error, [x]: "Last Name" });
        break;
      case "email":
        setError({ ...error, [x]: "Email" });
        break;
      case "doctor":
        setError({ ...error, [x]: "Doctor" });
        break;
      case "meet":
        setError({ ...error, [x]: "Google Meet or Phone" });
        break;
      case "date":
        setError({ ...error, [x]: "date" });
        break;
      case "required":
        setError({ ...error, [x]: "Required" });
        break;
      default:
        setError((error) => [...error]);
    }
  }
  async function postReq(info) {
    setPhase(1);
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts ",
      info
    );
    console.log(res.status);
    if (res.status === 201) {
      setPhase(2);
    }
  }
  console.log(errorA);
  if (phase === 0) {
    return (
      <div>
        <h1>Book a session</h1>
        <p>Fill in the form below to book a virtual session with your doctor</p>

        <form onSubmit={(e) => handleSubmit(e)}>
          <h3>Basic Info</h3>
          <p>
            First Name
            <input
              type="text"
              id="fname"
              pattern="[A-Z]{1}[a-z]{1,}"
              value={info.fname || ""}
              onChange={(e) => handleInfo("fname", e.target.value)}
            />
          </p>
          <p>
            Last Name
            <input
              required
              type="text"
              id="lname"
              pattern="[A-Z]{1}[a-z]{1,}"
              value={info.lname || ""}
              onChange={(e) => handleInfo("lname", e.target.value)}
            />
          </p>
          <p>
            Email
            <input
              required
              type="email"
              id="email"
              pattern="[a-z]{1,}[@]{1}[a-z]{1,}[.]{1}[a-z]{1,}"
              value={info.email || ""}
              onChange={(e) => handleInfo("email", e.target.value)}
            />
          </p>
          <div>
            <h3>Doctor</h3>
            <select
              required
              value={doctor}
              onChange={(e) => {
                setDoctor(e.target.value);
                handleInfo("doctor", e.target.value);
              }}
            >
              <option value="">Select your Doctor</option>
              <option value="Dr. John Hopkins">Dr. John Hopkins</option>
              <option value="Dr. Brayan Adams">Dr. Brayan Adams</option>
              <option value="Dr. Karl Watson">Dr. Karl Watson</option>
            </select>
          </div>
          <br />
          {doctor && (
            <div>
              <div onChange={(e) => handleInfo("meet", e.target.value)}>
                <input
                  required
                  type="radio"
                  id="gmeet"
                  name="mode"
                  value="Google Meet"
                />
                Google Meet
                <input
                  required
                  type="radio"
                  id="phone"
                  name="mode"
                  value="Phone"
                />
                Phone
              </div>

              <br />
              <br />
              <input
                required
                type="date"
                value={info.date || ""}
                onChange={(e) => handleInfo("date", e.target.value)}
              />
            </div>
          )}

          <br />
          <br />
          <button type="submit">Confirm Booking</button>
        </form>
        {errorA.map((x) => (
          <h3 key={x}> Check {x} Field</h3>
        ))}
      </div>
    );
  } else if (phase === 1) {
    return (
      <>
        <h1>Book a session</h1>
        <p>Fill in the form below to book a virtual session with your doctor</p>
        <h3>Scheduling the appointment ... </h3>
      </>
    );
  } else if (phase === 2) {
    return (
      <>
        <h1>Book a session</h1>
        <button onClick={(e) => setPhase(0)}>Cancel Booking</button>
      </>
    );
  }
}

export default BookAppointment;
