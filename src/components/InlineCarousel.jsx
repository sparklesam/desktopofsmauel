import React from "react";
import styled from "styled-components";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import faAngleRight from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const IconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: 20px;
`;

const InlineCarousel = ({ data, children }) => {
  return (
    <Carousel
      autoPlay={10000}
      animationSpeed={1000}
      infinite
      arrowLeft={<IconWrapper icon={faAngleLeft} size="1x" />}
      arrowRight={<IconWrapper icon={faAngleRight} size="1x" />}
      addArrowClickHandler
    >
      {children}
    </Carousel>
  );
};

export default InlineCarousel;
