import React from "react";
import styled from "styled-components";
import { frontEndServerURL } from "../api/apicontext";
import { IMusroom } from "../api/interfaces";
import { hexToRgba, palette } from "../palette";

interface MushroomProps {
  mushroom: IMusroom;
}

const MushroomCard: React.FC<MushroomProps> = ({ mushroom }) => {
  return (
    <StyledWrapper>
      <StyledHeader>
        {mushroom.name}{" "}
        {mushroom.edible && (
          <StyledIconImg src={`/edible-icon.png`} alt={"edible"} />
        )}
        {mushroom.poisonous && (
          <StyledIconImg src={`/poisonous-icon.png`} alt={"poisonous"} />
        )}
      </StyledHeader>
      <StyledMushroomImg src={mushroom.image_url} alt={mushroom.name} />
      <p>
        <strong>Area:</strong> {mushroom.area}
      </p>
      <p>
        <strong>Description:</strong> {mushroom.description}
      </p>
      <p>
        <strong>Edible:</strong> {mushroom.edible ? "Yes" : "No"}
      </p>
      <p>
        <strong>Poisonous:</strong> {mushroom.poisonous ? "Yes" : "No"}
      </p>
    </StyledWrapper>
  );
};

export default MushroomCard;

export const StyledHeader = styled.div`
  font-size: 28px;
  font-weight: 600;
  display: flex;
  justify-contents: center;
  align-items: center;
  color: ${palette.brownDark};

  text-shadow: 1px 1px 1px ${palette.brownDarker};

  transition: transform 0.25s ease-in-out;

  :hover {
    transform: scale(1.025);
    box-shadow: 0 0 15px rgba(0, 100, 100, 0.5);
  }
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid ${hexToRgba(palette.brown, 0.3)};
  box-shadow: 0 0 3px ${hexToRgba(palette.lightOrange, 0.3)};
  background-color: ${palette.lighterOrange};
  max-width: 450px;
`;

export const StyledIconImg = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

export const StyledMushroomImg = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid black;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease-in-out;
  cursor: pointer;

  :hover {
    transform: scale(1.025);
    box-shadow: 0 0 15px rgba(0, 100, 100, 0.5);
  }
`;
