/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   redirects: async () => {
//     return [
//       {
//         source: '/',
//         destination: '/login',
//         permanent: true,
//       },
//     ];
//   },
//   headers: async () => {
//     return [
//       {
//         source: '/login',
//         headers: [
//           {
//             key: "Cross-Origin-Embedder-Policy",
//             value: "unsafe-none",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;

const { i18n } = require("./next-i18next.config");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules");

const nextConfig = {
  experimental: {
    nextScriptWorkers: true,
  },
  reactStrictMode: true,
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
        source: '/login',
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins([[withTM]], nextConfig);

// const withTM = require("next-transpile-modules")([
// 	"@pusher/push-notifications-web",
// ]);

// module.exports = withTM();
