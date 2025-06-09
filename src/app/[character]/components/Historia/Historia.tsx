import styles from "./Historia.module.scss";

import Journey from "./components/Journey/Journey";
import FirstSeason from "./components/FirstSeason/FirstSeason";
import SecondSeason from "./components/SecondSeason/SecondSeason";
import Conclusion from "./components/Conclusion/Conclusion";

const Historia = ({ activeTab }: { activeTab: string }) => {
  const tab = "história";

  return (
    <div
      className={`${styles.container} ${
        activeTab !== tab ? styles.isHidden : ""
      }`}
    >
      <h1>História</h1>
      <Journey />
      <FirstSeason />
      <SecondSeason />
      <Conclusion />
    </div>
  );
};

export default Historia;
