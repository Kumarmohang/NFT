/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
export const serializeToJson = (
  results,
  associations = ['platform_user', 'master_type'],
  method = 'find'
) => {
  if (method === 'findAndCountAll') {
    const inputResults = [...results.rows];

    const updatedResults = inputResults.map((mainItem) => {
      const updatedItem = { ...mainItem.dataValues };

      associations.map((internalKey) => {
        if (updatedItem[internalKey]) {
          if (
            updatedItem[internalKey].length &&
            Array.isArray(updatedItem[internalKey])
          ) {
            updatedItem[internalKey] = updatedItem[internalKey].map(
              (arrItem) => arrItem.dataValues
            );
          } else {
            updatedItem[internalKey] = updatedItem[internalKey].dataValues;
          }
        }
      });
      return updatedItem;
    });
    results.rows = updatedResults;
    return results;
  }
  if (method === 'findOne') {
    const inputResults = { ...results.dataValues };
    associations.map((internalKey) => {
      if (inputResults[internalKey]) {
        if (
          inputResults[internalKey].length &&
          Array.isArray(inputResults[internalKey])
        ) {
          inputResults[internalKey] = inputResults[internalKey].map(
            (arrItem) => arrItem.dataValues
          );
        } else {
          inputResults[internalKey] = inputResults[internalKey].dataValues;
        }
      }
    });
    return inputResults;
  }
};
