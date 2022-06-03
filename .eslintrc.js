module.exports = {
  plugins  : ['@reflektor/react'],
  extends  : ['plugin:@reflektor/react/next'],
  settings : {
    'import/resolver' : {
      node : {
        extensions : ['.js', '.jsx']
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
