import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileUniteWithUs from "./MobileUniteWithUs";
import UniteWithUsUpdated from "../components/UniteWithUsUpdated";

const UniteWithUs = () => {
  // Mobile breakpoint: screen widths up to 768px considered mobile.
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return isMobile ? <MobileUniteWithUs /> : <UniteWithUsUpdated />;
};

export default UniteWithUs;