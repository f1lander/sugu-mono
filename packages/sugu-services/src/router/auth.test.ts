import cloneDeep from 'lodash/cloneDeep';
import { Request } from 'express';
import { getTokenFromHeaders } from './auth';

describe('auth.ts', () => {
  describe('getTokenFromHeaders', () => {
    const req = {
      headers: {
        authorization: '',
      },
    };
    test('should return the bearer token if available', () => {
      const request = cloneDeep(req);
      request.headers.authorization = 'Bearer This_should_be_the_token';

      const token = getTokenFromHeaders(request as Request);

      expect(token).toBe('This_should_be_the_token');
    });
    test('should return null when the bearer token is not available', () => {
      const request = cloneDeep(req);
      request.headers.authorization = '';

      const token = getTokenFromHeaders(request as Request);

      expect(token).toBeNull();
    });
  });
});
