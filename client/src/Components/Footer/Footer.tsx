import { useTranslation } from "react-i18next";
import classes from "./Footer.module.css";

const Footer = () => {
  // get translations
  const { t } = useTranslation();
  const title = t("footer.message");

  return (
    <div
      className={`${classes["wrapper"]} min-h-20 flex flex-col justify-center content-center mt-2`}
    >
      <div className={classes["message"]}>{title}</div>
      <div
        className={classes["copyright"]}
      >{`copyright © get-healthy.dev ${new Date().getFullYear()}`}</div>
    </div>
  );
};

export default Footer;
