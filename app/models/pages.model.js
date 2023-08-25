module.exports = (sequelize, DataTypes) => {
    const Pages = sequelize.define(
        "pages",
        {
            page_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT('long'),
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

    Pages.findById = (id) =>
        Pages.findOne({
            where: { id },
        });

    Pages.deleteById = (id, user) =>
        Pages.update({ trash: 1, updated_by: user }, {
            where: { id: id },
        });

    return Pages;
};
