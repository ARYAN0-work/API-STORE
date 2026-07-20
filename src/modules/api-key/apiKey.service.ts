import crypto from 'crypto';
import { ApiKey } from './apiKey.model';

export const generateApiKey = async (userId: string, apiId: string) => {
  const apiKey = crypto.randomBytes(32).toString('hex');

  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

  const newApiKey = await ApiKey.create({ user: userId, api: apiId, keyHash });

  return {
    apiKey,
    id: newApiKey._id,
  };
};
