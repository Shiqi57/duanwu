module.exports = {
  plugins : ['@reflektor/react'],
  extends : ['plugin:@reflektor/react/next'],
  rules   : {
    'jsx-a11y/alt-text'                  : 0,
    'max-len'                            : ['error', { 'code' : 120 }],
    'react/jsx-max-props-per-line'       : [1, { 'maximum' : 1, 'when' : 'multiline' }],
    'react/jsx-closing-bracket-location' : [2, 'tag-aligned']
  },
  settings : {
    'import/resolver' : {
      node : {
        extensions : ['.js', '.jsx', '.ts', '.tsx']
      },
      alias : {
        map : [
          ['@', './src'],
          ['@/*', './src/*']
        ],
      },
    },
  },
};
