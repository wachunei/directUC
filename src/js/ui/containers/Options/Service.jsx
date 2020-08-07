import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Service from "../../components/Service";
import SubTitle from "../../components/SubTitle";
import FormControl from "../../components/FormControl";
import Checkbox from "../../components/Checkbox";

import ServiceOption from "./ServiceOption";

function ServiceContainer({
  loggedIn,
  service,
  serviceKey,
  userOptions,
  disabledToggleDisplay,
}) {
  const dispatch = useDispatch();
  const { options, name } = service;

  const handleOptionChange = async (e) => {
    const {
      target: { name: inputName, value, type, checked },
    } = e;
    await dispatch({
      type: `servicesActions.${serviceKey}.setOption`,
      payload: {
        option: inputName,
        value: type === "checkbox" ? checked : value,
      },
    });
  };

  return (
    <>
      <Service>
        <SubTitle>{name}</SubTitle>
        <FormControl>
          <Checkbox
            name="display"
            disabled={
              !loggedIn || (userOptions.display && disabledToggleDisplay)
            }
            checked={userOptions.display}
            onChange={handleOptionChange}
          >
            Mostrar Botón
          </Checkbox>
        </FormControl>

        {options &&
          Object.entries(options).map(([optionKey, option]) => {
            if (optionKey === "display") {
              return null;
            }

            return (
              <ServiceOption
                key={optionKey}
                name={optionKey}
                option={option}
                userOptions={userOptions}
                value={userOptions[optionKey]}
                disabled={!loggedIn}
                onChange={handleOptionChange}
              />
            );
          })}
      </Service>
    </>
  );
}

ServiceContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string,
    options: PropTypes.object,
  }).isRequired,
  serviceKey: PropTypes.string.isRequired,
  userOptions: PropTypes.shape({
    display: PropTypes.bool,
  }).isRequired,
  disabledToggleDisplay: PropTypes.bool.isRequired,
};

export default ServiceContainer;
