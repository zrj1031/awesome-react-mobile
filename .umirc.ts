import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'awesome-react-mobile',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  base: process.env.NODE_ENV === 'production' ? '/awesome-react-mobile/' : '/',
  publicPath:
    process.env.NODE_ENV === 'production' ? '/awesome-react-mobile/' : '/',
  exportStatic: {},
});
