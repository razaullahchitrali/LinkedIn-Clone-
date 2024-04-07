import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase/setup";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";

function Connection() {
  const location = useLocation();
  console.log("🚀 ~ Connection ~ location:", location);

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("🚀 ~ Connection ~ userData:", userData);

  const getUsers = async () => {
    try {
      const userRef = collection(database, "Users");
      const data = await getDocs(userRef);
      setLoading(false);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserData(filteredData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const sendRequest = async (userId) => {
    console.log("🚀 ~ sendRequest ~ userId:", userId);
    const requestDoc = doc(database, "Users", `${userId}`);
    const connectRef = doc(requestDoc, "RequestIn", `${auth.currentUser?.uid}`);
    try {
      await setDoc(connectRef, {
        username: location.state.username,
        designation: location.state.designation,
        profile_image: location.state.profile_image,
        id: auth.currentUser?.uid,
        status: "pending",
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div
      style={{ padding: "20px", backgroundColor: "#F6F7F3", height: "100vh" }}
    >
      {userData
        .filter((usr) => usr?.id !== auth.currentUser?.id)
        .map((user) => {
          return (
            <Paper>
              <List>
                <ListItem>
                  <Avatar alt="Remy Sharp" src={user?.profile_image} />
                  <ListItemText
                    primary={user?.username}
                    secondary={user?.designation}
                    style={{ marginLeft: "10px" }}
                  />
                  <Button
                    onClick={() => sendRequest(user?.id)}
                    variant="outlined"
                    size="small"
                  >
                    Connect
                  </Button>
                </ListItem>
              </List>
            </Paper>
          );
        })}
    </div>
  );
}

export default Connection;
