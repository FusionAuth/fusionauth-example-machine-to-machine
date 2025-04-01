const jose = require('jose');

function hasPermission(apiEntityId, expectedPermission) {
  return (req, res, next) => {
    const decodedToken = jose.decodeJwt(req.verifiedToken);
    console.log("test");
    console.log(decodedToken);
    console.log(decodedToken.permissions);
    console.log(apiEntityId);
    console.log(expectedPermission);
    if (checkPermission(decodedToken, apiEntityId, expectedPermission)) {
      return next();
    }
    // if (permissions.some((permission) => decodedToken.permissions.includes(permission))) return next();
    res.status(403);
    res.send({ error: `You do not have permissions to do this.` });
  }
}

function checkPermission(json, uuid, permission) {
  if (!json.permissions || typeof json.permissions !== 'object') {
    return false;
  }
  
  return json.permissions[uuid]?.includes(permission) || false;
}

module.exports = hasPermission;
