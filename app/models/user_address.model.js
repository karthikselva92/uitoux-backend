module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define(
    "user_addresses",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "0 - Billing, 1 - Shipping",
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

  UserAddress.associate = function (models) {
    UserAddress.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  UserAddress.findById = (id) =>
    UserAddress.findOne({
      where: { id },
    });

  UserAddress.deleteById = (id) =>
    UserAddress.destroy({
      where: { id },
    });

  return UserAddress;
};
