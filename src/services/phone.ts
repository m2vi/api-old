import PhoneNumber from 'awesome-phonenumber';

export class Phone {
  #country: string | null;
  constructor(private phoneNumber: string, private options?: any) {
    this.#country = this.options?.country ? this.options?.country : null;
  }

  public async lookup() {
    try {
      const pn = new PhoneNumber(this.phoneNumber, this.#country);
      const pnNumber = pn.toJSON()?.number;

      if (!pn.isValid()) throw Error(`Given phone number is not valid`);

      return {
        query: this.phoneNumber,
        valid: pn.isValid(),
        possible: pn.isPossible(),
        canBeInternationallyDialled: pn.canBeInternationallyDialled(),
        type: pn.getType(),
        country: {
          countryCode: `+${pn.getCountryCode()}`,
          regionCode: pn.getRegionCode(),
        },
        number: pnNumber,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export default Phone;
