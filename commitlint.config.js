/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'scope-enum': [
      2,
      'always',
      [
        // Alesi-specific scopes
        'alesi',
        'satway',
        'workspace',
        // Upstream scopes (keep compatible)
        'cli',
        'gateway',
        'channels',
        'providers',
        'plugins',
        'docs',
        'ci',
        'deps',
      ],
    ],
  },
};