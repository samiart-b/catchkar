<template>
  <div class="min-h-screen bg-[#f9f9f9]">
    <!-- هدر ثابت -->
    <header class="bg-[#1a1a1a] text-white py-3 px-6 flex justify-between items-center shadow-md">
      <div class="text-xl font-bold">JobFinder</div>
      <nav class="flex gap-6 text-sm relative">
        <div v-for="item in navItems" :key="item.title" class="relative group">
          <!-- لینک فقط برای خانه -->
          <router-link
            v-if="item.title === 'خانه'"
            to="/"
            class="hover:text-gray-300"
          >
            {{ item.title }}
          </router-link>

          <!-- سایر آیتم‌ها دکمه باشن -->
          <button v-else class="hover:text-gray-300">{{ item.title }}</button>

          <!-- ابزارها: منوی لینک‌دار -->
          <div
            v-if="item.title === 'ابزار ها'"
            class="absolute top-full mt-2 right-0 bg-white text-black shadow-lg rounded-lg p-4 w-48 hidden group-hover:block z-50"
          >
            <ul class="space-y-2">
              <li v-for="tool in tools" :key="tool.title">
                <router-link :to="tool.link" class="hover:text-indigo-600">{{ tool.title }}</router-link>
              </li>
            </ul>
          </div>

          <!-- سایر آیتم‌ها: نمایش توضیح -->
          <div
            v-else
            class="absolute top-full mt-2 right-0 bg-white text-black shadow-lg rounded-lg p-3 text-xs w-48 hidden group-hover:block z-50"
          >
            {{ item.description }}
          </div>
        </div>
      </nav>
    </header>

    <!-- محتوای داشبورد -->
    <div class="max-w-5xl mx-auto p-6 space-y-6">
      <!-- خوش‌آمدگویی -->
      <div class="bg-white rounded-xl shadow p-6">
        <h1 class="text-2xl font-bold text-gray-900">سلام {{ user?.email || 'کاربر عزیز' }} 👋</h1>
        <p class="text-gray-500">خوش اومدی به پنل کاربری خودت</p>
        <button
          @click="showUpgrade = true"
          class="mt-4 px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
        >
          ارتقاء حساب
        </button>
      </div>

      <!-- آمار حساب -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-gray-100 p-4 rounded shadow text-center">
          <p class="text-sm text-gray-500">رزومه‌های ارسال‌شده</p>
          <p class="text-2xl font-bold text-gray-800">12</p>
        </div>
        <div class="bg-gray-100 p-4 rounded shadow text-center">
          <p class="text-sm text-gray-500">فرصت‌های بررسی‌شده</p>
          <p class="text-2xl font-bold text-gray-800">34</p>
        </div>
        <div class="bg-gray-100 p-4 rounded shadow text-center">
          <p class="text-sm text-gray-500">درصد تکمیل پروفایل</p>
          <p class="text-2xl font-bold text-gray-800">76%</p>
        </div>
      </div>
    </div>

    <!-- مودال ارتقاء حساب -->
    <div
      v-if="showUpgrade"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl space-y-4">
        <h2 class="text-xl font-bold text-gray-800">پلن‌های اشتراک</h2>
        <ul class="space-y-3">
          <li v-for="plan in plans" :key="plan.name" class="border p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold">{{ plan.name }}</h3>
                <p class="text-sm text-gray-500">{{ plan.description }}</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold">{{ plan.price }}</p>
                <button class="mt-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  انتخاب این پلن
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div class="text-right">
          <button @click="showUpgrade = false" class="text-sm text-gray-500 hover:underline">بستن</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({ email: 'shirinsp77@gmail.com' })
const showUpgrade = ref(false)

const navItems = [
  { title: 'خانه', description: 'بازگشت به صفحه اصلی' },
  { title: 'ابزار ها', description: '' },
  { title: 'داستان دوستان', description: 'تجربه‌های موفق کاربران' },
  { title: 'نقشه ی راه', description: 'مسیری برای رسیدن به شغل مورد نظر' },
  { title: 'اقای ربات', description: 'دستیار شغلی هوشمند شما' },
  { title: 'سوالات رایج', description: 'پاسخ به سوالات پرتکرار کاربران' }
]

const tools = [
  { title: 'رزومه‌ساز', link: '/tools/resume' },
  { title: 'ارسال خودکار', link: '/tools/auto-send' },
  { title: 'تحلیل موقعیت‌ها', link: '/tools/insight' },
]

const plans = [
  { name: 'Free', description: 'دسترسی محدود به ابزارها', price: '۰ تومان' },
  { name: 'Pro', description: 'ارسال خودکار، تحلیل فرصت‌ها و پشتیبانی ویژه', price: '۹۹ هزار تومان' },
  { name: 'Ultimate', description: 'همه امکانات Pro + بررسی رزومه توسط کارشناس', price: '۱۹۹ هزار تومان' }
]
</script>

<style scoped>
nav .group:hover > div {
  display: block;
}
</style>
