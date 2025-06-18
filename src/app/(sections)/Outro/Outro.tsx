import styles from './Outro.module.scss'
import Intro from "./Intro/Intro";
import Credits from "./Credits/Credits";

const Outro = () => {
  return (
    <section className={styles.container}>
          <Intro />
          <Credits />
    </section>
  );
};

export default Outro;
