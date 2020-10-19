import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Service from "../../../components/Service";
import SubTitle from "../../../components/SubTitle";
import FormControl from "../../../components/FormControl";
import Checkbox from "../../../components/Checkbox";
import Box from "../../../components/Box";

import ServiceOption from "./ServiceOption";

const DragHandle = styled.span`
  opacity: 0;
  transition: opacity 0.2s;
`;

const StyledService = styled(Service)`
  &:hover {
    ${DragHandle} {
      opacity: ${({ loggedIn }) => (loggedIn ? 1 : 0)};
    }
  }
`;

const ServiceContainer = forwardRef(function ServiceContainerComponent(
  {
    loggedIn,
    service,
    serviceKey,
    userOptions,
    disabledToggleDisplay,
    onDragStart,
    onDragEnd,
  },
  ref
) {
  const serviceRef = useRef(null);
  useImperativeHandle(ref, () => ({
    key: serviceKey,
    current: serviceRef.current,
  }));
  const dispatch = useDispatch();
  const { options, name } = service;
  const [draggable, setDraggable] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleOptionChange = useCallback(
    async (e) => {
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
    },
    [dispatch, serviceKey]
  );

  const handleDragHandlerEnter = useCallback(() => setDraggable(loggedIn), [
    loggedIn,
  ]);
  const handleDragHandlerLeave = useCallback(() => setDraggable(false), []);
  const handleDragStart = useCallback(() => {
    setDragging(true);
    onDragStart(serviceKey);
  }, [onDragStart, serviceKey]);

  const handleDragEnd = useCallback(() => {
    setDragging(false);
    onDragEnd();
  }, [onDragEnd]);

  return (
    <StyledService
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragging={dragging}
      loggedIn={loggedIn}
      ref={serviceRef}
    >
      <Box
        horizontal
        between
        middle
        style={loggedIn ? { cursor: dragging ? "grabbing" : "grab" } : null}
        onMouseEnter={handleDragHandlerEnter}
        onMouseLeave={handleDragHandlerLeave}
      >
        <SubTitle>{name}</SubTitle>
        <DragHandle>⠿</DragHandle>
      </Box>

      <FormControl>
        <Checkbox
          name="display"
          disabled={!loggedIn || (userOptions.display && disabledToggleDisplay)}
          checked={userOptions.display}
          onChange={handleOptionChange}
        >
          Activar
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
    </StyledService>
  );
});

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
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default ServiceContainer;
