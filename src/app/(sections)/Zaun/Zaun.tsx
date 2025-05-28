import styles from "./Zaun.module.scss";
import Intro from "./Intro/Intro"
import Apresentacao from "./Apresentacao/Apresentacao";

const Zaun = () => {
  return (
    <div className={styles.container}>
      <Intro />
      <Apresentacao />
    </div>
  )
}

export default Zaun
