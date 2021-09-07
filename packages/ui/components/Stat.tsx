import type { FC } from "react";
import { Colours } from "./Colours";

export const Stat: FC<{
  title: string;
  value: string;
  colour?: Colours;
  description?: JSX.Element | string;
  icon?: JSX.Element;
}> = ({ title, value, description, icon, colour = "secondary" }) => (
  <div className="stat">
    {icon && <div className={`stat-figure text-${colour}`}>{icon}</div>}
    <div className="stat-title">{title}</div>
    <div className={`stat-value text-${colour}`}>{value}</div>
    {description && <div className="stat-desc">{description}</div>}
  </div>
);

export default Stat;
