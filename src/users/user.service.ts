import bcrypt from 'bcryptjs';
import db from '../../src/_helpers/db';
import { UserAttributes, UserCreationAttributes } from './user.model'; // Import User model types
import { Model } from 'sequelize';

// Define the structure of the parameters for creating/updating a user
interface UserParams {
  email?: string;
  password?: string;
  passwordHash?: string; // Add this
  username?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

// Define the service methods
const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

export default userService;

// Get all users
async function getAll(): Promise<UserAttributes[]> {
  const users = await db.User.findAll();
  return users.map(user => user.get({ plain: true })); // Extract plain objects
}

// Get a user by ID
async function getById(id: number): Promise<UserAttributes> {
  const user = await getUser(id);
  return user.get({ plain: true }); // Extract plain object
}

// Create a new user
async function create(params: UserParams): Promise<void> {
  // Check if email is already registered
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw `Email "${params.email}" is already registered`;
  }

  // Hash the password before saving
  const passwordHash = await bcrypt.hash(params.password!, 10);

  // Create the user
  await db.User.create({
    ...params,
    passwordHash // Add passwordHash here
  } as UserCreationAttributes);
}

// Update a user
async function update(id: number, params: UserParams): Promise<void> {
  const user = await getUser(id);

  // Check if username is already taken (if username is being changed)
  const usernameChanged = params.username && user.get('username') !== params.username;
  if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
    throw `Username "${params.username}" is already taken`;
  }

  // Hash the password if it's being updated
  if (params.password) {
    params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  // Update the user
  await user.update(params);
}

// Delete a user
async function _delete(id: number): Promise<void> {
  const user = await getUser(id);
  await user.destroy();
}

// Helper function to get a user by ID
async function getUser(id: number): Promise<Model<UserAttributes, UserCreationAttributes>> {
  const user = await db.User.findByPk(id);
  if (!user) throw 'User not found';
  return user;
}