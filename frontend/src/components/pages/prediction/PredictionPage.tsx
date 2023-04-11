import queryString from "query-string";
import React, { useState } from "react";
import styled from "styled-components";
import { IMusroom, IPrediction, NSNF_NORM } from "../../../api/interfaces";
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
          <div key={`mpc_wrapper_${index}}`}>
            <MushroomPredictionCard
              prediction={prediction as any}
              key={`mpc_${index}}`}
            />
            <br />
          </div>
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

const fallback_prediction = {
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
