import stylistic from "@stylistic/eslint-plugin";
import type { Linter } from "eslint";

export const formattingRules = {
  "@stylistic/array-bracket-newline": [ "error", "consistent" ],
  "@stylistic/array-bracket-spacing": [ "error", "always" ],
  "@stylistic/array-element-newline": [ "error", "consistent" ],
  "@stylistic/arrow-parens": [ "error", "as-needed" ],
  "@stylistic/arrow-spacing": [ "error", { "before": true, "after": true } ],
  "@stylistic/block-spacing": [ "error", "always" ],
  "@stylistic/brace-style": [ "error", "1tbs", { "allowSingleLine": true } ],
  "@stylistic/comma-dangle": [ "error", "never" ],
  "@stylistic/comma-spacing": [ "error", { "before": false, "after": true } ],
  "@stylistic/comma-style": [ "error", "last" ],
  "@stylistic/computed-property-spacing": [
    "error",
    "never",
    { "enforceForClassMembers": true }
  ],
  "@stylistic/curly-newline": [ "error", { "multiline": true } ],
  "@stylistic/dot-location": [ "error", "property" ],
  "@stylistic/eol-last": [ "error", "always" ],
  "@stylistic/function-call-argument-newline": [ "error", "consistent" ],
  "@stylistic/function-call-spacing": [ "error", "never" ],
  "@stylistic/function-paren-newline": [ "error", "multiline-arguments" ],
  "@stylistic/generator-star-spacing": [ "error", { "before": true, "after": false } ],
  "@stylistic/implicit-arrow-linebreak": [ "error", "beside" ],
  "@stylistic/indent": [
    "error",
    2,
    {
      "flatTernaryExpressions": true,
      "ignoreComments": true
    }
  ],
  "@stylistic/indent-binary-ops": [ "error", 2 ],
  "@stylistic/jsx-child-element-spacing": [ "off" ],
  "@stylistic/jsx-closing-bracket-location": [ "error", "line-aligned" ],
  "@stylistic/jsx-closing-tag-location": [ "error", "line-aligned" ],
  "@stylistic/jsx-curly-brace-presence": [ "error", "never" ],
  "@stylistic/jsx-curly-newline": [ "error", "consistent" ],
  "@stylistic/jsx-curly-spacing": [ "error", { "when": "never", "children": true } ],
  "@stylistic/jsx-equals-spacing": [ "error", "never" ],
  "@stylistic/jsx-first-prop-new-line": [ "error", "multiline" ],
  "@stylistic/jsx-function-call-newline": [ "error", "multiline" ],
  "@stylistic/jsx-indent-props": [ "error", 2 ],
  "@stylistic/jsx-max-props-per-line": [ "off" ],
  "@stylistic/jsx-newline": [ "off" ],
  "@stylistic/jsx-one-expression-per-line": [ "off" ],
  "@stylistic/jsx-pascal-case": [ "error", { "allowNamespace": true } ],
  "@stylistic/jsx-quotes": [ "error", "prefer-double" ],
  "@stylistic/jsx-self-closing-comp": [ "error" ],
  "@stylistic/jsx-tag-spacing": [
    "error",
    {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never",
      "beforeClosing": "never"
    }
  ],
  "@stylistic/jsx-wrap-multilines": [ "off" ],
  "@stylistic/key-spacing": [ "error", { "beforeColon": false, "afterColon": true } ],
  "@stylistic/keyword-spacing": [ "error", { "before": true, "after": true } ],
  "@stylistic/line-comment-position": [ "off" ],
  "@stylistic/linebreak-style": [ "error", "unix" ],
  "@stylistic/lines-around-comment": [ "off" ],
  "@stylistic/lines-between-class-members": [
    "error",
    "always",
    { "exceptAfterOverload": true }
  ],
  "@stylistic/max-len": [
    "error",
    {
      "code": 120,
      "tabWidth": 4,
      "ignoreComments": true,
      "ignoreTrailingComments": true,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true
    }
  ],
  "@stylistic/max-statements-per-line": [
    "error",
    {
      "max": 1,
      "ignoredNodes": [
        "BreakStatement"
      ]
    }
  ],
  "@stylistic/member-delimiter-style": [
    "error",
    {
      "multiline": {
        "delimiter": "comma",
        "requireLast": false
      },
      "singleline": {
        "delimiter": "comma",
        "requireLast": false
      }
    }
  ],
  "@stylistic/multiline-comment-style": [ "off" ],
  "@stylistic/multiline-ternary": [ "error", "always-multiline", { "ignoreJSX": true } ],
  "@stylistic/new-parens": [ "error", "never" ],
  "@stylistic/newline-per-chained-call": [ "error", { "ignoreChainWithDepth": 2 } ],
  "@stylistic/no-confusing-arrow": [ "error" ],
  "@stylistic/no-extra-parens": [ "off" ],
  "@stylistic/no-extra-semi": [ "error" ],
  "@stylistic/no-floating-decimal": [ "error" ],
  "@stylistic/no-mixed-operators": [
    "error",
    {
      "groups": [
        [ "+", "-", "*", "/", "%", "**" ],
        [ "&", "|", "^", "~", "<<", ">>", ">>>" ],
        [ "==", "!=", "===", "!==", ">", ">=", "<", "<=" ],
        [ "&&", "||" ],
        [ "in", "instanceof" ]
      ],
      "allowSamePrecedence": true
    }
  ],
  "@stylistic/no-mixed-spaces-and-tabs": [ "error" ],
  "@stylistic/no-multi-spaces": [
    "error",
    {
      "ignoreEOLComments": true,
      "includeTabs": true
    }
  ],
  "@stylistic/no-multiple-empty-lines": [ "error", { "max": 2 } ],
  "@stylistic/no-tabs": [ "error" ],
  "@stylistic/no-trailing-spaces": [
    "error",
    {
      "skipBlankLines": false,
      "ignoreComments": false
    }
  ],
  "@stylistic/no-whitespace-before-property": [ "error" ],
  "@stylistic/nonblock-statement-body-position": [ "error", "beside" ],
  "@stylistic/object-curly-newline": [ "error", { "multiline": true } ] ,
  "@stylistic/object-curly-spacing": [ "error", "always" ],
  "@stylistic/object-property-newline": [ "error", { "allowAllPropertiesOnSameLine": true } ],
  "@stylistic/one-var-declaration-per-line": [ "error", "initializations" ],
  "@stylistic/operator-linebreak": [ "error", "before" ],
  "@stylistic/padded-blocks": [ "error", "never" ],
  "@stylistic/padding-line-between-statements": [ "off" ],
  "@stylistic/quote-props": [ "error", "consistent-as-needed" ],
  "@stylistic/quotes": [ "error", "double" ],
  "@stylistic/rest-spread-spacing": [ "error", "never" ],
  "@stylistic/semi": [ "error", "always" ],
  "@stylistic/semi-spacing": [ "error", { "before": false, "after": true } ],
  "@stylistic/semi-style": [ "error", "last" ],
  "@stylistic/space-before-blocks": [ "error", "always" ],
  "@stylistic/space-before-function-paren": [
    "error",
    {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always",
      "catch": "always"
    }
    ],
  "@stylistic/space-in-parens": [ "error", "never" ],
  "@stylistic/space-infix-ops": [ "error" ],
  "@stylistic/space-unary-ops": [ "error" ],
  "@stylistic/spaced-comment": [ "error", "always" ],
  "@stylistic/switch-colon-spacing": [ "error", { "before": false, "after": true } ],
  "@stylistic/template-curly-spacing": [ "error", "never" ],
  "@stylistic/template-tag-spacing": [ "error", "never" ],
  "@stylistic/type-annotation-spacing": [ "error", { "before": false, "after": true } ],
  "@stylistic/type-generic-spacing": [ "error" ],
  "@stylistic/type-named-tuple-spacing": [ "error" ],
  "@stylistic/wrap-iife": [ "error", "inside", { "functionPrototypeMethods": true } ],
  "@stylistic/wrap-regex": [ "off" ],
  "@stylistic/yield-star-spacing": [ "off" ]
} satisfies Linter.RulesRecord;

export const formattingConfig = [
  stylistic.configs["disable-legacy"],
  {
    "plugins": {
      "@stylistic": stylistic
    },
    "rules": formattingRules
  }
] satisfies Linter.Config[];

export default formattingConfig;
