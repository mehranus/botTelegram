# Telegram FAQ Bot with Express.js

این یک ربات ساده تلگرام است که به کاربران امکان دسترسی به سوالات متداول (FAQ) را می‌دهد. ربات از Express.js و کتابخانه `node-telegram-bot-api` برای تعامل با Telegram Bot API استفاده می‌کند.

## ویژگی‌ها
- نمایش منوی سوالات متداول به کاربران.
- نمایش پاسخ‌های مربوط به سوالات انتخاب شده.
- خوش‌آمدگویی به کاربران جدید در گروه‌ها.
- پشتیبانی از دکمه‌های اینلاین برای تعامل بهتر.

## پیش‌نیازها
- [Node.js](https://nodejs.org/) (نسخه 14 یا بالاتر)
- [npm](https://www.npmjs.com/) (معمولاً همراه Node.js نصب می‌شود)
- یک ربات تلگرام از [BotFather](https://core.telegram.org/bots#botfather) و توکن آن.

## نصب و راه‌اندازی

1. **کلون کردن ریپوزیتوری**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2. نصب وابستگی‌ها

bash
Copy
npm install
3. تنظیم متغیرهای محیطی
یک فایل با نام .env در ریشه پروژه ایجاد کنید و مقادیر زیر را در آن قرار دهید:

env
Copy
TELEGRAM_TOKEN=your_telegram_bot_token
FAQ_JSON_URI=url_to_your_faq_json
PORT=3000

4. راه‌اندازی ربات

bash
Copy
npm start
سرور روی http://localhost:3000 اجرا می‌شود و ربات آماده استفاده است.

ساختار پروژه
app.js: فایل اصلی برنامه که شامل تنظیمات ربات و سرور Express است.

.env: فایل تنظیمات محیطی (توکن ربات و آدرس فایل JSON).

README.md: این فایل راهنما.

مثال فایل JSON
فایل JSON سوالات متداول باید به این شکل باشد:

json
Copy
{
    "question_1": "این پاسخ سوال اول است.",
    "question_2": "این پاسخ سوال دوم است.",
    "question_3": "این پاسخ سوال سوم است."
}
تست ربات
ربات را در تلگرام پیدا کنید و با ارسال /start یا /faq آن را تست کنید.

در گروه‌ها، کاربران جدید را اضافه کنید و پیام خوش‌آمدگویی را بررسی کنید.

مشارکت
اگر می‌خواهید در این پروژه مشارکت کنید، مراحل زیر را دنبال کنید:

ریپوزیتوری را فورک کنید.

یک برنچ جدید ایجاد کنید (git checkout -b feature/YourFeatureName).

تغییرات خود را کامیت کنید (git commit -m 'Add some feature').

تغییرات را به ریپوزیتوری خود پوش کنید (git push origin feature/YourFeatureName).

یک Pull Request ایجاد کنید.

لایسنس
این پروژه تحت لایسنس MIT منتشر شده است.