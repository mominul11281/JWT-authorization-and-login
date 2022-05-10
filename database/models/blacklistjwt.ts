import { DataTypes, Model } from 'sequelize';
import db from '../config/connection';

interface blacklistJWTAttributes {
    id?: number;
    token: string;
}

export default class BlacklistJWT extends Model<
    Partial<blacklistJWTAttributes>
> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}
BlacklistJWT.init(
    {
        token: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: 'blacklistJWT',
        tableName: 'blacklistjwts',
    }
);
