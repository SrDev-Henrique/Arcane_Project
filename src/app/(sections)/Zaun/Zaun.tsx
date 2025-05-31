import styles from "./Zaun.module.scss";
import Intro from "./Intro/Intro";
import Apresentacao from "./Apresentacao/Apresentacao";
import Historia from "./Historia/Historia";
import Personagens from "./Personagens/Personagens";

const Zaun = () => {
  return (
    <div className={styles.container}>
      <Intro />
      <Apresentacao />
      <Historia />
      <Personagens />
    </div>
  );
};

export default Zaun;
