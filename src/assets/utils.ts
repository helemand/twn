import { DateTime } from "luxon";

export const convertPersonalCodeToDate = (personalCode: string) => {
  const genderDigit = parseInt(personalCode.charAt(0), 10);
  const year = parseInt(personalCode.substring(1, 3), 10);
  const month = parseInt(personalCode.substring(3, 5), 10);
  const day = parseInt(personalCode.substring(5, 7), 10);

  const centuryOffsets: Record<number, number> = {
    1: 1800,
    2: 1800,
    3: 1900,
    4: 1900,
    5: 2000,
    6: 2000,
  };

  const fullYear = centuryOffsets[genderDigit] + year;

  const formattedDate = DateTime.fromObject({
    year: fullYear,
    month,
    day,
  }).toFormat("dd.MM.yyyy");

  return formattedDate;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const countryCode = phoneNumber.substring(0, 4);
  const remainingDigits = phoneNumber.substring(4);

  return `${countryCode} ${remainingDigits}`;
};
