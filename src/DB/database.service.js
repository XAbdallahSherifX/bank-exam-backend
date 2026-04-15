export async function create({ data, model }) {
  const document = await model.create(data);
  return document;
}
export async function findOne({ filter, model, select }) {
  const document = await model.findOne(filter).select(select);
  return document;
}
export async function findByIdAndDelete({ id, options = {}, model }) {
  const document = await model.findByIdAndDelete(id, options);
  return document;
}
export async function deleteMany({ filter, options = {}, model }) {
  const document = await model.deleteMany(filter, options);
  return document;
}
export async function findOneAndDelete({ filter, options = {}, model }) {
  const document = await model.findOneAndDelete(filter, options);
  return document;
}
