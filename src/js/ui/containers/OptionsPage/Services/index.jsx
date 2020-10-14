import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import services from "../../../../services";
import Section from "../../../components/Section";
import Title from "../../../components/Title";
import Service from "./Service";

function Services() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.username);
  const userOptions = useSelector((state) => state.services);
  const order = useSelector((state) => state.options.order);
  const [draggingService, setDraggingService] = useState(null);
  const servicesDOMRef = useRef({});

  const servicesToDisplay = useMemo(
    () =>
      Object.entries(services).filter(
        ([key, service]) => service.display && userOptions[key]
      ),
    [services, userOptions]
  );

  const currentOrder = useMemo(() => {
    const keys = servicesToDisplay.map(([key]) => key);
    if (!order) {
      return keys;
    }
    return [
      ...order.filter((service) => keys.includes(service)),
      ...keys.filter((service) => !order.includes(service)),
    ];
  }, [order, servicesToDisplay]);

  const displayedButtons = useMemo(
    () => servicesToDisplay.filter(([key]) => userOptions[key].display).length,
    [servicesToDisplay, userOptions]
  );

  const servicesRefCallback = useCallback((service) => {
    if (service) {
      const { key, current } = service;
      servicesDOMRef.current = {
        ...servicesDOMRef.current,
        [key]: current,
      };
    }
  }, []);

  const onDragStart = useCallback((serviceKey) => {
    setDraggingService(serviceKey);
  }, []);

  const onDragEnd = useCallback(() => {
    setDraggingService(null);
  }, []);

  const setOrder = useCallback(
    (newOrder) =>
      (async () => {
        await dispatch({
          type: "setOption",
          payload: { option: "order", value: newOrder },
        });
      })(),
    []
  );

  const handleDragOver = useCallback(
    (event) => {
      if (draggingService) {
        event.preventDefault();
        const newOrder = Object.entries(servicesDOMRef.current)
          .map(([key, node]) => [
            key,
            draggingService === key
              ? 0
              : event.clientY -
                node.getBoundingClientRect().y -
                node.getBoundingClientRect().height / 2,
          ])
          .sort((a, b) => b[1] - a[1])
          .map(([key]) => key);
        setOrder(newOrder);
      }
    },
    [draggingService, servicesDOMRef, setOrder]
  );

  return (
    <Section onDragOver={handleDragOver}>
      <Title>Servicios</Title>
      <p>
        Los servicios activos aparecerán como botón y en los resultados de la
        omnibox. Arrastra los servicios para reordernarlos.
      </p>
      {currentOrder.map((key) => {
        const service = services[key];
        return (
          <Service
            ref={servicesRefCallback}
            key={key}
            serviceKey={key}
            service={service}
            loggedIn={!!loggedIn}
            userOptions={userOptions[key]}
            disabledToggleDisplay={displayedButtons === 1}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        );
      })}
    </Section>
  );
}

export default Services;
