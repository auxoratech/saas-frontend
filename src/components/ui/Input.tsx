type InputProps = {
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const Input = ({
  type = "text",
  name,
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
    />
  );
};

export default Input;
