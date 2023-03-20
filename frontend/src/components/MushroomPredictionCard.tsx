import React, { useState } from "react";
import styled from "styled-components";
import { IMusroom, IPrediction } from "../api/interfaces";
import { palette } from "../palette";
import {
  StyledHeader,
  StyledIconImg,
  StyledMushroomImg,
  StyledWrapper,
} from "./MushroomCard";

interface MushroomPredictionProps {
  prediction: IPrediction;
}

const MushroomPredictionCard: React.FC<MushroomPredictionProps> = ({
  prediction,
}) => {
  const [expandData, setExpandData] = useState<boolean>(false);

  const handleTakePhoto = () => {
    setExpandData(!expandData);
  };

  const mushroom = prediction.prediction[0];
  const predStr = Number(prediction.probability * 100).toFixed(3);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <StyledNameDiv>
        {prediction.name} <span>{predStr}</span>
        {`%`}
      </StyledNameDiv>
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
        <StyledMushroomImg
          src={mushroom.image_url}
          alt={mushroom.name}
          onClick={handleTakePhoto}
        />
        {expandData && (
          <>
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
          </>
        )}
      </StyledWrapper>
    </div>
  );
};

export default MushroomPredictionCard;

const StyledNameDiv = styled.div`
  @font-face {
    font-family: retro;
    src: url(retroFont.ttf);
  }
  font-family: retro;
  font-size: 30px;
  text-align: center;
  color: ${palette.brownDarker};

  span {
    font-family: "Comic Sans MS", "Comic Sans";
    font-weight: 800;
  }
`;
