import React from "react";
import styled from "styled-components";
import AliceImage from "../../assets/images/Alice.jpeg";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  background-color: #f9f3ef;
  padding-top: 5%;
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
