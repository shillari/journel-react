import { useEffect, useState } from "react"
import { Alert } from "react-bootstrap";

export const AlertAutoDismiss = ({message, variant = 'primary', duration = 5000, onClose}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onclose]);

  if(!show) return null;

  return (
    <>
      {show && (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      )}
    </>
  )
}