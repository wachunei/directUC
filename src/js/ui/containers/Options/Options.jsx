import React from "react";
import { useSelector, useDispatch } from "react-redux";
import services from "../../../services";

import FormControl from "../../components/FormControl";
import Checkbox from "../../components/Checkbox";
import Select from "../../components/Select";
import HorizontalSeparator from "../../components/HorizontalSeparator";

function Options() {
  const dispatch = useDispatch();
  const options = useSelector((state) => state.options);
  const loggedIn = useSelector((state) => state.user.username);

  const handleOptionChange = async (e) => {
    const {
      target: { name, value, type, checked },
    } = e;
    await dispatch({
      type: "setOption",
      payload: { option: name, value: type === "checkbox" ? checked : value },
    });
  };

  return (
    <>
      <FormControl>
        <Checkbox
          onChange={handleOptionChange}
          name="sameTab"
          checked={options.sameTab}
          disabled={!loggedIn}
        >
          Abrir siempre en la pestaña actual
        </Checkbox>
      </FormControl>
      <HorizontalSeparator />
      <FormControl label="Modo Directo">
        <Checkbox
          onChange={handleOptionChange}
          name="directMode"
          checked={options.directMode}
          disabled={!loggedIn}
        >
          Activar modo directo
        </Checkbox>
      </FormControl>
      <FormControl>
        <Select
          disabled={!options.directMode || !loggedIn}
          onChange={handleOptionChange}
          name="directModeService"
          value={options.directModeService}
        >
          <option hidden disabled value="">
            Selecciona un servicio
          </option>
          {Object.entries(services).map(([key, service]) => {
            if (!service.display) {
              return null;
            }
            return (
              <option value={key} key={key}>
                {service.name || key}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

export default Options;
