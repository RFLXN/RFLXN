import js from "@eslint/js";
import {defineConfig, globalIgnores} from "eslint/config";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import formattingConfig from "./eslint.formatting.ts";

export default defineConfig([
    globalIgnores(["dist", "eslint.config.ts", "eslint.formatting.ts"]),
    {
        "files": ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        "extends": [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactPlugin.configs.flat.recommended,
            reactPlugin.configs.flat["jsx-runtime"],
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite
        ],
        "languageOptions": {
            "ecmaVersion": 2020,
            "globals": globals.browser
        },
        "settings": {
            "react": {
                "version": "detect"
            }
        }
    },
    ...formattingConfig
]);
