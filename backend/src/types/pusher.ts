const Pusher = require("pusher");

export const pusher = new Pusher({
  appId: "2130224",
  key: "69c8970bde4e379aba0d",
  secret: "515781d42ecbc4dc536f",
  cluster: "ap1",
  useTLS: true
});
