const { InlineKeyboard } = require("grammy");
const { getRandomQuestion } = require("../utils/getRandomQuestion.js");

module.exports = (bot) => {
  bot.hears(["JavaScript", "React"], async (ctx) => {
    const topic = ctx.message.text.toLowerCase();
    const question = getRandomQuestion(topic);

    let topicInlineKeyboard;

    if (question.hasOptions && Array.isArray(question.options)) {
      // if arrow function is in one line, automatically the result of this function will return.
      const buttonRows = question.options.map((option) => [
        InlineKeyboard.text(
          option.text,
          JSON.stringify({
            type: `${topic}-option`,
            isCorrect: option.isCorrect,
            questionId: question.id,
          })
        ),
      ]);

      topicInlineKeyboard = InlineKeyboard.from(buttonRows);
    } else {
      topicInlineKeyboard = new InlineKeyboard().text(
        "Get Answer",
        JSON.stringify({
          type: topic,
          questionId: question.id,
        })
      );
    }

    await ctx.reply(
      `Just a second, I am preparing a question about ${ctx.message.text}`
    );

    await ctx.reply(question.text, {
      reply_markup: topicInlineKeyboard,
    });
  });
};
