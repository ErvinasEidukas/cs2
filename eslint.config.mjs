import globals from "globals";
import js from "@eslint/js";


export default [
    js.configs.recommended,

    {
        files: ["js/*.js"],
        languageOptions: {
            globals: {
                ...globals.browser
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
            "semi": [
                "error",
                "never"
            ],
            "quotes": [
                "error",
                "double"
            ],
            "operator-linebreak": [
                "warn",
                "after",
                {
                    "overrides": {
                        "=": "after"
                    }
                }
            ],
            "no-unexpected-multiline": "warn",
            "implicit-arrow-linebreak": [
                "warn",
                "beside"
            ],
            "max-len": [
                "warn",
                {
                    "code": 100
                }
            ]
        }
    }
];