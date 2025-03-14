// _user.model.ts
import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

// Define the attributes of the User model
export interface UserAttributes {
  id?: number; // Optional because it's auto-generated
  email: string;
  passwordHash: string;
  username?: string; // Add username if it's part of the model
  title: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes required to create a new User
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public username?: string; // Add username if it's part of the model
  public title!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the model initialization function
export default function(sequelize: Sequelize): typeof User {
  User.init(
    {
      email: { type: DataTypes.STRING, allowNull: false },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: true }, // Add username if it's part of the model
      title: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false }
    },
    {
      sequelize,
      modelName: 'User'
    }
  );

  return User;
}