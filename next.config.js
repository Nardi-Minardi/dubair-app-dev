const { i18n } = require("./next-i18next.config");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules");
// import { API_URL } from "@/config";

const nextConfig = {
  experimental: {
    nextScriptWorkers: true,
  },
  reactStrictMode: true,
  cssModules: true,
  i18n,
  
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins([[withTM]], nextConfig);
