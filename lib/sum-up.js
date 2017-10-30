const sum = (prop, array) => array.reduce((count, obj) => count + obj[prop], 0);

export default sum;
