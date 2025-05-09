import EpisodesList from "./EpisodesList/EpisodesList";

import { seasons } from "@/data/Temporadas";

const PrimeiraTemporada = () => {
    const episodes = seasons.firstSeason
  return (
    <div>
      <EpisodesList episodes={episodes} />
    </div>
  )
}

export default PrimeiraTemporada
