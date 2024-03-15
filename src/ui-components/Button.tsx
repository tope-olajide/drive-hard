import { MouseEventHandler } from "react";

const Button = ({
    name,
     id,
    handleClick,
 
}: {
  name: string;
  id?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <button id={id||""} className="button" onClick={handleClick}>{name}</button>
    </>
  );
};

export default Button;
