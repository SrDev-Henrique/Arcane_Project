import styles from "./About.module.scss";

const About = ({ activeTab }: { activeTab: string }) => {
  const tab = "sobre";

  return (
    <div
      className={`${styles.container} ${
        activeTab !== tab ? styles.isHidden : ""
      }`}
    >
      <div className={styles.content}>
        {[...Array(3)].map((_, index) => (
          <div className={styles.columns} key={index} />
        ))}
      </div>
    </div>
  );
};

export default About;
