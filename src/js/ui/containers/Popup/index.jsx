import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import browser from "webextension-polyfill";
import { useAnalytics } from "use-analytics";
import services from "../../../services";
import Notifications from "../../../notifications";

import GlobalStyle, {
  PopupStyle,
  PopupDirectModeStyle,
} from "../../components/GlobalStyles";
import PopupLoadingOverlay from "../../components/PopupLoadingOverlay";
import Service from "./Service";
import IconButton from "../../components/IconButton";
import CloseIcon from "../../components/CloseIcon";
import EngineIcon from "../../components/EngineIcon";
import Logo from "../../components/Logo";
import PopupBar from "../../components/PopupBar";
import Spinner from "../../components/Spinner";

const CurrentUser = styled.span`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
`;

const Popup = () => {
  const dispatch = useDispatch();
  const { page } = useAnalytics();
  const { directMode, directModeService } = useSelector(
    (state) => state.options
  );
  const { username, fullName } = useSelector((state) => state.user);
  const servicesOptions = useSelector((state) => state.services);
  const [loading, setLoading] = useState(false);

  const isDirectMode = directMode && directModeService;

  useEffect(() => {
    (async () => {
      if (isDirectMode) {
        await dispatch({ type: "directMode" });
        window.close();
      }
    })();
  }, [isDirectMode]);

  useEffect(() => {
    (async () => {
      if (!username) {
        await Notifications.createLoggedOut();
        window.close();
      }
    })();
  }, [username]);

  useEffect(() => {
    if (!isDirectMode && username) {
      page();
    }
  }, [username, isDirectMode]);

  const handleServiceClick = async (event) => {
    const {
      type,
      button,
      target: {
        dataset: { service },
      },
    } = event;

    const isMiddleClick = type === "auxclick" && button === 1;

    setLoading(true);
    try {
      await dispatch({
        type: `servicesActions.${service}.callActionAndRedirect`,
        payload: {
          disposition: isMiddleClick ? "newBackgroundTab" : undefined,
        },
      });

      setLoading(false);

      if (!isMiddleClick) {
        window.close();
      }
    } catch {
      setLoading(false);
    }
  };

  const handleOptionsClick = async () => {
    await browser.runtime.openOptionsPage();
    window.close();
  };

  if (isDirectMode) {
    return (
      <>
        <GlobalStyle />
        <PopupDirectModeStyle />
        <Spinner width="20px" height="auto" />
      </>
    );
  }

  if (!username) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <PopupStyle />
      <PopupBar>
        <Logo width="60px" />
        <IconButton
          type="button"
          onClick={window.close}
          title="Cerrar ventana"
          tabIndex="0"
        >
          <CloseIcon width="15px" />
        </IconButton>
      </PopupBar>

      {Object.entries(services)
        .filter(
          ([key, service]) =>
            service.display &&
            servicesOptions[key] &&
            servicesOptions[key].display
        )
        .map(([key, service]) => (
          <Service
            key={key}
            service={service}
            onClick={handleServiceClick}
            onAuxClick={handleServiceClick}
            data-service={key}
            title={`Abrir ${service.name}`}
            // eslint-disable-next-line jsx-a11y/tabindex-no-positive
            tabIndex="1"
          >
            {service.display}
          </Service>
        ))}

      <PopupBar>
        <CurrentUser title={`Sesión iniciada como ${fullName} (${username})`}>
          {username}
        </CurrentUser>
        <IconButton
          type="button"
          onClick={handleOptionsClick}
          title="Abrir opciones"
          tabIndex="0"
        >
          <EngineIcon width="15px" />
        </IconButton>
      </PopupBar>
      {loading && (
        <PopupLoadingOverlay>
          <Spinner />
        </PopupLoadingOverlay>
      )}
    </>
  );
};

export default Popup;
