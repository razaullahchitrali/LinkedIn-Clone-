import React, { useEffect, useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../firebase/setup";

const Main = () => {
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        try {
          const userDocument = doc(
            database,
            "Users",
            `${auth.currentUser?.uid}`
          );
          const userSnapshot = await getDoc(userDocument);
          if (userSnapshot.exists()) {
            setUserData(userSnapshot.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // User is not logged in
        setUserData(null); // Reset user data
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  if (loading) {
    return <h1>dataLoading...</h1>;
  }
  return (
    <div>
      <Navbar />
      <Home userData={userData} />
    </div>
  );
};

export default Main;
