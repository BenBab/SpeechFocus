import { useState, useEffect } from "react";

import Device from "react-native-device-detection";

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (Device.isTablet) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }
  }, []);

  return isTablet;
};
