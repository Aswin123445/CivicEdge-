import StaticFloatingLabelInput from "../../../components/common/StaticFloatingLabel";
import PasswordStrengthMessage from "./PasswordStrengthMessage ";
import { useState } from "react";

const PasswordField = ({ register, errors, touchedFields, unmetCriteria ,label,form_control_name , error_prefix}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (<div className="flex flex-col mt-2">
    <StaticFloatingLabelInput
      label={label}
      type="password"
      placeholder="Enter your password"
      registerprob={register(form_control_name, {
        required: 'Password is required',
      })}
      error={touchedFields.form_control_name && errors.form_control_name}
      setShowPassword={setShowPassword}
      showPassword={showPassword}
      needShowPasswordToggle={true}
    />
    {touchedFields.password && unmetCriteria.length > 0 && (
      <PasswordStrengthMessage unmetCriteria={unmetCriteria}  prefix={error_prefix}/>
    )}
  </div>);
}

export default PasswordField;
