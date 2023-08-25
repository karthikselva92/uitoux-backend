module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define(
        "order_details",
        {
            order_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sku: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            product_price: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            product_image: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {}
    );


    OrderDetails.associate = function (models) {
        OrderDetails.belongsTo(models.products, {
          foreignKey: "product_id",
          as: "products",
        });

        OrderDetails.belongsTo(models.order, {
            foreignKey: "order_id",
            as: "order",
        });
    };


    OrderDetails.findById = (id) =>
        OrderDetails.findOne({
            where: { id },
        });

    OrderDetails.deleteById = (id, user) =>
        OrderDetails.update({ trash: 1, updated_by: user }, {
            where: { id: id },
        });

    return OrderDetails;
};
