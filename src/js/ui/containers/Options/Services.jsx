import React from "react";
import { useSelector } from "react-redux";
import services from "../../../services";
import Service from "./Service";

function Services() {
  const loggedIn = useSelector((state) => state.user.username);
  const userOptions = useSelector((state) => state.services);

  const servicesToDisplay = Object.entries(services).filter(
    ([key, service]) => service.display && userOptions[key]
  );
  const displayedButtons = servicesToDisplay.filter(
    ([key]) => userOptions[key].display
  ).length;

  return servicesToDisplay.map(([key, service]) => (
    <Service
      key={key}
      serviceKey={key}
      service={service}
      loggedIn={!!loggedIn}
      userOptions={userOptions[key]}
      disabledToggleDisplay={displayedButtons === 1}
    />
  ));
}

export default Services;
