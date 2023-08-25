module.exports = (sequelize, DataTypes) => {
    const Brands = sequelize.define(
        "brands",
        {
            company_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            logo: {
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
        }
    );

    Brands.findById = (id) =>
        Brands.findOne({
            where: { id },
        });

    Brands.deleteById = (id, user) =>
        Brands.update({ trash: 1, updated_by: user }, {
            where: { id: id },
        });

    return Brands;
};
