import { Badge } from "@/components/ui/badge";
import { calcularPercentagem } from "@/utils/calcularPercent";
import {
  faArrowDown,
  faArrowUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  Title: string;
  CountNumber: number;
  Descriptions: String;
  icon?: IconDefinition;
};
export default function CardPainel({
  Title,
  CountNumber,
  Descriptions,
  icon,
}: Props) {
  const percentagem = calcularPercentagem(CountNumber);
  return (
    <div className="stat-card ">
      <div>
        <h3>{Title}</h3>
        <p
          className="text-sm truncate block opacity-70"
          title={Descriptions.toString()}
        >
          {Descriptions}
        </p>
      </div>

      <div className="stat-number"> {CountNumber}</div>
      <div>
        <Badge
          color={percentagem > 0.5 ? "green" : "red"}
          text={`+${percentagem}% este mês`}
        />
    
        <FontAwesomeIcon
          icon={percentagem > 0.5 ? faArrowUp : faArrowDown}
          className={` ml-1.5 ${percentagem > 0.5 ? "text-green-400" : "text-red-700"} size-7`}
        />

      </div>
    </div>
  );
}
