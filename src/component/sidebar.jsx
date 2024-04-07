import React from "react";
import reactjs from "../images/reactjs.png";
import profile from "../images/profile.png";
import { Link } from "react-router-dom";

const Sidebar = ({ userData }) => {
  console.log("🚀 ~ Sidebar ~ userData:", userData);

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #DAD8D4 ",
        width: "210px",
        height: "370px",
        borderRadius: "15px",
      }}
    >
      <img
        src={reactjs}
        style={{
          height: "65px",
          width: "210px",
          borderTopRightRadius: "15px",
          borderTopLeftRadius: "15px",
        }}
      />
      <div style={{ position: "relative", left: "37%" }}>
        <img
          src={userData?.profile_image ? userData.profile_image : "-"}
          style={{ width: "55px", borderRadius: "50px" }}
        />
        <h3 style={{ position: "relative", right: "7%" }}>
          {userData?.username ? userData.username : "-"}
        </h3>
      </div>
      <h4 style={{ position: "relative", left: "32%", color: "#6F6F6F" }}>
        {userData?.designation ? userData.designation : "-"}
      </h4>
      <div
        style={{
          color: " #6F6F6F",
          borderTop: "1px solid #D6D6D6 ",
          paddingLeft: "10px",
        }}
      >
        <Link
          to="/connect"
          state={{
            username: userData?.username,
            designation: userData?.designation,
            profile_image: userData?.profile_image,
          }}
        >
          <h5 style={{ fontWeight: "100" }}>Connection</h5>
        </Link>
        <Link to="/invite">
          <h5 style={{ fontWeight: "100" }}>Invitation</h5>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
