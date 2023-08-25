module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "order",
        {
            transactionid: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            shipmentid: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            tracking_number: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            order_number: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            order_total: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            order_amount: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            sub_total: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            tax_percent: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            tax_amount: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            payment_method: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            payment_status: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            order_status: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: "0 - Initiated, 1 - Confirmed, 2 - Shipping In Progress, 3 - Out for Delivery, 4 - Delivered, 5- Refunded, 6 - Failed",
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            trash: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "0 - Not Deleted, 1 - Deleted",
                defaultValue: "0",
            },
            refund: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: "0",
                comment: "0 - NOTREFUNDED, 1 - REFUNDED",
            },
            refund_date: {
                type: DataTypes.STRING,
                allowNull: true
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

    Order.associate = function (models) {

        Order.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
        });

        Order.hasMany(models.order_details, {
            as: "order_details",
            foreignKey: "order_id",
        });

    };


    Order.findById = (data) =>
        Order.findOne({
            data
        });



    Order.deleteById = (id, user) =>
        Order.update({ trash: 1, updated_by: user }, {
            where: { id: id },
        });

    return Order;
};
