import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const useGetDimensions = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { height, width } = Dimensions.get("screen");

  function handleSetDimentions() {
    const { height, width } = Dimensions.get("screen");
    setDimensions({ height, width });
  }

  useEffect(() => {
    handleSetDimentions();
  }, []);

  useEffect(() => {
    if (width < height) {
      setTimeout(() => {
        handleSetDimentions();
      }, 500);
    }
  }, [width, height]);

  return dimensions;
};
