module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trash: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "0 - Not Deleted, 1 - Deleted",
        defaultValue: "0",
      },
    },
    {}
  );

  Role.findById = (id) =>
    Role.findOne({
      where: { id },
    });

  Role.deleteById = (id) =>
    Role.destroy({
      where: { id },
    });

  return Role;
};
