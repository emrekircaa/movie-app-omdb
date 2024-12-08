import React, { ReactNode } from "react";
import "./Container.scss";
interface IContainer {
  children: ReactNode;
}
const Container: React.FC<IContainer> = ({ children }) => {
  return <div className="pageContainer">{children}</div>;
};

export default Container;
