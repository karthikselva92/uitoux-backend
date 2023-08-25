const jwt = require("jsonwebtoken");
const RedisSession = require('redis-sessions');
const config = require("../config/auth.config");
const { ROLES } = require("../constants/app.constant");
const db = require("../models");
const logger = require("../config/log.config").getLogger();
const { user: User } = db;
const { getRedis } = require("../utils/RedisSession");

const unAuthenticatedRoutes = [
  ".*/api/v1/home/.*",
  "/category_images/.*",
  "/product_image/.*",
  "/customitem_images/.*",
  "/aboutus_images/.*",
  "/banner_image/.*",
  "/profile_images/.*",
  "/notification_audios/.*",
  ".*/api/v1/client/statuscheck"
];

async function userAuthorization(req, res, next) {
  if (unAuthenticatedRoutes.every((_route) => !req.path.match(_route))) {
    const authToken = req.headers["x-access-token"];
    if (!authToken) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    const getToken = await getRedis({
      token: authToken
    }, function (err, resp) {
      console.log(resp);

      console.log(err);

    });

    if (getToken) {
      req.user = {
        id: getToken.id,
        ip: getToken.ip,
        userAgent: getToken?.d?.userAgent,
        userType: getToken?.d?.userType,
        roleId: getToken?.d?.roleId,
        username: getToken?.d?.name,
        email: getToken?.d?.email
      }
    } else {
      res.status(401).send({
        auth: "deleted",
        message: "UnAuthorized!",
      });
    }
    next();
    console.log(getToken);
    // await jwt.verify(token, config.secret, async (err, decoded) => {
    //   if (err) {
    //     return res.sendStatus(401);
    //   } else {
    //     if (decoded && decoded.user_id) {
    //       const user = await User.findByPk(decoded.user_id);
    //       if (user) {
    //         req.user_id = decoded.user_id;
    //         req.user_mode = decoded.user_mode;
    //         req.username = decoded.username;
    //         req.currentUser = user;
    //         req.is_admin = user.role_id === 1;
    //       }
    //       if (!user) {
    //         res.sendStatus(401);
    //       }
    //     } else {
    //       res.sendStatus(401);
    //     }
    //   }
    //   // authorized routes
    //   next();
    // });
  } else {

    if (req.path.indexOf('website') !== -1) {
      const authToken = req.headers["x-access-token"];
      if (!authToken) {
        req.user = { id: null }
      } else {
        const getToken = await getRedis({
          token: authToken
        }, function (err, resp) {
          console.log(resp);
          req.user = { id: null }
          console.log(err);

        });

        if (getToken) {
          req.user = {
            id: getToken.id,
            ip: getToken.ip,
            userAgent: getToken?.d?.userAgent,
            userType: getToken?.d?.userType,
            roleId: getToken?.d?.roleId,
            username: getToken?.d?.name,
            email: getToken?.d?.email
          }
        } else {
          res.status(401).send({
            auth: "deleted",
            message: "UnAuthorized!",
          });
        }
      }


    } else {
      req.user = { id: null }
    }

    // const authToken = req.headers["x-access-token"];

    // console.log('ok=' + req.path)
    // unauthorized routes
    next();
  }
}

module.exports = userAuthorization;
