const HomeValidator = require("../validators/home.validator");

var bcrypt = require("bcryptjs");
const { banner: Banner, category: Category, subcategory: Subcategory, products: Products, reviews: Reviews, order: Order, order_details: Orderdetails, Sequelize } = require("../models");
const { STATES, ROLES } = require("../constants/app.constant");
const { encryptdata, decryptdata } = require("../utils/encrypt&decrypt");
const Op = Sequelize.Op;
var CryptoJS = require("crypto-js");
const { default: axios } = require("axios");
const dayjs = require("dayjs");
const _ = require("lodash");

async function HomeDetails(req, res, next) {
  try {
    const { query, currentUser } = req;
    const validator = new HomeValidator({}, "list");

    if (validator.validate(query)) {
      const { page = 0, limit = 0, query = "", sortby = "", order = "", status = "" } = validator.value;
      const offset = (page - 1) * limit;
      const condition = {};
      const clause = {};
      let orderBy = [["id", "ASC"]];
      if (limit) {
        clause.limit = limit;
      }
      if (offset) {
        clause.offset = offset;
      }
      condition.from_date = {
        [Op.lt]: `${dayjs().format('YYYY-MM-DD')}`,
      };
      condition.to_date = {
        [Op.gte]: `${dayjs().format('YYYY-MM-DD')}`,
      };
      if (status) {
        condition.status = status;
      }
      if (sortby && order) {
        orderBy.unshift([sortby, order]);
      }
      condition.trash = 0;
      console.log(condition);
      if (query) {
        condition.type = query;
      }
      const { count, rows: data_banner } = await Banner.findAndCountAll({
        where: condition,
        order: orderBy,
        ...clause,
      });
      //let datas = encryptdata({ count, data }, "7v9y/B?E(H+MbQeThHmZq4t7w!z%C&F)");
      return res.json({ data_banner });
    } else {
      res.status(400).json({ errors: validator.errors });
    }
  } catch (error) {
    next(error);
  }
}

