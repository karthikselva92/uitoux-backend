
function stringToIntArray(string) {
  return (string.length && string.split(",").map(Number)) || [];
}

function mappingBy(key = "", list) {
  let mapData = {};
  if (Array.isArray(list) && list.length) {
    const [el] = list;
    if (el.hasOwnProperty(key)) {
      mapData = list.reduce(
        (acc, item) => Object.assign(acc, { [`${item[key]}`]: item }),
        {}
      );
    }
  }
  return mapData;
}

function joiErrorParser(error) {
  return {
    field: error.path[0],
    message: error.message.replace(/"([^"]+(?="))"/g, "$1"),
  };
}

function getIp(req) {
  return Array(req.headers['x-forwarded-for']).join(' ') || req.connection.remoteAddress || req.ip;
}
module.exports = {
  joiErrorParser,
  mappingBy,
  stringToIntArray,
  getIp
};
