import React from "react";
import ScrollToTop from "react-scroll-up";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";

const Scroll = () => {
  return (
    <ScrollToTop
      showUnder={160}
      duration={1500}
      easing={"easeInOutCubic"}
      style={{ transitionDuration: "1s" }}
    >
      <FontAwesomeIcon icon={faCaretSquareUp} className="scrollUp" />
    </ScrollToTop>
  );
};

export default Scroll;
