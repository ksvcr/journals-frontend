export function toArray(data, ids) {
  return ids.map(id => ({ ...data[id] }));
}

export function toObject(entry, keyField='id', mapField=null) {
  const ids = [];
  const mapObject = {};

  const data = entry.reduce((list, item) => {
    ids.push(item[keyField]);
    if (mapField) {
      mapObject[item[mapField]] = item.id;
    }
    return {...list, [item[keyField]]: item};
  }, {});

  const obj = { data, ids };

  if (mapField) {
    obj[mapField] = mapObject;
  }

  return obj;
}
