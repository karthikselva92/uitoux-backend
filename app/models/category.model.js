module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
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

  Category.findById = (id) =>
    Category.findOne({
      where: { id },
    });

  Category.deleteById = (id) =>
    Category.destroy({
      where: { id },
    });

  return Category;
};
