<template>
  <section class="bg-[#f9f9f6] py-20 px-6">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold text-gray-900">✨ معجزه‌ی اقدام</h2>
      <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
        داستان واقعی افرادی که با یک تصمیم مسیر شغلی‌شون رو متحول کردن. تو هم می‌تونی!
      </p>
    </div>

    <div class="relative max-w-6xl mx-auto">
      <!-- فلش‌های بیرونی -->
      <button @click="prevSlide" class="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100">
        <span class="text-2xl text-gray-600">&#10094;</span>
      </button>
      <button @click="nextSlide" class="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100">
        <span class="text-2xl text-gray-600">&#10095;</span>
      </button>

      <!-- اسلایدها -->
      <div ref="slider" class="flex gap-6 overflow-x-auto scroll-smooth snap-x">
        <div
          v-for="(story, index) in stories"
          :key="index"
          class="min-w-[320px] snap-start bg-white rounded-2xl p-6 shadow-md text-right flex flex-col justify-between border border-gray-200"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-bold text-gray-800">
              <div class="leading-tight text-center">
                <p>{{ story.name.split(' ')[0] }}</p>
                <p>{{ story.name.split(' ')[1] }}</p>
              </div>
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-900">{{ story.name }}</h3>
              <p class="text-sm text-gray-600">{{ story.title }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-700 italic mb-4">"{{ story.story }}"</p>
          <button class="text-sm text-gray-800 font-medium hover:underline">
            مشاهده داستان کامل →
          </button>
        </div>
      </div>
    </div>

    <div class="mt-16 text-center">
      <button class="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-full transition">
        ✍️ ارسال داستان من
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const slider = ref(null)

const stories = [
  {
    name: 'ناهید جمالی',
    title: 'Data Analyst در هامبورگ',
    story: 'از کجا شروع کنم رو نمی‌دونستم، ولی با نقشه راه جلو رفتم و موفق شدم.',
  },
  {
    name: 'علی فلاحی',
    title: 'Full-Stack Developer در مونیخ',
    story: 'رزومه‌مو فرستادم و تو دو هفته دعوت به مصاحبه گرفتم!',
  },
  {
    name: 'سارا حسینی',
    title: 'UX Designer در برلین',
    story: 'بعد از سه ماه تلاش با این پلتفرم، تونستم موقعیت مورد علاقم رو پیدا کنم.',
  },
]

function nextSlide() {
  slider.value.scrollLeft += 340
}

function prevSlide() {
  slider.value.scrollLeft -= 340
}
</script>