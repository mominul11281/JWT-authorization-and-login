import { DataTypes, Model } from 'sequelize';
import db from '../config/connection';

interface userAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export default class User extends Model<Partial<userAttributes>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}
User.init(
    {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: 'User',
        tableName: 'users',
    }
);
