const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
require('dotenv').config()


// تنظیمات
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN";
const FAQ_JSON_URI = process.env.FAQ_JSON_URI || "URL_TO_YOUR_FAQ_JSON";
const PORT = process.env.PORT || 3000;

// ایجاد ربات تلگرام
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// لود کردن FAQs
let FAQS = {};
const loadFAQs = async () => {
    try {
        const response = await axios.get(FAQ_JSON_URI);
        FAQS = response.data;
        console.log("FAQs loaded successfully!");
    } catch (error) {
        console.error("Failed to load FAQs:", error);
    }
};

// نمایش منوی FAQ
const showFAQMenu = (chatId) => {
    const keyboard = Object.keys(FAQS).map((key) => [{ text: key.replace(/_/g, " ").toUpperCase(), callback_data: key }]);
    const replyMarkup = { inline_keyboard: keyboard };
    bot.sendMessage(chatId, "یکی از سوالات متداول را انتخاب کنید:", { reply_markup: replyMarkup });
};

// نمایش پاسخ FAQ
const showFAQAnswer = (chatId, questionKey) => {
    const answer = FAQS[questionKey] || "پاسخی برای سوال شما پیدا نشد.";
    const keyboard = [[{ text: "بازگشت به منو", callback_data: "back_to_menu" }]];
    const replyMarkup = { inline_keyboard: keyboard };
    bot.sendMessage(chatId, answer, { reply_markup: replyMarkup });
};

// مدیریت پیام‌ها و رویدادها
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === "/start" || msg.text === "/faq") {
        showFAQMenu(chatId);
    }
});

bot.on("callback_query", (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === "back_to_menu") {
        showFAQMenu(chatId);
    } else {
        showFAQAnswer(chatId, data);
    }
});

// خوش‌آمدگویی به کاربران جدید
bot.on("new_chat_members", (msg) => {
    const chatId = msg.chat.id;
    const newMembers = msg.new_chat_members;

    newMembers.forEach((member) => {
        const welcomeMessage = `سلام @${member.username}، خوش اومدی! با استفاده از این ربات می‌تونی به سوال‌های متداول دسترسی داشته باشی:\n@nasnetfaqbot`;
        const keyboard = [[{ text: "شروع چت با ربات سوالات متداول", url: "https://t.me/nasnetfaqbot" }]];
        const replyMarkup = { inline_keyboard: keyboard };
        bot.sendMessage(chatId, welcomeMessage, { reply_markup: replyMarkup });
    });
});

// راه‌اندازی سرور Express
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("FAQ Bot is running!");
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await loadFAQs(); // لود کردن FAQs هنگام راه‌اندازی سرور
});