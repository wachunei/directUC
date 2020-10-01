import PropTypes from "prop-types";
import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Checkbox from "../../../components/Checkbox";

function ServiceOption({
  option,
  name,
  userOptions,
  value,
  disabled,
  onChange,
}) {
  if (option.depends && !option.depends(userOptions)) {
    return null;
  }

  if (option.type === "checkbox") {
    return (
      <FormControl caption={option.caption}>
        <Checkbox
          name={name}
          disabled={disabled}
          checked={value}
          onChange={onChange}
        >
          {option.label}
        </Checkbox>
      </FormControl>
    );
  }

  return (
    <FormControl label={option.label} caption={option.caption}>
      <Input
        type={option.type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </FormControl>
  );
}

ServiceOption.propTypes = {
  option: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    caption: PropTypes.string,
    default: PropTypes.any,
    depends: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userOptions: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

ServiceOption.defaultProps = {
  value: undefined,
  disabled: false,
  userOptions: {},
};

export default ServiceOption;
