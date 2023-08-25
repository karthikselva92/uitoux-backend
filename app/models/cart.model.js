module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
        "cart",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_price: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    );

    Cart.associate = function (models) {
        Cart.belongsTo(models.products, {
            foreignKey: "product_id",
            as: "product",
        });
        Cart.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
        });
    };

    Cart.findById = (id) =>
        Cart.findOne({
            where: { id },
        });

    Cart.deleteById = (id) =>
        Cart.update({ trash: 1 }, {
            where: { id: id },
        });

    return Cart;
};
