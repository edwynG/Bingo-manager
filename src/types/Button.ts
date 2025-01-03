import { ReactNode } from "react";

interface ButtonProps {
  text: string | ReactNode;
  className?: string;
  onClick: (e?:any) => void;
}

export default ButtonProps;