<template>
  <header class="w-full bg-white shadow-sm border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
      <!-- Logo: left -->
      <div class="text-left">
        <h1 class="text-xl font-bold text-gray-900">CatchKar</h1>
      </div>

      <!-- Slogan: center -->
      <div class="text-center">
        <p class="text-gray-600 text-sm sm:text-base">موفقیت کاری شما افتخار ماست</p>
      </div>

      <!-- Actions: right -->
      <nav class="flex justify-end gap-2">
        <!-- وقتی لاگین نیست -->
        <template v-if="!loggedIn">
          <router-link
            to="/login"
            class="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            ورود
          </router-link>

          <router-link
            to="/register"
            class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 hover:shadow-sm transition"
          >
            ثبت‌نام
          </router-link>
        </template>

        <!-- وقتی لاگین هست -->
        <template v-else>
          <router-link
            to="/dashboard"
            class="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            داشبورد
          </router-link>

          <button
            @click="handleLogout"
            class="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-black"
          >
            خروج
          </button>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { isLoggedIn, logout as doLogout } from "@/services/auth";

const router = useRouter();
const loggedIn = computed(() => isLoggedIn());

function handleLogout() {
  doLogout();
  router.push("/login");
}
</script>
