import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IMusroom } from "../../../api/interfaces";
import { mushroomAPI } from "../../../api/mushroomAPI";
import MushroomCard from "../../MushroomCard";

const SearchPage: React.FC = () => {
  const [data, setData] = useState<[IMusroom] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await mushroomAPI.getMushrooms();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <CardsWrapper>
      {data ? (
        data.map((mushroom, idx) => (
          <MushroomCard mushroom={mushroom} key={`mc_${idx}`} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </CardsWrapper>
  );
};

export default SearchPage;

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
