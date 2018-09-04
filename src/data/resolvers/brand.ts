import { Integrations } from "../../db/models";
import { IBrandDocument } from "../../db/models/definitions/brands";

export default {
  integrations(brand: IBrandDocument) {
    return Integrations.find({ brandId: brand._id });
  }
};
