module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define(
      "banner",
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: "1",
          comment: "0 - Slider, 1 - Card",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        button_link: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        short_text: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        images: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        from_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        to_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
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
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW
        },
        updated_by: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW
        },
      },
      {}
    );
  
    Banner.findById = (id) =>
        Banner.findOne({
        where: { id },
      });
  
    Banner.deleteById = (id, user) =>
      Banner.update({trash:1, updated_by:user},{
        where: { id: id },
    });
  
    return Banner;
  };
  