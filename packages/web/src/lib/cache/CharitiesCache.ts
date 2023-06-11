import BaseCache from "./BaseCache";
import type { Charity } from "@lib/types";
import type { NumericalString } from "@lib/types";

export class CharitiesCache extends BaseCache<Charity> {
  constructor() {
    super("charities:");
  }
}

export default new CharitiesCache();
