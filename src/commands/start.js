const { Keyboard } = require("grammy");
const javascript = require("../handlers/topic");

module.exports = (bot) => {
  const startKeyboard = new Keyboard()
    .text("JavaScript")
    .text("React")
    .resized();
  bot.command("start", async (ctx) => {
    await ctx.reply(
      "Heyyy, I am an interview bot 🤖 \nI am here to help with preparing for any interview!"
    );

    await ctx.reply("Here are some topics below 👇", {
      reply_markup: startKeyboard,
    });
  });
};
