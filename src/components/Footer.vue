<template>
  <!-- کامپوننت فوتِر با طراحی مدرن، زیبا و واکنش‌گرا -->
  <!-- رنگ پس‌زمینه: خاکستری تیره (bg-gray-800)، رنگ متن پیش‌فرض: خاکستری روشن (text-gray-400) برای ایجاد تضاد مناسب و خوانایی -->
  <!-- می‌توانید این رنگ‌ها را بر اساس طرح رنگ سایت خود تغییر دهید -->
  <footer class="bg-gray-800 text-gray-400">
    <!-- ظرف اصلی برای محدود کردن عرض فوتِر و ایجاد فاصله داخلی -->
    <!-- max-w-7xl: حداکثر عرض معین (مطابق عرض محتوای سایت), mx-auto: وسط‌چین کردن ظرف, px-4 (و sm:px-6/lg:px-8): فاصله از کناره‌ها در نمایش موبایل و دسکتاپ, py-8: فاصله عمودی بالا/پایین -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- چیدمان سه‌ستونه: در موبایل یک ستون (grid-cols-1) و در دسکتاپ سه ستون (md:grid-cols-3) -->
      <!-- gap-8: ایجاد فاصله مناسب بین ستون‌ها در هر دو حالت -->
      <!-- items-start: تراز کردن محتوای هر ستون از بالا (برای اطمینان از شروع هر ستون از بالا) -->
      <!-- توجه: در اینجا متن ستون‌ها در همه حالت‌ها چپ‌چین است. در صورت نیاز، می‌توانید برای موبایل با کلاس‌هایی مانند text-center ستون‌ها را وسط‌چین کنید -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <!-- ستون ۱: نام پروژه و شعار -->
        <div>
          <!-- نام پروژه با فونت بولد و سایز بزرگ‌تر برای تأکید -->
          <!-- text-xl: اندازه فونت بزرگ‌تر برای نام, font-bold: ضخیم برای تأکید, text-white: رنگ سفید برای تمایز از متن‌های دیگر -->
          <h2 class="text-xl font-bold text-white">CatchKar</h2>
          <!-- شعار پروژه با فونت کوچک‌تر و ایتالیک برای جلوه ظریف‌تر -->
          <!-- mt-2: فاصله کوچک بالای شعار, text-sm: اندازه فونت کوچک, italic: متن کج (ایتالیک) جهت ایجاد تمایز بصری -->
          <p class="mt-2 text-sm italic">Your slogan or tagline goes here.</p>
          <!-- نکته: در صورت داشتن لوگوی گرافیکی برای پروژه، می‌توانید از عنصر <img> یا <svg> برای نمایش لوگو به جای متن نام استفاده کنید -->
        </div>
        <!-- ستون ۲: لینک‌های ناوبری سایت -->
        <!-- در نمایش دسکتاپ، این ستون با یک خط عمودی از ستون قبل جدا شده است (md:border-l) و دارای فاصله داخلی چپ (md:pl-6) برای فاصله متن از خط -->
        <div class="md:border-l md:border-gray-700 md:pl-6">
          <nav>
            <!-- لیست لینک‌ها -->
            <!-- space-y-2: فاصله عمودی بین لینک‌ها, mt-2: فاصله بالا برای جداسازی از تیتر بالا (در صورت وجود) -->
            <ul class="mt-2 space-y-2">
              <li>
                <!-- لینک‌ها با رنگ پیش‌فرض خاکستری روشن (به ارث رسیده از text-gray-400 والد) نمایش داده می‌شوند -->
                <!-- hover:underline: خط زیر متن هنگام هاور برای تاکید روی قابلیت کلیک, hover:text-white: تغییر رنگ متن به سفید هنگام هاور -->
                <!-- transition-colors و duration-200: برای انیمیشن نرم تغییر رنگ در هنگام هاور -->
                <a href="#" class="hover:underline hover:text-white transition-colors duration-200">About</a>
              </li>
              <li>
                <a href="#" class="hover:underline hover:text-white transition-colors duration-200">FAQ</a>
              </li>
              <li>
                <a href="#" class="hover:underline hover:text-white transition-colors duration-200">Contact</a>
              </li>
              <li>
                <a href="#" class="hover:underline hover:text-white transition-colors duration-200">Tools</a>
              </li>
            </ul>
          </nav>
          <!-- نکته: در صورت استفاده از Vue Router، می‌توانید به جای تگ <a> از <router-link> برای لینک‌های داخلی استفاده کنید -->
          <!-- همچنین می‌توان برای هر لینک آیکونی کوچک (مثلاً با استفاده از کتابخانه آیکون مانند Heroicons) در کنار متن قرار داد تا جلوه بهتری ایجاد شود -->
        </div>
        <!-- ستون ۳: توضیح وضعیت MVP پروژه -->
        <!-- این ستون نیز در دسکتاپ با خط عمودی جدا شده (md:border-l) و فاصله داخلی چپ (md:pl-6) مشابه ستون قبل دارد -->
        <div class="md:border-l md:border-gray-700 md:pl-6">
          <!-- متن توضیحی وضعیت پروژه -->
          <!-- text-sm: اندازه متن کوچک برای متن توضیحات, leading-relaxed: افزایش ارتفاع خط برای خوانایی بهتر متن‌های چند خطی -->
          <p class="text-sm leading-relaxed">
            This project is currently in its <strong>MVP</strong> (Minimum Viable Product) stage. Features are limited and subject to change as we continue to improve the platform.
          </p>
        </div>
      </div>
      <!-- بخش پایینی فوتِر: خط افقی جداکننده و متن کپی‌رایت -->
      <!-- mt-8: فاصله بالا از بخش محتوای اصلی فوتِر, border-t: خط بالا برای جدا کردن کپی‌رایت از بقیه محتوا, border-gray-700: رنگ خاکستری تیره برای خط (ظریف و نه چندان پررنگ), pt-4: مقداری فاصله بالای متن کپی‌رایت از خط -->
      <div class="mt-8 pt-4 border-t border-gray-700">
        <!-- متن کپی‌رایت -->
        <!-- text-xs: اندازه فونت بسیار کوچک برای متن کپی‌رایت, text-center: وسط‌چین کردن متن کپی‌رایت -->
        <p class="text-xs text-center">
          © 2024 CatchKar. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
  // این بخش می‌تواند خالی باشد چون برای فوتِر ایستاتیک نیازی به منطق جاوااسکریپت نیست
  // (در صورت نیاز به افزودن داده‌ها یا متدها، می‌توانید آنها را اینجا تعریف کنید)
</script>

<style scoped>
  /* اکثر استایل‌ها توسط کلاس‌های Utility از Tailwind CSS اعمال شده‌اند */
  /* در صورت نیاز به استایل سفارشی بیشتر برای این کامپوننت، می‌توانید آن‌ها را در این بخش اضافه کنید */
</style>
