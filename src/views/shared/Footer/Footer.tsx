import React from "react";
import "../../../Assets/styles/global/_container.scss";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.footer__text}>
          Make with ❤️ for the MobProgramming team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
