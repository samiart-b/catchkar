<template>
  <section
    ref="scrollContainer"
    class="relative overflow-x-auto whitespace-nowrap px-6 py-20 bg-black"
    dir="ltr"
    @mouseenter="pauseScroll"
    @mouseleave="resumeScroll"
    @touchstart="pauseScroll"
    @touchend="resumeScroll"
  >
    <!-- محتوا RTL می‌مونه ولی کانتینر اسکرول LTR است تا scrollLeft درست کار کند -->
    <div class="inline-flex gap-6 min-w-max" dir="rtl">
      <div
        v-for="(tool, index) in duplicatedTools"
        :key="index"
        class="bg-[#f9f9f9] border border-[#e0e0e0] rounded-2xl p-6 shadow-md transition-all duration-300 flex flex-col items-center text-center w-80 shrink-0"
        :class="tool.active ? 'hover:scale-[1.03] cursor-pointer' : 'opacity-70 cursor-not-allowed'"
        @click="handleClick(tool)"
      >
        <div class="w-20 h-20 mb-4 flex items-center justify-center text-4xl">
          {{ tool.icon }}
        </div>

        <div class="flex items-center gap-2 mb-2">
          <h3 class="text-xl font-bold text-gray-900">{{ tool.title }}</h3>

          <span
            v-if="tool.active"
            class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
          >
            فعال
          </span>
          <span
            v-else
            class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
          >
            به‌زودی
          </span>
        </div>

        <p class="text-sm text-gray-600 mb-4">{{ tool.desc }}</p>

        <!-- CTA -->
        <div
          v-if="tool.active"
          class="bg-black text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-800 transition duration-200 flex items-center"
        >
          <span class="ml-2">برو ببین</span>
          <span>→</span>
        </div>

        <div
          v-else
          class="bg-gray-300 text-gray-700 rounded-full px-5 py-2 text-sm font-medium flex items-center"
        >
          <span class="ml-2">به‌زودی</span>
          <span>⏳</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const scrollContainer = ref(null);

let animationFrame = null;
let isPaused = false;

const tools = [
  { icon: "🗺️", title: "نقشه راه", desc: "از کجا شروع کنم؟", route: "/tools/roadmap", active: false },
  { icon: "🤖", title: "بات هوشمند", desc: "سوال داری؟ با بات ما صحبت کن و جواب بگیر.", route: "/tools/bot", active: false },
  { icon: "🎓", title: "آموزش‌های کاربردی", desc: "یاد بگیر چطور برای کار در آلمان آماده بشی.", route: "/tools/education", active: false },
  { icon: "📄", title: "تحلیل رزومه", desc: "رزومه‌ات رو آپلود کن و تحلیل تخصصی بگیر.", route: "/tools/cv-review", active: false },
  { icon: "🧭", title: "چه جایگاهی مناسب توست؟", desc: "با پاسخ به چند سوال بفهم کجا مناسبته.", route: "/tools/job-match", active: false },
  { icon: "📨", title: "ارسال خودکار رزومه", desc: "رزومه‌ات رو بفرست به هزاران کارفرما با یک کلیک.", route: "/tools/auto-send", active: true },
];

// برای اسکرول بی‌نهایت
const duplicatedTools = computed(() => [...tools, ...tools]);

const scrollStep = () => {
  const el = scrollContainer.value;
  if (!el || isPaused) return;

  // حرکت یکنواخت (در LTR قابل پیش‌بینی است)
  el.scrollLeft += 0.3;

  // وقتی به نیمه رسیدیم، برگردیم به ابتدا (loop)
  if (el.scrollLeft >= el.scrollWidth / 2) {
    el.scrollLeft -= el.scrollWidth / 2;
  }

  animationFrame = requestAnimationFrame(scrollStep);
};

const pauseScroll = () => {
  isPaused = true;
};

const resumeScroll = () => {
  if (!isPaused) return;
  isPaused = false;
  scrollStep();
};

const handleClick = (tool) => {
  if (!tool.active) return; // ابزارهای غیرفعال کلیک نشن
  router.push(tool.route);  // Guard اگر لاگین نباشی می‌فرستت /login
};

onMounted(() => {
  const el = scrollContainer.value;
  if (el) el.scrollLeft = 0; // شروع ثابت و جلوگیری از پرش
  scrollStep();
});

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
});
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
