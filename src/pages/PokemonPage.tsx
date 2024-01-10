import { useParams } from "react-router-dom";

export default function PokemonPage() {
  const { sname } = useParams();

  return <>{sname}</>;
}
