import { RoleEnum } from '../enum';
import { Schema } from 'ajv';

export type JwtToken = {
  ip: string;
  user_id: number;
  scope: string;
  session: string;
  groups: string[];
  client_id: string;
  client_secret?: string;
  roles: RoleEnum[];
};

export const JwtTokenSchema: Schema = {
  type: 'object',
  properties: {
    ip: { type: 'string' },
    user_id: { type: 'string' },
    scope: { type: 'string' },
    session: { type: 'string' },
    groups: { type: 'array', items: { type: 'string' } },
    client_id: { type: 'string' },
    roles: { type: 'array', items: { type: 'string' } },
    iat: { type: 'number' },
    exp: { type: 'number' },
  },
  required: ['ip', 'user_id', 'scope', 'session', 'groups', 'client_id', 'roles'],
  additionalProperties: false,
};
