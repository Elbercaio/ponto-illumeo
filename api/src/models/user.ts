import { Model, Sequelize, DataTypes } from 'sequelize';

export default class User extends Model {
  public id?: number;
  public name!: string;
  public code!: Date;
}
export const UserMap = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
      },
      code: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
    }
  );
  User.sync();
};
