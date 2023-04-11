import React, { useState } from "react";
import styled from "styled-components";
import {
  FALLBACK_MUSHROOM_IMAGE_URL,
  IMusroom,
  IPrediction,
} from "../api/interfaces";
import { palette } from "../palette";
import MushroomCard, {
  StyledHeader,
  StyledIconImg,
  StyledMushroomImg,
  StyledWrapper,
} from "./MushroomCard";
import { nsnf_norm_icon } from "./nsnf_norm_enum_to_icon";

interface MushroomPredictionProps {
  prediction: IPrediction;
}

const MushroomPredictionCard: React.FC<MushroomPredictionProps> = ({
  prediction,
}) => {
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
      <MushroomCard mushroom={mushroom} />
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
