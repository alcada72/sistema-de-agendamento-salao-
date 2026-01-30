import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  Title: string;
  CountNumber: String;
  Descriptions?: String;
  icon?: IconDefinition;
};
export default function CardPainel({
  Title,
  CountNumber,
  Descriptions,
  icon,
}: Props) {
  return (
    <div className="stat-card ">
      <h3>{Title}</h3>
      <div className="stat-number"> {CountNumber}</div>
      <span className="stat-badge">+12% este mês</span>
    </div>
  );
}
