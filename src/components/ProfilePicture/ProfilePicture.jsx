import React from "react";
import styled from "styled-components";
import AliceImage from "./Alice.jpeg";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f3ef;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #9746ff;
`;

function RoundProfilePicture() {
  return (
    <ProfileContainer>
      <ProfilePicture src={AliceImage} alt="Alice" />{" "}
    </ProfileContainer>
  );
}

export default RoundProfilePicture;
