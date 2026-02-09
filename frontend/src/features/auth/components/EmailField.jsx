import StaticFloatingLabelInput from "../../../components/common/StaticFloatingLabel";
const EmailField = ({ register, errors, touchedFields }) => (
  <div className="flex flex-col">
    <StaticFloatingLabelInput
      label="Email"
      type="email"
      placeholder="Enter your email address"
      registerprob={register('email', {
        required: 'Email is required',
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Enter a valid email address',
        },
      })}
      error={touchedFields.email && errors.email}
    />
    {touchedFields.email && errors.email && (
      <span className="text-red-500 text-xs ml-1">{errors.email.message}</span>
    )}
  </div>
);

export default EmailField;
