import {
  mergeStyles,
  Shimmer,
  ShimmerElementType,
  ThemeProvider,
} from "@fluentui/react";
import React, { useState } from "react";
import styled from "styled-components";
import { frontEndServerURL } from "../api/apicontext";
import { FALLBACK_MUSHROOM_IMAGE_URL, IMusroom } from "../api/interfaces";
import { hexToRgba, palette } from "../palette";
import { nsnf_norm_icon } from "./nsnf_norm_enum_to_icon";

interface MushroomProps {
  mushroom: IMusroom | null;
}

const MushroomCard: React.FC<MushroomProps> = ({ mushroom }) => {
  const [expandData, setExpandData] = useState<boolean>(false);

  const handleTakePhoto = () => {
    setExpandData(!expandData);
  };

  return (
    <StyledWrapper>
      <StyledHeader>
        {mushroom?.name || "Laster..."}{" "}
        {mushroom && nsnf_norm_icon(mushroom?.nsnf_norm as any)}
      </StyledHeader>
      <StyledMushroomImg
        src={
          (mushroom && mushroom.image_urls?.[0]) || FALLBACK_MUSHROOM_IMAGE_URL
        }
        alt={mushroom?.name}
        onClick={handleTakePhoto}
      />
      {mushroom && (
        <>
          <p>
            <strong>Comment:</strong> {mushroom.comment}
          </p>
          <p>
            <strong>Description:</strong> {mushroom.description}
          </p>
          <p>
            <strong>Edibility:</strong> {mushroom.nsnf_norm}
          </p>
          <p>
            <strong>Scientific name:</strong> {mushroom.s_name}
          </p>
        </>
      )}
    </StyledWrapper>
  );
};

export default MushroomCard;

const shimmerWithElementFirstRow = [
  { type: ShimmerElementType.line, width: "100%", height: 16 },
];

export const StyledHeader = styled.div`
  font-size: 28px;
  font-weight: 600;
  display: flex;
  justify-contents: center;
  align-items: center;
  color: ${palette.brownDark};
  text-shadow: 1px 1px 1px ${palette.brownDarker};
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

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    "& > .ms-Shimmer-container": {
      margin: "10px 0",
    },
  },
});
