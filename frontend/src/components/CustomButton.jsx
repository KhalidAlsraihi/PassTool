import { Button } from "@mui/material";

const CustomButton = ({
  text,
  variant = "outlined",
  color = "primary",
  ...props
}) => {
  return (
    <Button variant={variant} color={color} {...props}>
      {text}
    </Button>
  );
};

export default CustomButton;
