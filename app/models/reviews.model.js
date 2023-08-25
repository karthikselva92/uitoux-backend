module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    "reviews",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "1 to 5",
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "1 to 5",
      },
      display_web: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "0 - Don't Show, 1 - Show",
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

  Reviews.associate = function (models) {
    Reviews.belongsTo(models.products, {
      foreignKey: "product_id",
      as: "product",
    });
  };

  Reviews.associate = function (models) {
    Reviews.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  Reviews.findById = (id) =>
    Reviews.findOne({
      where: { id },
    });

  Reviews.deleteById = (id) =>
    Reviews.destroy({
      where: { id },
    });

  return Reviews;
};
