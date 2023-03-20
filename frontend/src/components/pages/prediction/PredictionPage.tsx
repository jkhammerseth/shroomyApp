import queryString from "query-string";
import React, { useState } from "react";
import styled from "styled-components";
import { IMusroom, IPrediction } from "../../../api/interfaces";
import MushroomPredictionCard from "../../MushroomPredictionCard";
import MushroomPredictionSummary from "./MushroomPredictionSummary";

const PredictionPage: React.FC = () => {
  const predictionJSON = queryString.parse(window.location.search).prediction;
  let predictions: IPrediction[] = JSON.parse(predictionJSON as any);

  return (
    <CardsWrapper>
      <MushroomPredictionSummary predictions={predictions} />
      {predictions.map((prediction, index) => {
        if (prediction.prediction.length == 0) {
          prediction.prediction.push(fallback_prediction);
        }

        return (
          <>
            <MushroomPredictionCard
              prediction={prediction as any}
              key={`mpc_${index}}`}
            />
            <br />
          </>
        );
      })}
    </CardsWrapper>
  );
};

export default PredictionPage;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
  div {
    margin: 4px;
  }
`;

const _DEBUG_prediction = {
  prediction: [
    {
      area: "Norge",
      description:
        "Kantarell har gul, traktformet hatt, nedløpende folder og god kantarellukt. Har samme gulfarge på undersiden som oversiden. Avrundet stilk.",
      edible: true,
      id: 32,
      image_url:
        "https://media.snl.no/media/116599/standard_compressed_kantarell_37810.jpg",
      latin_name: "Cantharellus cibarius",
      name: "Kantarell",
      poisonous: false,
    },
  ],
  probability: 0.5896577835083008,
};

const fallback_prediction = {
  area: "N/A",
  description: "Soppen finnes ikke i databasen, har du oppdaget en ny soppart?",
  edible: false,
  id: -1,
  image_url: "/matblekksopp.png",
  latin_name: "Soppenis Finnisikke",
  name: "Finnes ikke i databasen",
  poisonous: false,
};
