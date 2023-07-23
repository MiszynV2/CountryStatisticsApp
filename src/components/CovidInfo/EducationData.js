import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./CovidInfoListItem.module.css";
import EducationExpenditures from "../EducationData/EducationExpenditures";
import IlliteracyRate from "../EducationData/IlliteracyRate";
import LiteracyAndNumeracyRates from "../EducationData/LiteracyAndNumeracyRates";
import NumberOfStudents from "../EducationData/NumberOfStudents";

const EducationData = (country) => {
  console.log("EducationData", country);

  return (
    <>
      <EducationExpenditures
        optionSelected={country.optionSelected}
        iso={country.iso}
      />
      <IlliteracyRate
        optionSelected={country.optionSelected}
        iso={country.iso}
      />
      <NumberOfStudents
        optionSelected={country.optionSelected}
        iso={country.iso}
      />
    </>
  );
};

export default EducationData;
