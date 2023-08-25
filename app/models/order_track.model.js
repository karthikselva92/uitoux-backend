module.exports = (sequelize, DataTypes) => {
    const OrderTrack = sequelize.define(
        "order_track",
        {
            order_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    );

    OrderTrack.associate = function (models) {
        OrderTrack.belongsTo(models.order, {
            foreignKey: "order_id",
            as: "order",
        });
    };

    OrderTrack.findById = (id) =>
        OrderTrack.findOne({
            where: { id },
        });

    OrderTrack.deleteById = (id) =>
        OrderTrack.update({ trash: 1 }, {
            where: { id: id },
        });

    return OrderTrack;
};
