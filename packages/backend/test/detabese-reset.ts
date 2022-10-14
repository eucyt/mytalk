/*

NOTE: this must be used in TEST ONLY.

 */

import { execSync } from 'child_process';

export const resetDatabase = () => {
  execSync('dotenv -e .env.test -- prisma migrate reset --force');
};
