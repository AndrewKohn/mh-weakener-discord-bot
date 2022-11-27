module.exports = {
  name: 'pong',
  description: 'This is a pong command',
  execute(message, args) {
    message.channel.send('PING');
  },
};
