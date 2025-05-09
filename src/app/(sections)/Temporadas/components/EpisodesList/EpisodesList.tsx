import Image from "next/image";
import React from "react";
import styles from "./EpisodesList.module.scss";

interface EpisodesItems {
  id: number;
  episode: string;
  title: string;
  image: string;
}

interface EpisodesListProps {
  episodes: EpisodesItems[];
}

const EpisodesList = ({ episodes }: EpisodesListProps) => {
  return (
    <div className={styles.container}>
      {episodes.map((episode) => (
        <div key={episode.id} className={styles.episode}>
          <Image
            src={episode.image}
            alt={`episódio-${episode.episode}`}
            width={3840}
            height={1632}
            className={styles.image}
          />
          <div className={styles.overlay}></div>
        </div>
      ))}
    </div>
  );
};

export default EpisodesList;
