module.exports = {
  apps: [
    {
      name: "Parking Managment System",
      script: "./app.js",
      instances: "1",
      exec_mode: "cluster",
      watch: true,
      watch_delay: 1000,
      ignore_watch: ["node_modules"],
      env: {
        PORT: "8080",
      },
    },
  ],
};
