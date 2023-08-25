module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "products",
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      regular_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      sale_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "0 - INACTIVE, 1 - ACTIVE",
      },
      featured: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "0 - notfeatured, 1 - featured",
        defaultValue: "0",
      },
      trash: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "0 - Not Deleted, 1 - Deleted",
        defaultValue: "0",
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {}
  );

  Products.associate = function (models) {
    Products.belongsTo(models.category, {
      foreignKey: "category_id",
      as: "category",
    });
    Products.belongsTo(models.sub_category, {
      foreignKey: "subcategory_id",
      as: "sub_category",
    });
  };

  Products.findById = (id) =>
    Products.findOne({
      where: { id },
    });

  Products.deleteById = (id) =>
    Products.destroy({
      where: { id },
    });

  return Products;
};
