import { Alert } from "react-bootstrap";

const Message = ({ children, variant = "info" }) => {
  return (
    <Alert className="my-3" variant={variant}>
      {children}
    </Alert>
  );
};

export default Message;
