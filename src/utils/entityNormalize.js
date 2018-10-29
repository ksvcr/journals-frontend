export function toArray(data, ids) {
  return ids.map(id => ({ ...data[id] }));
}

export function toObject(entry, keyField='id') {
  const ids = [];
  const data = entry.reduce((list, item) => {
    ids.push(item[keyField]);
    return {...list, [item[keyField]]: item};
  }, {});

  return { data, ids };
}
