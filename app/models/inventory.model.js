module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define(
        "inventory",
        {
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bill_image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            bill_date: {
                type: DataTypes.DATE,
                allowNull: false
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

    Inventory.associate = function (models) {
        Inventory.belongsTo(models.products, {
            foreignKey: "product_id",
            as: "product",
        });
    };

    Inventory.findById = (id) =>
    Inventory.findOne({
            where: { id },
        });

    Inventory.deleteById = (id) =>
        Inventory.update({ trash: 1 }, {
            where: { id: id },
        });

    return Inventory;
};
