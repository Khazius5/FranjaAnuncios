const checkForNewAnnouncements = require("../Utils/checkForNewAnnouncements.js");
module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(`${client.user.username} - Esta Online`);
    client.user.setActivity({ name: "League of legends" });
    checkForNewAnnouncements(client);
    setInterval(() => {
      checkForNewAnnouncements(client);
    }, interval = 600000); // 10 minuto
    }};