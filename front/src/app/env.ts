const ENV_KEYS = [
  'BASE_API_URL',
]

type EnvConfig = {
  [K in typeof ENV_KEYS[number]]: string;
};

const getEnvVariables = (): EnvConfig => {
  return ENV_KEYS.reduce((acc, key) => {
    const value = process.env[`REACT_APP_${key}`];
    acc[key] = value || '';
    return acc;
  }, {} as EnvConfig);
}

const env = getEnvVariables();

export const {
  BASE_API_URL,
} = env;