import { Grid } from "@mui/material";
import React from "react";
import linked from "../images/linked.png";
import lens from "../images/lens.png";
import home from "../images/home.png";
import message from "../images/message.png";
import network from "../images/network.png";
import profile from "../images/profile.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #EAEAEA " }}>
      <Grid container>
        <Grid item xs={6}>
          <img src={linked} style={{ width: "25px", marginLeft: "80px" }} />
          <img src={lens} style={{ width: "25px", marginLeft: "20px" }} />
        </Grid>
        <Grid item xs={6}>
          <img src={home} style={{ width: "25px", marginLeft: "20px" }} />
          <Link to="/chat">
            <img src={message} style={{ width: "25px", marginLeft: "20px" }} />
          </Link>
          <Link to="/network">
            <img src={network} style={{ width: "25px", marginLeft: "20px" }} />
          </Link>
          <img src={profile} style={{ width: "25px", marginLeft: "20px" }} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Navbar;
