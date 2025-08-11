import { UserEntity, UserEntityProps } from './user.entity';
import { compareSync } from 'bcryptjs';

describe('UserEntity', () => {
  const props: UserEntityProps = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  it('should be defined', () => {
    const user = new UserEntity(props);
    expect(user).toBeDefined();
  });

  it('should create a user with a new ID if none is provided', () => {
    const user = new UserEntity(props);
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe('string');
  });

  it('should create a user with the provided ID', () => {
    const customId = 'b8f2c3e1-d4a5-4b8c-9c7d-8e6f5a3b2d1c';
    const user = new UserEntity({ ...props, id: customId });
    expect(user.id).toBe(customId);
  });

  it('should create a user with correct name, email, and password', () => {
    const user = new UserEntity(props);
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password123');
  });

  it('should have a creation and update date set by default', () => {
    const user = new UserEntity(props);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should correctly hash a password', () => {
    const hashedPassword = UserEntity.hashPassword('plainPassword');
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe('plainPassword');
    expect(compareSync('plainPassword', hashedPassword)).toBe(true);
  });

  it('should compare a plain password with the stored hash correctly', () => {
    const user = new UserEntity(props);
    user.password = UserEntity.hashPassword('password123');
    expect(user.comparePassword('password123')).toBe(true);
    expect(user.comparePassword('wrongpassword')).toBe(false);
  });
});
