
export const AUTH_PROVIDERS = {
  GOOGLE: 'google',
  GITHUB: 'github',
  LOCAL: 'local',
  JWT: 'jwt'
} as const;

export type AuthProviderType = keyof typeof AUTH_PROVIDERS;

// Other constants related to authentication can be added here
export const AUTH_MESSAGES = {
  NO_USER: (provider: string) => `No user from ${provider}`,
};
