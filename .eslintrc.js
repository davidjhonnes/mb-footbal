module.exports = {
  root: true,
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    '@react-native-community',
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    
  ],
  "plugins": [
    "react", 
    "react-hooks", 
    "@typescript-eslint", 
    "prettier"
  ],
  "rules": {
    "import/no-unresolved": "error"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
};
