<template>
  <section
    ref="scrollContainer"
    class="relative overflow-x-auto whitespace-nowrap px-6 py-20 bg-black"
    dir="rtl"
    @mouseenter="pauseScroll"
    @mouseleave="resumeScroll"
    @touchstart="pauseScroll"
    @touchend="resumeScroll"
  >
    <div class="inline-flex gap-6 min-w-max">
      <div
        v-for="(tool, index) in duplicatedTools"
        :key="index"
        class="bg-[#f9f9f9] border border-[#e0e0e0] rounded-2xl p-6 shadow-md hover:scale-[1.03] transition-all duration-300 flex flex-col items-center text-center w-80 shrink-0 cursor-pointer"
        @click="goTo(tool.route)"
      >
        <div class="w-20 h-20 mb-4 flex items-center justify-center text-4xl">
          {{ tool.icon }}
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ tool.title }}</h3>
        <p class="text-sm text-gray-600 mb-4">{{ tool.desc }}</p>
        <div
          class="bg-black text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-800 transition duration-200 flex items-center"
        >
          <span class="ml-2">برو ببین</span>
          <span>→</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrollContainer = ref(null)
let animationFrame = null
let isPaused = false

const tools = [
  { icon: '🗺️', title: 'نقشه راه', desc: 'از کجا شروع کنم؟', route: '/tools/roadmap' },
  { icon: '🤖', title: 'بات هوشمند', desc: 'سوال داری؟ با بات ما صحبت کن و جواب بگیر.', route: '/tools/bot' },
  { icon: '🎓', title: 'آموزش‌های کاربردی', desc: 'یاد بگیر چطور برای کار در آلمان آماده بشی.', route: '/tools/education' },
  { icon: '📄', title: 'تحلیل رزومه', desc: 'رزومه‌ات رو آپلود کن و تحلیل تخصصی بگیر.', route: '/tools/cv-review' },
  { icon: '🧭', title: 'چه جایگاهی مناسب توست؟', desc: 'با پاسخ به چند سوال بفهم کجا مناسبته.', route: '/tools/job-match' },
  { icon: '📨', title: 'ارسال خودکار رزومه', desc: 'رزومه‌ات رو بفرست به هزاران کارفرما با یک کلیک.', route: '/tools/auto-send' },
]

// Duplicate list to achieve "infinite" scroll
const duplicatedTools = computed(() => [...tools, ...tools])

const scrollStep = () => {
  const el = scrollContainer.value
  if (!el || isPaused) return

  el.scrollLeft += 1
  if (el.scrollLeft >= el.scrollWidth / 2) {
    el.scrollLeft -= el.scrollWidth / 2
  }

  animationFrame = requestAnimationFrame(scrollStep)
}

const pauseScroll = () => {
  isPaused = true
}

const resumeScroll = () => {
  isPaused = false
  scrollStep()
}

const goTo = (route) => {
  router.push(route)
}

onMounted(scrollStep)

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
section::-webkit-scrollbar {
  height: 6px;
}
section::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 4px;
}
</style>
