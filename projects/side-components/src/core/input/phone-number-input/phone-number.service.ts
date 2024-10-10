import { Injectable } from '@angular/core';
import parsePhoneNumber from 'libphonenumber-js'

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {

  constructor() { }

  getNationalFormat(phoneNumber: string) {
    const num = parsePhoneNumber(phoneNumber);
    return this.formatPhoneNumber(num?.formatNational() as string);
  }

  getInternationalFormat(phoneNumber: string) {
    const num = parsePhoneNumber(phoneNumber);
    return num?.formatInternational()
  }

  getURIFormat(phoneNumber: string) {
    const num = parsePhoneNumber(phoneNumber);
    return num?.getURI()
  }

  formatPhoneNumber(value: string): string {

    const cleaned = value.replace(/\D/g, ''); // Remove any non-digit characters

    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);


    if (match) {
      const [, areaCode, centralOfficeCode, lineNumber] = match;

      if (lineNumber) {
        // Return formatted number if it includes the full phone number
        return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
      } else if (centralOfficeCode) {
        // Return formatted number if it includes area code and part of the number
        return `(${areaCode}) ${centralOfficeCode}`;
      } else if (areaCode) {
        // Return formatted number with just the area code
        return `(${areaCode}`;
      }
    }
    return value; // Return unformatted value if it doesn't match
  }
}
