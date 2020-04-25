const findIndex = (list, id) => list.indexOf(list.find(elem => elem.id === id))

const idGen = (prefix) => `${prefix}-${Math.random().toString().replace('.', '')}`;

export { idGen, findIndex }