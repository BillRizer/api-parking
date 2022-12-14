export enum EEnvironments {
  DEV = 'DEV',
  PROD = 'PROD',
}
export const getEnvironment = (): EEnvironments => {
  if (!process.env.TYPE_ENV) {
    throw new Error('Environment needs to be defined');
  }
  const env = EEnvironments[process.env.TYPE_ENV.toUpperCase()];
  if (!env) {
    throw new Error('Environment need be DEV or PROD (no case sensitivity)');
  }
  return env;
};
