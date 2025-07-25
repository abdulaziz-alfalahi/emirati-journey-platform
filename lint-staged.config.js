module.exports = {
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{json,css,md}': [
    'prettier --write',
  ],
  '*.{ts,tsx}': [
    () => 'tsc --noEmit',
  ],
};