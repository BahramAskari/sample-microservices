🇮🇷 Sample NodeJS MicroServices

**فنّاوری ها و توانمندی های به کار گرفته شده در این پروژه**

✔ **NodeJS** (RESTful API)

✔ **ExpressJS**

✔ **Mysql DataBase**

✔ **Sequelize** (Mysql ORM)

✔ **TypeScrpit**

✔ **ES6**

✔ **MicroServices**

✔ **GIT**

**توانمندی های دیگری که در این نمونه استفاده نشده است**

💡 **Redis**

💡 **WebSocket** (SocketIO)

💡 **Mongoose** as MongoDB ORM (Level: Intermediate)

💡 **Message Broker** (Redis as Broker)

💡 **Linux Ubuntu Server** (for projects deployment)

تعداد مسیر ها و جداول دیتابیس و عملیاتی که انجام می شود، در حقیقت بسیار بیشتر از آن چیزی است که در این ریپازیتوری قرار گرفته است؛ دلیل آن هم این است که اینجا صرفاً برای نمایش به عنوان نمونه کار مورد استفاده قرار می گیرد تا طبق بخشی از توانمندی ها و نحوه کدنویسی در پروژه های این ریپازیتوری، بتوان بهتر قضاوت نمود

#### 🔻 دستور اجرا و کار با سرویس ها

[فایلِ جداول دیتابیس](github_resume.sql) را در پایگاه داده خود import نمایید. توجّه داشته باشید که نام دیتابیس، باید مطابق با نام تعیین شده در فایل .env باشد که تنظیم خواهید نمود

برای تست و بررسی سرویس ها، [فایل postman](Github%20Resume.postman-v2.1_collection.json) قرار داده شده را می توانید در نرم افزار postman خودتان import نمایید و از آن استفاده کنید.

در هر میکروسرویس، در پوشه ای با نامِ config، فایلی با نام env.example. وجود دارد. ضمن تغییر نام آن به env. متغیر مقادیر را با توضیحات زیر می توانید تغییر دهید.

▶ PORT=4014 (پورتی که سرویس روی آن اجرا می شود)

▶ DB_USERNAME=root (نام کاربری ورود به پایگاه داده)

▶ DB_PASSWORD= (کلمه عبور ورود به پایگاه داده)

▶ DB_DATABASE=github_resume (نام پایگاه داده)

▶ DB_HOST=localhost

▶ DB_DRIVER=mysql

##### در فایل متغیر های محیطیِ سرویسِ Api Gateway چند مورد دیگر وجود دارد:

**موارد مربوط به توکن دسترسی برای JWT**

▶ JWT_ACCESS_TOKEN_SECRET=w1jrf031r2jf82hgf8g42h

▶ JWT_REFRESH_TOKEN_SECRET=uGIW423D2REY6%4Zds(6Dn

▶ JWT_FORGET_PASSWORD_TOKEN_SECRET=w1jrf031r2jf82hgf8g42h

▶ JWT_ACCESS_TOKEN_EXPIRES_IN=50400000

▶ JWT_REFRESH_TOKEN_EXPIRES_IN=15552000000

**نشانی هر میکرو سرویس**

▶ SERVICE_CATEGORIZATION_URL=http://localhost:4010

▶ SERVICE_LOCATION_URL=http://localhost:4012

▶ SERVICE_USERMANAGEMENT_URL=http://localhost:4014

میکرو سرویس ها به طور مستقیم در ارتباط با کاربر نیستند؛ بلکه باید کاربران درخواست هایشان را به Api Gateway بفرستند و آنگاه، از آنجا درخواست به سرویس های مورد نظر می رسد و عملیات صورت می پذیرد.
