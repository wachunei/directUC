import { useSelector, useDispatch } from "react-redux";
import services from "../../../services";
import { COLORS_UI } from "../../theme";

import FormControl from "../../components/FormControl";
import Checkbox from "../../components/Checkbox";
import Select from "../../components/Select";
import ColorButton from "../../components/ColorButton";

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

  const handleDarkModeOptionChange = async (e) => {
    const {
      target: { name, value, type, checked },
    } = e;

    const defaultValue = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    await dispatch({
      type: "setOption",
      payload: {
        option: name,
        // eslint-disable-next-line no-nested-ternary
        value: type === "checkbox" ? (checked ? "auto" : defaultValue) : value,
      },
    });
  };

  const handleDefaultPrimaryColorChange = async (e) => {
    const {
      target: { name, checked },
    } = e;

    await dispatch({
      type: "setOption",
      payload: {
        option: name,
        value: checked ? "blue" : "green",
      },
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
      <FormControl label="Modo Oscuro">
        <Checkbox
          onChange={handleDarkModeOptionChange}
          name="colorScheme"
          checked={options.colorScheme === "auto"}
          disabled={!loggedIn}
        >
          Usar preferencias del sistema
        </Checkbox>
      </FormControl>
      <FormControl>
        <Select
          disabled={options.colorScheme === "auto" || !loggedIn}
          onChange={handleDarkModeOptionChange}
          name="colorScheme"
          value={options.colorScheme}
        >
          <option hidden disabled value="auto">
            Automático
          </option>
          <option value="light">Siempre Claro</option>
          <option value="dark">Siempre Oscuro</option>
        </Select>
      </FormControl>
      <FormControl label="Color Principal">
        {COLORS_UI.map((color) => (
          <ColorButton
            key={color.key}
            type="button"
            name="primaryColor"
            value={color.key}
            label={color.label}
            emoji={color.emoji}
            onClick={handleOptionChange}
            selected={options.primaryColor === color.key}
            disabled={!loggedIn}
          />
        ))}
      </FormControl>
      <FormControl>
        <Checkbox
          onChange={handleDefaultPrimaryColorChange}
          name="primaryColor"
          checked={options.primaryColor === "blue"}
          disabled={!loggedIn}
        >
          Usar color por defecto
        </Checkbox>
      </FormControl>
    </>
  );
}

export default Options;
