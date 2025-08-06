type InputProps = {
  type?: string;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const Input = ({
  type = "text",
  name,
  value = "",
  placeholder = "",
  required = false,
  className = "",
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className={`input ${className}`}
      value={value}
    />
  );
};

export default Input;
