import queryString from "query-string";
import React, { useState } from "react";
import styled from "styled-components";
import {
  IMusroom,
  IPrediction,
  IPredictionIcludingFallbackId,
  NSNF_NORM,
} from "../../../api/interfaces";
import MushroomPredictionCard from "../../MushroomPredictionCard";
import MushroomPredictionSummary from "./MushroomPredictionSummary";

const PredictionPage: React.FC = () => {
  const predictionJSON = queryString.parse(window.location.search).prediction;
  let predictions: IPrediction[] = JSON.parse(predictionJSON as any);
  console.log("predictions: ", predictions);

  return (
    <CardsWrapper>
      <MushroomPredictionSummary predictions={predictions} />
      {predictions.map((prediction, index) => {
        if (prediction.predictied_id == null) {
          prediction.predictied_id = -1;
        }

        return (
          <div key={`mpc_wrapper_${index}}`}>
            <MushroomPredictionCard
              prediction={prediction as IPredictionIcludingFallbackId}
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
