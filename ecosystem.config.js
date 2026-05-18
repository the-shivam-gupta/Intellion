    module.exports = {
      apps: [
        {
          name: 'IntellionUI2', // Replace with your application's name
          exec_mode: 'cluster',
          instances: 'max', // Or a specific number of instances
          script: './node_modules/nuxt/bin/nuxt.js',
          args: 'start',
          env_production: {
            NODE_ENV: 'production'
          }
        }
      ]
    };
