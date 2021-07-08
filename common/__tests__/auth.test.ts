import { IUserItem } from '../../services/profile/interfaces';
import { IAdmin } from '../libs/auth';
import AuthService from '../libs/auth';

describe('Unit testing for auth lib', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('generate access and refresh jwt tokens', async () => {
    const user: IUserItem = {
      ID: '123123',
      avatar: {
        hash: null,
        small: null,
        medium: null,
        large: null
      },
      email: 'test@test.com',
      username: 'username',
      jwt_version: 1,
      user_type: ['mentor', 'mentee'],
      mobile_number: '9998889998',
      is_active: true,
      email_verified: true,
      first_name: 'Shikhar',
      last_name: 'Sharma',
      mobile_number_verified: true
    };

    const [accessToken, refreshToken] = await AuthService.generateTokens(user);
    expect(typeof accessToken).toBe('string');
    expect(typeof refreshToken).toBe('string');

    const accessJWTPayload = await AuthService.parseAccessToken(accessToken);
    const refreshJWTPayload = await AuthService.parseRefreshToken(refreshToken);

    if (accessJWTPayload === false) {
      return;
    }

    expect(accessJWTPayload.token_type).toBe('accessToken');
    expect(accessJWTPayload.user.id).toBe(user.ID);
    expect(accessJWTPayload.user.email).toBe(user.email);
    expect(accessJWTPayload.user.mobile).toBe(user.mobile_number);
    expect(accessJWTPayload.user.jwt_version).toBe(user.jwt_version);
    expect(accessJWTPayload.user.user_type).toStrictEqual(user.user_type);
    expect(refreshJWTPayload.token_type).toBe('refreshToken');
    expect(refreshJWTPayload.user.id).toBe(user.ID);
    expect(refreshJWTPayload.user.email).toBe(user.email);
    expect(refreshJWTPayload.user.mobile).toBe(user.mobile_number);
    expect(refreshJWTPayload.user.jwt_version).toBe(user.jwt_version);
    expect(refreshJWTPayload.user.user_type).toStrictEqual(user.user_type);
  });

  test("get user's ID from access token", async () => {
    const user: IUserItem = {
      ID: '999111',
      avatar: {
        hash: null,
        small: null,
        medium: null,
        large: null
      },
      email: 'test@test.com',
      username: 'username',
      jwt_version: 1,
      user_type: ['mentor', 'mentee'],
      mobile_number: '9998889998',
      is_active: true,
      email_verified: true,
      first_name: 'Shikhar',
      last_name: 'Sharma',
      mobile_number_verified: true
    };

    const [accessToken] = await AuthService.generateTokens(user);

    const ID = await AuthService.getUserIdFromToken(accessToken);

    expect(ID).toBe(user.ID);
  });

  test("get admin's roles from access token", async () => {
    const admin: IAdmin = {
      username: 'username22',
      password: 'password22',
      created_at: Math.floor(Date.now() / 1000),
      updated_at: Math.floor(Date.now() / 1000),
      last_login: Math.floor(Date.now() / 1000),
      roles: ['super_admin'],
      name: 'Super Admin',
      is_active: true,
      jwt_version: 1
    };

    const [accessToken] = await AuthService.generateAdminTokens(admin);

    const roles = await AuthService.getAdminRolesFromToken(accessToken);
    expect(roles).toStrictEqual(admin.roles);
  });

  test('return null trying to get user ID from invalid token', async () => {
    const ID = await AuthService.getUserIdFromToken('HAHA');
    expect(ID).toBe(null);
  });

  test('return null trying to parse invalid access token', async () => {
    const payload = await AuthService.parseAccessToken('HAHA');
    expect(payload).toBe(null);
  });

  test('return null trying to parse invalid refresh token', async () => {
    const payload = await AuthService.parseRefreshToken('HAHA');
    expect(payload).toBe(null);
  });
});
