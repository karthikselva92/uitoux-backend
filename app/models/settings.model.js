module.exports = (sequelize, DataTypes) => {
    const Settings = sequelize.define(
        "settings",
        {
            company_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            logo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            working_hours: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone_no: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            languages: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            default_language: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            default_currency: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            powered_by: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            designed_by: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            free_shipping: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            support: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            discount_percent: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            social_medias: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        }
    );

    Settings.findById = (id) =>
        Settings.findOne({
            where: { id },
        });

    Settings.deleteById = (id, user) =>
        Settings.update({ trash: 1, updated_by: user }, {
            where: { id: id },
        });

    return Settings;
};
