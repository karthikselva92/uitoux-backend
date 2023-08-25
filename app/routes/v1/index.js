const app = require("express").Router();
var bcrypt = require("bcryptjs");
// database
const db = require("../../models");
db.sequelize.sync({ alter: true }).then(() => {
  db.role.bulkCreate(
    [
      {
        id: 1,
        name: "Admin",
      },
      {
        id: 2,
        name: "Super Admin",
      },
      {
        id: 3,
        name: "User",
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );

  db.user.bulkCreate(
    [
      {
        id: 1,
        role_id: 2,
        first_name: "Super",
        last_name: "Admin",
        email: "admin@yopmail.com",
        mobile: "9876543210",
        password: bcrypt.hashSync("admin@1234", 8),
      },
      {
        id: 2,
        role_id: 3,
        first_name: "Customer",
        last_name: "One",
        email: "customer1@yopmail.com",
        mobile: "9876543212",
        password: bcrypt.hashSync("admin@1234", 8),
      },
      {
        id: 3,
        role_id: 3,
        first_name: "Customer",
        last_name: "Two",
        email: "customer2@yopmail.com",
        mobile: "9876543211",
        password: bcrypt.hashSync("admin@1234", 8),
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );

  db.category.bulkCreate(
    [
      {
        id: 1,
        name: "Power Tools",
        description: "Power Tools",
        image_path: 'category_image/plumbing.jpg',
        status:1
      },
      {
        id: 2,
        name: "Hand Tools",
        description: "Hand Tools",
        image_path: 'category_image/plumbing.jpg',
        status:1
      },
      {
        id: 3,
        name: "Plumbing",
        description: "Plumbing Tools",
        image_path: 'category_image/plumbing.jpg',
        status:1
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );

  db.sub_category.bulkCreate(
    [
      {
        id: 1,
        category_id:1,
        name: "Power Tools",
        description: "Power Tools",
        image_path: 'subcategory_image/plumbing.jpg',
        status:1
      },
      {
        id: 2,
        category_id:2,
        name: "Hand Tools",
        description: "Hand Tools",
        image_path: 'subcategory_image/plumbing.jpg',
        status:1
      },
      {
        id: 3,
        category_id:3,
        name: "Plumbing",
        description: "Plumbing Tools",
        image_path: 'subcategory_image/plumbing.jpg',
        status:1
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );

  db.products.bulkCreate(
    [
      {
        id: 1,
        sku:"123214-123",
        category_id:1,
        subcategory_id:1,
        name: "Glossy Gray 19' Aluminium",
        description: "Power Tools",
        regular_price: 589.00,
        sale_price: 589.00,
        image_path: 'product_image/product-1.jpeg',
        status:1,
        featured:1
      },
      {
        id: 2,
        sku:"123214-122",
        category_id:1,
        subcategory_id:1,
        name: "Twin Exhaust Pipe From Brandix",
        description: "Power Tools",
        regular_price: 589.00,
        sale_price: 589.00,
        image_path: 'product_image/product-2.jpeg',
        status:1,
        featured:1
      },
      {
        id: 3,
        sku:"123214-124",
        category_id:1,
        subcategory_id:1,
        name: "Motor Oil Level 5",
        description: "Power Tools",
        regular_price: 589.00,
        sale_price: 589.00,
        image_path: 'product_image/product-3.jpeg',
        status:1,
        featured:1
      },
      {
        id: 4,
        sku:"123214-125",
        category_id:1,
        subcategory_id:1,
        name: "Brandix Engine Block Z4",
        description: "Power Tools",
        regular_price: 589.00,
        sale_price: 589.00,
        image_path: 'product_image/product-4.jpeg',
        status:1,
        featured:1
      },
      {
        id: 5,
        sku:"123214-126",
        category_id:1,
        subcategory_id:1,
        name: "Brandix Clutch Discs Z175",
        description: "Power Tools",
        regular_price: 589.00,
        sale_price: 589.00,
        image_path: 'product_image/product-5.jpeg',
        status:1,
        featured:1
      },
      {
        id: 6,
        sku:"123214-127",
        category_id:2,
        subcategory_id:2,
        name: "Fantastic 12-Stroke Engine With A Power of 1991 hp",
        description: "Power Tools",
        regular_price: 2579.00,
        sale_price: 2579.00,
        image_path: 'product_image/product-6.jpeg',
        status:1,
        featured:1
      },
      {
        id: 7,
        sku:"123214-128",
        category_id:2,
        subcategory_id:2,
        name: "40 Megawatt Low Beam Lamp",
        description: "Power Tools",
        regular_price: 4.00,
        sale_price: 4.00,
        image_path: 'product_image/product-7.jpeg',
        status:1,
        featured:1
      },
      {
        id: 8,
        sku:"123214-129",
        category_id:2,
        subcategory_id:2,
        name: "Set of Four 19 Inch Spiked Tires",
        description: "Power Tools",
        regular_price: 327.00,
        sale_price: 327.00,
        image_path: 'product_image/product-8.jpeg',
        status:1,
        featured:1
      },
      {
        id: 9,
        sku:"123214-130",
        category_id:3,
        subcategory_id:3,
        name: "Brandix Manual Five Speed Gearbox",
        description: "Power Tools",
        regular_price: 879.00,
        sale_price: 879.00,
        image_path: 'product_image/product-9.jpeg',
        status:1,
        featured:1
      },
      {
        id: 10,
        sku:"123214-131",
        category_id:3,
        subcategory_id:3,
        name: "Set of Car Floor Mats Brandix z4",
        description: "Power Tools",
        regular_price: 94.00,
        sale_price: 78.00,
        image_path: 'product_image/product-10.jpeg',
        status:1,
        featured:1
      },
      {
        id: 11,
        sku:"123214-132",
        category_id:3,
        subcategory_id:3,
        name: "Taillights Brandix Z54",
        description: "Power Tools",
        regular_price: 94.00,
        sale_price: 78.00,
        image_path: 'product_image/product-11.jpeg',
        status:1,
        featured:1
      },
      {
        id: 12,
        sku:"123214-132",
        category_id:3,
        subcategory_id:3,
        name: "Brandix Engine Block Z4",
        description: "Power Tools",
        regular_price: 573.00,
        sale_price: 452.00,
        image_path: 'product_image/product-12.jpeg',
        status:1,
        featured:1
      },
      {
        id: 13,
        sku:"123214-133",
        category_id:3,
        subcategory_id:3,
        name: "Brandix Clutch Discs Z175",
        description: "Power Tools",
        regular_price: 345.00,
        sale_price: 345.00,
        image_path: 'product_image/product-13.jpeg',
        status:1,
        featured:1
      },
      {
        id: 14,
        sku:"123214-134",
        category_id:3,
        subcategory_id:3,
        name: "Brandix Clutch Discs Z175",
        description: "Power Tools",
        regular_price: 345.00,
        sale_price: 345.00,
        image_path: 'product_image/product-8.jpeg',
        status:1,
        featured:1
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );

  db.reviews.bulkCreate(
    [
      {
        id: 1,
        product_id:1,
        user_id:2,
        rating: "3",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 2,
        product_id:1,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 3,
        product_id:2,
        user_id:2,
        rating: "3",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 4,
        product_id:3,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 5,
        product_id:4,
        user_id:2,
        rating: "3",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 6,
        product_id:5,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 7,
        product_id:6,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 8,
        product_id:7,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 9,
        product_id:8,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 10,
        product_id:9,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 11,
        product_id:10,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 12,
        product_id:11,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 13,
        product_id:12,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 14,
        product_id:13,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
      {
        id: 15,
        product_id:14,
        user_id:3,
        rating: "4",
        comments: "Power Tools",
        display_web: 1
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );
  db.banner.bulkCreate(
    [
      {
        id: 1,
        name: "30% OFF",
        type:0,
        description: "Installation of parts in the services of our partners.",
        images: 'banner_image/slide-1.jpeg',
        button_link:"#",
        short_text:"When buying parts with Installation",
        from_date:"2023-08-01",
        to_date:"2024-08-31",
        status:1
      },
      {
        id: 2,
        name: "Power Tools",
        type:1,
        description: "Power Tools",
        images: 'banner_image/banner1.jpeg',
        from_date:"2023-08-01",
        to_date:"2023-08-31",
        status:1
      },
      {
        id: 3,
        name: "Power Tools",
        type:1,
        description: "Power Tools",
        images: 'banner_image/banner2.jpeg',
        from_date:"2023-08-01",
        to_date:"2023-08-31",
        status:1
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );

  db.order.bulkCreate(
    [
      {
        id: 1,
        transactionid: "TXN132456",
        user_id: 3,
        order_number: "ORD00001",
        order_total: "300",
        order_amount: "300",
        sub_total: "250",
        tax_percent: "3",
        tax_amount: "3",
        payment_method: "PAYPAL",
        payment_status: 1,
        order_status: 1,
        status:1
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );

  db.order_details.bulkCreate(
    [
      {
        id: 1,
        order_id: 1,
        product_id: 1,
        product_name: "ORD00001",
        sku: "1234-123",
        product_price: "150",
        product_image: 'product_image/product-1.jpeg',
        quantity: 1,
      },
      {
        id: 2,
        order_id: 1,
        product_id: 2,
        product_name: "ORD00001",
        sku: "1234-124",
        product_price: "150",
        product_image: 'product_image/product-2.jpeg',
        quantity: 1,
      },
      {
        id: 3,
        order_id: 1,
        product_id: 3,
        product_name: "ORD00001",
        sku: "1234-125",
        product_price: "150",
        product_image: 'product_image/product-2.jpeg',
        quantity: 1,
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );

});
//
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to api service V1.",
  });
});

//routes
// Home
app.use("/home", require("./home.routes"));


module.exports = app;
