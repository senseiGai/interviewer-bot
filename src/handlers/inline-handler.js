const { getCorrectAnswer } = require("../utils/getCorrectAnswer.js");

module.exports = (bot) => {
  bot.on("callback_query:data", async (ctx) => {
    const callbackData = JSON.parse(ctx.callbackQuery.data);

    if (!callbackData.type.includes("option")) {
      const answer = getCorrectAnswer(
        callbackData.type,
        callbackData.questionId
      );
      await ctx.reply(answer, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
      });
      await ctx.answerCallbackQuery();
      return;
    }

    if (callbackData.isCorrect) {
      await ctx.reply("Correct  ✅");
      await ctx.answerCallbackQuery();
      return;
    }

    const answer = getCorrectAnswer(
      callbackData.type.split("-")[0],
      callbackData.questionId
    );
    await ctx.reply(`Not correct  ❌  Correct answer: ${answer}`);
    await ctx.answerCallbackQuery();
  });
};
