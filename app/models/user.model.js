module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
          args: true,
          msg: "Mobile Number already exist",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already exist",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "1",
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

  User.associate = function (models) {
    User.belongsTo(models.role, {
      foreignKey: "role_id",
      as: "role",
    });
  };

  User.findById = (id) =>
    User.findOne({
      where: { id },
    });

  User.deleteById = (id) =>
    User.destroy({
      where: { id },
    });

  return User;
};
