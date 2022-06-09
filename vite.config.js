import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


import vitePluginImp from 'vite-plugin-imp';
import { getThemeVariables } from 'antd/dist/theme';

export default defineConfig({
  plugins: [
    // ...
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }), react()
  ],
  resolve: {
    alias: [
      // { find: '@', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
      { find: /^~/, replacement: '' },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
                   'primary-color': '#4ca23a',
                   'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                  },
        // modifyVars: getThemeVariables({
        //   "primary-color":"black"
        //   // compact: true,
        // }),
        javascriptEnabled: true,
      },
    },
  },
  server:{https:true}
});
