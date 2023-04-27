require('dotenv').config();

export const validationFlags = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

export const COLLECTION_URL = {
  default: `${process.env.RESOURCES_URL}/assets/default_collection.png`,
  decentraland:
    'https://www.businessinsider.in/photo/88594809/Decentraland-and-its-collection-of-wearables.jpg',
};
export default {
  validationFlags,
  RESOURCES_URL: process.env.RESOURCES_URL,
};
