import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthProvider } from "./Provider";
import Spinner from "@/Shared/Spinner";
export const UserContext = createContext(null);

const apiUrl = "https://blood-bond-server-nine.vercel.app";
const UserProvider = ({ children }) => {
  const { user } = useContext(AuthProvider);
  const { email } = user || {};
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${apiUrl}/user`)
      .then((response) => {
        // console.log("Data fetched successfully:", response.data);
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setLoading(true);
      });
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }
  const filteredData = userData?.filter((item) => item?.email === email);
  console.log();
  const filteredUser = filteredData[0] || undefined;
  console.log(filteredUser);

  if (filteredData === undefined) {
    return <Spinner></Spinner>;
  }

  return (
    <UserContext.Provider value={filteredUser}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
