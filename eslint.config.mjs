import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier"; // Adicionando configuração do Prettier
import prettierPlugin from "eslint-plugin-prettier"; // Plugin para ESLint

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier, // Desabilita regras conflitantes do ESLint
  {
    plugins: { prettier: prettierPlugin }, // Ativa o plugin do Prettier
    rules: {
      "prettier/prettier": "warn", // Configura Prettier para avisos em vez de erros
    },
  },
];
