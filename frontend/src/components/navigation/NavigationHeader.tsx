import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledBackground } from "../../App";
import { palette } from "../../palette";

const NavigationHeader: React.FC = () => {
  return (
    <nav
      style={{
        backgroundColor: palette.primaryBlue,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <StyledBackground />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <StyledShroomyImage
              src={`/chantarell-icon.png`} //matblekksopp.png`}
              alt={"Shroomy"}
            />
          </Link>
          <Link to="/">
            <StyledFontWrapper>
              <h1 className="l1">{"Shroomy"}</h1>
              <h1 className="l2">{"Shroomy"}</h1>
              <h1 className="l3">{"Shroomy"}</h1>
              <h1 className="l4">{"Shroomy"}</h1>
              <h1 className="l5">{"Shroomy"}</h1>
              <h1 className="l6">{"Shroomy"}</h1>
            </StyledFontWrapper>
          </Link>
        </div>
        <StyledLinkWrapper>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to={DEBUG_predictionURLWithData}>Prediction_dev</Link>
        </StyledLinkWrapper>
      </div>
    </nav>
  );
};

export default NavigationHeader;

const DEBUG_predictionURLWithData =
  "/prediction?prediction=[{%22prediction%22:[{%22id%22:32,%22name%22:%22Kantarell%22,%22latin_name%22:%22Cantharellus%20cibarius%22,%22description%22:%22Kantarell%20har%20gul,%20traktformet%20hatt,%20nedl%C3%B8pende%20folder%20og%20god%20kantarellukt.%20Har%20samme%20gulfarge%20p%C3%A5%20undersiden%20som%20oversiden.%20Avrundet%20stilk.%22,%22edible%22:true,%22poisonous%22:false,%22area%22:%22Norge%22,%22image_url%22:%22https://media.snl.no/media/116599/standard_compressed_kantarell_37810.jpg%22}],%22name%22:%22Cantharellus%20cibarius%22,%22probability%22:0.6090075969696045},{%22prediction%22:[{%22id%22:44,%22name%22:%22Svart%20trompetsopp%22,%22latin_name%22:%22Craterellus%20cornucopioides%22,%22description%22:%22Svart%20trompetsopp,%20ogs%C3%A5%20kalt%20sort%20trompetsopp,%20er%20en%20sopp%20i%20trompetsoppslekten%20av%20kantarellfamilien.%20Svart%20trompetsopp%20sies%20%C3%A5%20vokse%20p%C3%A5%20jordbunn%20der%20eik%20og%20hassel%20forekommer,%20men%20kan%20v%C3%A6re%20vanskelig%20%C3%A5%20f%C3%A5%20%C3%B8ye%20p%C3%A5.%20Den%20regnes%20ikke%20for%20%C3%A5%20ha%20noen%20forvekslingsarter.%22,%22edible%22:true,%22poisonous%22:false,%22area%22:%22Norge%22,%22image_url%22:%22https://ultimate-mushroom.com/images/craterellus-cornucopioides-3.jpg%22}],%22name%22:%22Craterellus%20cornucopioides%22,%22probability%22:0.32500141859054565},{%22prediction%22:[],%22name%22:%22Ampulloclitocybe%20clavipes%22,%22probability%22:0.013549172319471836},{%22prediction%22:[],%22name%22:%22Infundibulicybe%20gibba%22,%22probability%22:0.011133745312690735},{%22prediction%22:[],%22name%22:%22Pseudoclitocybe%20cyathiformis%22,%22probability%22:0.010165112093091011}]";
const StyledFontWrapper = styled.div`
  @font-face {
    font-family: retro;
    src: url(retroFont.ttf);
  }

  link {
    color: red;
    padding: 10px;
  }

  position: relative;
  margin-left: 8px;
  height: 100px;
  width: 100px;
  .l1 {
    position: absolute;
    top: 0;
    left: 0;
    color: ${palette.lighterOrange};
    z-index: 10;
  }
  .l2 {
    position: absolute;
    top: 2px;
    left: 2px;
    color: #ff000080;
    z-index: 9;
  }
  .l3 {
    position: absolute;
    top: 2px;
    left: 4px;
    color: green;
    z-index: 8;
  }

  .l4 {
    position: absolute;
    top: 6px;
    left: 6px;
    color: blue;
    z-index: 7;
  }
  .l5 {
    position: absolute;
    top: 8px;
    left: 8px;
    color: yellow;
    z-index: 6;
  }
  .l6 {
    position: absolute;
    top: 9px;
    left: 9px;
    color: pink;
    z-index: 5;
  }

  h1 {
    font-family: retro;
    font-size: 35px;

    transition: transform 0.3s ease-in-out;

    :hover {
      transform: scale(1.2) rotate(745deg);
      cursor: pointer;
    }
  }
`;

const StyledLinkWrapper = styled.div`
  @font-face {
    font-family: retro;
    src: url(retroFont.ttf);
  }

  a {
    font-family: retro;
    color: #ffffffee;
    padding: 10px;
    font-size: 25px;
    text-shadow: -1px -1px 0 ${palette.primaryBlue},
      1px -1px 0 ${palette.primaryBlue}, -1px 1px 0 ${palette.primaryBlue},
      1px 1px 0 ${palette.primaryBlue};
    transition: font-size 0.25s ease-in-out, color 0.25s ease-in-out;

    :hover {
      font-size: 26px;
      color: #ffffffff;
      cursor: pointer;
    }
  }
`;

const StyledShroomyImage = styled.img`
  height: 70px;
  width: auto;
  border-radius: 50%;
  margin-left: 18px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease-in-out;

  :hover {
    transform: scale(1.2) rotate(745deg);
    box-shadow: 0 0 15px rgba(0, 100, 100, 0.5);
    cursor: pointer;
  }
`;
