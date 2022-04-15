module.exports = {
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "jest", "import"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.eslint.json", "tsconfig.json"],
  },
  ignorePatterns: ["babel.config.js"],
  rules: {
    "linebreak-style": "off",
    "no-var": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/default-param-last": ["error"],
    "import/extensions": "never" | "always" | "ignorePackages",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["off"],
  },
};
