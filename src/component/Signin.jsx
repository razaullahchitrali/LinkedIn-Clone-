import React, { useState } from "react";
import linkedin from "../images/linkedin.png";
import { Button, Grid, TextField } from "@mui/material";
import developer from "../images/developer.png";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { auth, database, googleProvider } from "../firebase/setup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [designation, setDesignation] = useState("");

  const addUser = async () => {
    const userRef = doc(database, "Users", auth.currentUser?.uid);
    try {
      await setDoc(userRef, {
        username: username,
        email: auth.currentUser?.email,
        designation: designation,
        profile_image: auth.currentUser?.photoURL,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    !username && toast.warning("Please enter username");
    try {
      username && (await signInWithPopup(auth, googleProvider));
      username && addUser();
      navigate("/main");
    } catch (err) {
      console.error(err);
    }
  };
  console.log(auth);
  return (
    <div>
      <Grid container>
        <Grid item xs={6} sx={{ paddingLeft: "50px", paddingTop: "15px" }}>
          <ToastContainer autoClose={2000} position="top-center" />
          <img style={{ width: "130px" }} src={linkedin} />
          <h2 style={{ fontWeight: "100", fontSize: "60px", color: "#DDA640" }}>
            Find jops through your community
          </h2>
          <label style={{ color: "gray", fontSize: "10px" }}>
            Enter UserName
          </label>
          <br />
          <TextField
            onChange={(e) => setUserName(e.target.value)}
            variant="outlined"
            label="UserName"
            sx={{ width: "400px", mt: "5px" }}
          />
          <br />
          <label style={{ color: "gray", fontSize: "10px" }}>
            Enter Designaion
          </label>
          <br />
          <TextField
            onChange={(e) => setDesignation(e.target.value)}
            variant="outlined"
            label="Designation"
            sx={{ width: "400px", mt: "5px" }}
          />
          <br />
          <Button
            onClick={signInWithGoogle}
            size="large"
            variant="contained"
            sx={{
              width: "400px",
              borderRadius: "50px",
              mt: "25px",
              height: "50px",
            }}
          >
            SIGNIN
          </Button>
        </Grid>
        <Grid item xs={6}>
          <img style={{ width: "500px" }} src={developer} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Signin;
