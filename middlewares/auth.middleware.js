const config = require("../config.js");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }
  try {
    token = token.substring(7, token.length);
    const decoded = jwt.verify(token, config.secret);

    res.locals.user = decoded.email;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Forbidden!" });
  }
}

function isSuperAdmin(req, res, next) {
  let token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }
  try {
    token = token.substring(7, token.length);
    const decoded = jwt.verify(token, config.secret);

    if (decoded.id !== 3) throw new Error("Not a SuperAdmin!");
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Forbidden!" });
  }
}

function isSelf(req, res, next) {
  let token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }
  try {
    token = token.substring(7, token.length);
    const id = parseInt(req.params.id);
    const decoded = jwt.verify(token, config.secret);

    if (decoded.id !== id) throw new Error("Not accessing own record!");
    next();
  } catch (err) {
    // console.error(err);
    res.status(403).json({ message: "Forbidden!" });
  }
}

function getUser(req, res) {
  let token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }
  try {
    token = token.substring(7, token.length);
    const decoded = jwt.verify(token, config.secret);
    return decoded.id;
    
  } catch (err) {
    // console.error(err);
    res.status(403).json({ message: "Forbidden!" });
  }
}

module.exports = { auth, isSelf, isSuperAdmin, getUser };
