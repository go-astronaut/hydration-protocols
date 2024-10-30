import React, { useState } from "react";
import NumberSpinner from "./NumberSpinner";
import { DigitsIndex } from "../../../../Constants";
import classes from "./NumberSelection.module.css";
import { useTranslation } from "react-i18next";

interface NumberSelectionProps {
  headerName: string;
  value: number;
  setNumber: (value: number) => void;
}

/**
 * get a digit from an array
 */
const getDigit = (arr: Array<string> | null, index: DigitsIndex) => {
  const num = arr ? arr[arr.length - index] : undefined;
  return num && !isNaN(+num) ? +num : 0;
};

const NumberSelection: React.FC<NumberSelectionProps> = ({
  setNumber,
  headerName,
  value,
}) => {
  // get translations
  const { t } = useTranslation();
  const translations = {
    ml: t("measuringUnits.ml"),
  };

  const numbersArray = Array.from(value.toString());
  const [onesDigits] = useState(getDigit(numbersArray, DigitsIndex.ones));
  const [tensDigits, setTensDigits] = useState(
    getDigit(numbersArray, DigitsIndex.tens)
  );
  const [hundredsDigits, setHundredsDigits] = useState(
    getDigit(numbersArray, DigitsIndex.hundred)
  );
  const [thousandsDigits, setThousandsDigits] = useState(
    getDigit(numbersArray, DigitsIndex.thousand)
  );

  const handleThousands = (value: number) => {
    const resultString = `${value}${hundredsDigits}${tensDigits}${onesDigits}`;
    setNumber(+resultString);
    setThousandsDigits(value);
  };

  const handleHundreds = (value: number) => {
    const resultString = `${thousandsDigits}${value}${tensDigits}${onesDigits}`;
    setNumber(+resultString);
    setHundredsDigits(value);
  };

  const handleTens = (value: number) => {
    const resultString = `${thousandsDigits}${hundredsDigits}${value}${onesDigits}`;
    setNumber(+resultString);
    setTensDigits(value);
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>{headerName}</div>
      <div className={classes["container-number-picker"]}>
        <NumberSpinner
          areArrowsVisible={true}
          value={thousandsDigits}
          arr={numbersArray}
          index={DigitsIndex.thousand}
          setValue={handleThousands}
        />
        <NumberSpinner
          areArrowsVisible={true}
          value={hundredsDigits}
          arr={numbersArray}
          index={DigitsIndex.hundred}
          setValue={handleHundreds}
        />
        <NumberSpinner
          areArrowsVisible={true}
          value={tensDigits}
          arr={numbersArray}
          index={DigitsIndex.tens}
          setValue={handleTens}
        />
        <NumberSpinner
          areArrowsVisible={false}
          value={onesDigits}
          arr={numbersArray}
          index={DigitsIndex.ones}
        />
        <div className={classes["measuring-unit"]}>{translations.ml}</div>
      </div>
    </div>
  );
};

export default NumberSelection;
