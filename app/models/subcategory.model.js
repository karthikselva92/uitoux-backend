module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define(
    "sub_category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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

  SubCategory.associate = function (models) {
    SubCategory.belongsTo(models.category, {
      foreignKey: "category_id",
      as: "category",
    });
  };

  SubCategory.findById = (id) =>
    SubCategory.findOne({
      where: { id },
    });

  SubCategory.deleteById = (id) =>
    SubCategory.destroy({
      where: { id },
    });

  return SubCategory;
};
