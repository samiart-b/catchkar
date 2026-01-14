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
    <!-- محتوا RTL می‌مونه ولی کانتینر LTR است تا scrollLeft درست کار کند -->
    <div class="inline-flex gap-6 min-w-max" dir="rtl">
      <div
        v-for="(tool, index) in duplicatedTools"
        :key="index"
        class="bg-[#f9f9f9] rounded-2xl p-6 shadow-md transition-all duration-300 flex flex-col items-center text-center w-80 shrink-0"
        :class="tool.active ? 'hover:scale-[1.03] cursor-pointer' : 'opacity-70 cursor-not-allowed'"
        @click="handleToolClick(tool)"
      >
        <!-- Icon -->
        <div class="w-20 h-20 mb-4 flex items-center justify-center text-4xl">
          {{ tool.icon }}
        </div>

        <!-- Title + Badge -->
        <div class="flex items-center justify-center gap-2 mb-2 w-full">
          <h3 class="line-clamp-2 text-xl font-bold leading-snug">
            {{ tool.title }}
          </h3>

          <span
            v-if="tool.active"
            class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full whitespace-nowrap"
          >
            فعال
          </span>
          <span
            v-else
            class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full whitespace-nowrap"
          >
            به‌زودی
          </span>
        </div>

        <!-- Desc -->
        <p class="text-sm text-gray-600 mb-4 clamp-2">
          {{ tool.desc }}
        </p>

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

    <!-- ✅ Coming soon modal -->
    <div
      v-if="showComingSoon"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      @click.self="closeModal"
      dir="rtl"
    >
      <div class="bg-white rounded-2xl p-6 w-full max-w-md text-center space-y-3 modal-pop">
        <h3 class="text-xl font-bold text-gray-900">به‌زودی ✨</h3>
        <p class="text-gray-700 leading-relaxed text-sm whitespace-pre-line break-words text-center max-w-xs sm:max-w-md mx-auto">
          ابزار «{{ comingSoonTitle }}» در حال توسعه است و به‌زودی فعال می‌شود.
        </p>
        <button
          class="mt-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
          @click="closeModal"
        >
          باشه
        </button>
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

// ✅ سرعت اسکرول (هر چی بزرگ‌تر = سریع‌تر)
const SPEED = 0.3;

const showComingSoon = ref(false);
const comingSoonTitle = ref("");

const tools = [
  { icon: "🗺️", title: "نقشه راه", desc: "از کجا شروع کنم؟", route: "/tools/roadmap", active: false },
  { icon: "🤖", title: "بات هوشمند", desc: "سوال داری؟ با بات ما صحبت کن و جواب بگیر.", route: "/tools/bot", active: false },
  { icon: "🎓", title: "آموزش‌های کاربردی", desc: "یاد بگیر چطور برای کار در آلمان آماده بشی.", route: "/tools/education", active: false },
  { icon: "📄", title: "تحلیل رزومه", desc: "رزومه‌ات رو آپلود کن و تحلیل تخصصی بگیر.", route: "/tools/cv-review", active: false },
  { icon: "🧭", title: "جایگاه کاری مناسب تو", desc: "با پاسخ به چند سوال بفهم کجا مناسبته.", route: "/tools/job-match", active: false },
  { icon: "📨", title: "ارسال خودکار رزومه", desc: "رزومه‌ات رو بفرست به هزاران کارفرما با یک کلیک.", route: "/tools/auto-send", active: true },
];

const duplicatedTools = computed(() => [...tools, ...tools]);

function handleToolClick(tool) {
  if (!tool.active) {
    comingSoonTitle.value = tool.title;
    showComingSoon.value = true;
    return;
  }
  router.push(tool.route);
}

function closeModal() {
  showComingSoon.value = false;
  comingSoonTitle.value = "";
}

function onKeyDown(e) {
  if (e.key === "Escape" && showComingSoon.value) closeModal();
}

const scrollStep = () => {
  const el = scrollContainer.value;
  if (!el || isPaused) return;

  el.scrollLeft += SPEED;

  // loop
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

onMounted(() => {
  const el = scrollContainer.value;
  if (el) el.scrollLeft = 0;

  window.addEventListener("keydown", onKeyDown);
  scrollStep();
});

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  window.removeEventListener("keydown", onKeyDown);
});
</script>

<style scoped>
/* ✅ 2-line clamp (بدون نیاز به Tailwind plugin) */
.clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  white-space: normal;
}

/* ✅ مودال: انیمیشن نرم */
@keyframes fadeScaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
.modal-pop {
  animation: fadeScaleIn 180ms ease-out;
}

section::-webkit-scrollbar {
  height: 6px;
}
section::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 4px;
}
</style>
