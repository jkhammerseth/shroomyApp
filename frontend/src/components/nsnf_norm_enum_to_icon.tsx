import { NSNF_NORM } from "../api/interfaces";
import { StyledIconImg } from "./MushroomCard";

export const nsnf_norm_icon = (nsnf: NSNF_NORM) => {
  switch (nsnf) {
    case NSNF_NORM.giftig:
      return <StyledIconImg src={`/poisonous-icon.png`} alt={"poisonous"} />;
    case NSNF_NORM.spiselig:
      return <StyledIconImg src={`/edible-icon.png`} alt={"edible"} />;
    case NSNF_NORM.spiselig_etter_avkoking:
      return (
        <StyledIconImg
          src={`/attention-icon.png`}
          alt={"spiselig_etter_avkoking"}
        />
      );
    case NSNF_NORM.spiselig_med_merknad:
      return (
        <StyledIconImg
          src={`/attention-icon.png`}
          alt={"spiselig_med_merknad"}
        />
      );
    case NSNF_NORM.ikke_matsopp:
      return (
        <StyledIconImg src={`/ikke_matsopp-icon.png`} alt={"ikke_matsopp"} />
      );
    case NSNF_NORM.meget_giftig:
      return <StyledIconImg src={`/poisonous-icon.png`} alt={"meget_giftig"} />;
    default:
      return <>{""}</>;
  }
};
