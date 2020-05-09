import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('Create User', () => {
  it('should create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    const user = await createUserService.execute({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('gustavo');
  });

  it('should not create user if email is already being used by another user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    await createUserService.execute({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    expect(
      createUserService.execute({
        email: 'gustavo@email.com',
        name: 'Ana ',
        password: '789012',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});