async function CategoryDetails(req, res, next) {
  try {
    const { query, currentUser } = req;
    const validator = new HomeValidator({}, "list");

    if (validator.validate(query)) {
      const { page = 0, limit = 0, query = "", sortby = "", order = "", status = "" } = validator.value;

      const clause = {};
      let orderBy = [["id", "ASC"]];
      if (sortby && order) {
        orderBy.unshift([sortby, order]);
      }

      const catcondition = { status: 1, trash: 0 };
      const { countcat, rows: data_category } = await Category.findAndCountAll({
        where: catcondition,
        order: orderBy,
        ...clause,
      });

      //let datas = encryptdata({ count, data }, "7v9y/B?E(H+MbQeThHmZq4t7w!z%C&F)");
      return res.json({ data_category });
    } else {
      res.status(400).json({ errors: validator.errors });
    }
  } catch (error) {
    next(error);
  }
}
async function ProductDetails(req, res, next) {
  try {
    const { query, currentUser } = req;
    const validator = new HomeValidator({}, "list");

    if (validator.validate(query)) {
      const { page = 0, limit = 0, query = "", sortby = "", order = "", status = "" } = validator.value;
      const offset = (page != 0) ? (page - 1) * limit : 0;
      const condition = {};
      const clause = {};
      let orderBy = [["id", "ASC"]];
      if (limit) {
        clause.limit = limit;
      }
      if (offset) {
        clause.offset = offset;
      }
      if (status) {
        condition.status = status;
      }
      if (query) {
        condition.category_id = query;
      }
      if (sortby && order) {
        orderBy.unshift([sortby, order]);
      }
      condition.trash = 0;
      console.log(condition);
      const { count, rows: data } = await Products.findAndCountAll({
        where: condition,
        include: [
          {
            model: Category,
            as: "category",
            where: {
              status: 1,
              trash: 0
            }
          },
        ],
        order: orderBy,
        ...clause,
      });
      const reviews = await Reviews.findAll({
        attributes: [
          'product_id',
          [Sequelize.fn('sum', Sequelize.col('rating')), 'rating'],
          [Sequelize.fn('count', Sequelize.col('rating')), 'count'],
        ],
        group: ['product_id'],
        raw: true
      });
      //let datas = encryptdata({ count, data }, "7v9y/B?E(H+MbQeThHmZq4t7w!z%C&F)");
      return res.json({ data, reviews });
    } else {
      res.status(400).json({ errors: validator.errors });
    }
  } catch (error) {
    next(error);
  }
}
async function CardDetails(req, res, next) {
  try {
    const { query, currentUser } = req;
    const validator = new HomeValidator({}, "list");

    if (validator.validate(query)) {
      const { page = 0, limit = 0, query = "", sortby = "", order = "", status = "" } = validator.value;
      const offset = (page != 0) ? (page - 1) * limit : 0;
      const condition = {};
      const clause = {};
      let orderBy = [["id", "ASC"]];
      if (limit) {
        clause.limit = limit;
      }
      if (offset) {
        clause.offset = offset;
      }
      if (status) {
        condition.status = status;
      }
      if (query) {
        condition.category_id = query;
      }
      if (sortby && order) {
        orderBy.unshift([sortby, order]);
      }
      condition.trash = 0;
      const pdts_id = [];
      /*Review Products*/
      const reviews = await Reviews.findAll({
        attributes: [
          'product_id',
          [Sequelize.fn('sum', Sequelize.col('rating')), 'rating'],
          [Sequelize.fn('count', Sequelize.col('rating')), 'count'],
        ],
        group: ['product_id'],
        raw: true,
        order: [[Sequelize.fn('sum', Sequelize.col('rating')), "DESC"]],
        limit: 3
      });
      const rev_pdts = _.map(reviews, 'product_id');
      console.log(_.map(reviews, 'product_id'));
      condition.id = rev_pdts;
      const { count, rows: toprated_data } = await Products.findAndCountAll({
        where: condition,
        order: orderBy,
        ...clause,
      });
      /*Best Seller Products*/
      let toprate = _.map(toprated_data, 'id');
      const order_details = await Orderdetails.findAll({
        attributes: [
          'product_id',
          [Sequelize.fn('count', Sequelize.col('id')), 'count'],
        ],
        group: ['product_id'],
        raw: true,
        order: [[Sequelize.fn('count', Sequelize.col('id')), "DESC"]],
        limit: 3
      });
      const orderpdts = _.map(order_details, 'product_id');
      condition.id = orderpdts;
      const { bestcount, rows: bestsell_data } = await Products.findAndCountAll({
        where: condition,
        order: orderBy,
        ...clause,
      });
      let bestsell = _.map(bestsell_data, 'id');


      const { offercount, rows: offer_data } = await Products.findAndCountAll({
        where: {
          sale_price: {
            [Op.lt]: Sequelize.col('regular_price')
          },
          status: 1,
          trash: 0
        },
        order: orderBy,
        limit: 3
      });
      let offer =_.map(offer_data, 'id');
      const pdts_ids = [...offer,...toprate,...bestsell]
      console.log(pdts_ids);

      const ratings_data = await Reviews.findAll({
        where:{
          product_id:pdts_ids
        },
        attributes: [
          'product_id',
          [Sequelize.fn('sum', Sequelize.col('rating')), 'rating'],
          [Sequelize.fn('count', Sequelize.col('rating')), 'count'],
        ],
        group: ['product_id'],
        raw: true,
      });
      //let datas = encryptdata({ count, data }, "7v9y/B?E(H+MbQeThHmZq4t7w!z%C&F)");
      return res.json({ ratings_data,offer_data, bestsell_data, toprated_data });
    } else {
      res.status(400).json({ errors: validator.errors });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  HomeDetails,
  ProductDetails,
  CategoryDetails,
  CardDetails
};
