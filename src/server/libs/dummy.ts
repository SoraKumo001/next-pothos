/*
export const getUniqueIdentifierFields = (model: DMMF.Model) => {
  const idFields = model.fields
    .filter(({ isId }) => isId)
    .map(({ name }) => name);
  if (idFields.length) {
    return idFields;
  }

  if (model.primaryKey?.fields.length) {
    return model.primaryKey.fields;
  }

  const uniqueFields = model.fields
    .filter(({ isUnique }) => isUnique)
    .map(({ name }) => name);

  if (uniqueFields.length) {
    return uniqueFields;
  }

  if (model.uniqueFields?.length) {
    return model.uniqueFields[0];
  }

  throw new Error(
    `Unable to resolve a unique identifier for the Prisma model: ${model.name}`
  );
};
*/
