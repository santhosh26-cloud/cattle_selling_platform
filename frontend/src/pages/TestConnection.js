import { useEffect, useState } from "react";
import API from "../api/api";

const TestConnection = () => {
  const [msg, setMsg] = useState("Checking connection...");

  useEffect(() => {
    API.get("/test")
      .then(res => {
        console.log("CONNECTED:", res.data);
        setMsg(res.data.message);
      })
      .catch(err => {
        console.error("NOT CONNECTED", err);
        setMsg("❌ Backend not connected");
      });
  }, []);

  return <h2>{msg}</h2>;
};

export default TestConnection;
