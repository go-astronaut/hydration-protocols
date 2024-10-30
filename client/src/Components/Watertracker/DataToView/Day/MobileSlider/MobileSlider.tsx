import React from "react";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import {
  NextArrow,
  PreviosArrow,
} from "../../../../UI/SliderComponents/SliderComponents";
import classes from "./MobileSlider.module.css";

/**
 *
 * @param length count of slides
 * @param curr current slide
 * @returns state object for arrow visibility
 */
const getArrowObj = (length: number, curr: number) => {
  // no arrows
  if (length <= 1) {
    return { left: false, right: false };
  }

  // only right arrow is visible
  if (curr === 0) {
    return { left: false, right: true };
  }

  // only left arrow is visible
  if (curr === length - 1) {
    return { left: true, right: false };
  }

  // both arrows are visible
  return { left: true, right: true };
};

interface MobileSliderProps {
  slides: JSX.Element[];
}
/**
 * Slick slider for small screens.
 * Please wrap each element into a div.
 * @example <div><li className="list-item">That's how</li></div>
 */
const MobileSlider: React.FC<MobileSliderProps> = ({ slides }) => {
  // get slider reference
  const sliderRef = React.useRef<any>(null);
  const [arrows, setArrows] = React.useState(getArrowObj(slides.length, 0));
  const handleArrows = (_: number, newIndex: number) => {
    const newState = getArrowObj(slides.length, newIndex);
    setArrows(newState);
  };
  const handleNextClick = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
  };
  return (
    <Grid container alignItems={"center"}>
      <Grid item xs={12}>
        <Slider
          ref={sliderRef}
          dots
          // {infinite: true } renders 2 more elements to the view
          // it slows down the performance and creates flickering on sliding
          infinite={false}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          beforeChange={handleArrows}
          appendDots={(dots) => (
            <div>
              <ul className={classes["dots"]}>{dots}</ul>
            </div>
          )}
          nextArrow={
            arrows.right ? <NextArrow onClick={handleNextClick} /> : <></>
          }
          prevArrow={
            arrows.left ? <PreviosArrow onClick={handlePrevClick} /> : <></>
          }
        >
          {slides}
        </Slider>
      </Grid>
    </Grid>
  );
};

export { MobileSlider };
