import { Shimmer, ShimmerElementType } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FALLBACK_MUSHROOM_IMAGE_URL,
  IMusroom,
  IPrediction,
  IPredictionIcludingFallbackId,
  NSNF_NORM,
} from "../api/interfaces";
import { mushroomAPI } from "../api/mushroomAPI";
import { palette } from "../palette";
import MushroomCard, {
  StyledHeader,
  StyledIconImg,
  StyledMushroomImg,
  StyledWrapper,
} from "./MushroomCard";
import { nsnf_norm_icon } from "./nsnf_norm_enum_to_icon";

interface MushroomPredictionProps {
  prediction: IPredictionIcludingFallbackId;
}

const MushroomPredictionCard: React.FC<MushroomPredictionProps> = ({
  prediction,
}) => {
  const [mushroom, setMushroom] = useState<IMusroom | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (prediction.predictied_id > 0) {
        const data = await mushroomAPI.getMushroomsById(
          prediction.predictied_id
        );
        setMushroom(data);
      } else {
        setMushroom(fallback_prediction);
      }
    };
    fetchData();
  }, []);

  console.log("prediction inside card: ", prediction);
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
const fallback_prediction: IMusroom = {
  nsnf_norm: NSNF_NORM.giftig,
  comment: "",
  recipe: null,
  image_urls: ["/matblekksopp.png"],
  list_mislabel: [],
  description: "Soppen finnes ikke i databasen, har du oppdaget en ny soppart?",
  id: -1,
  s_name: "Soppenis Finnisikke",
  name: "Finnes ikke i databasen",
};
