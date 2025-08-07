type InputProps = {
  type?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const Input = ({ className = "", ...props }: InputProps) => {
  return <input {...props} className={`input ${className}`} />;
};

export default Input;
