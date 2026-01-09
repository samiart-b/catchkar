<template>
  <header class="w-full bg-white shadow-sm border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
      <!-- Logo: left -->
      <div class="text-left">
        <h1 class="text-xl font-bold text-gray-900">Mohajer</h1>
      </div>

      <!-- Slogan: center -->
      <div class="text-center">
        <p class="text-gray-600 text-sm sm:text-base">موفقیت کاری شما افتخار ماست</p>
      </div>

      <!-- Actions: right -->
      <nav class="flex justify-end gap-2">
        <router-link
          to="/dashboard"
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
      </nav>
    </div>
  </header>
</template>
