<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div class="bg-white border border-gray-200 rounded-2xl shadow p-8 max-w-lg w-full text-center">
      <h1 class="text-2xl font-bold text-gray-900">صفحه پیدا نشد</h1>
      <p class="text-gray-600 mt-2">لینکی که زدی وجود نداره یا هنوز ساخته نشده.</p>
      <router-link
        to="/"
        class="inline-block mt-6 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
      >
        بازگشت به خانه
      </router-link>
    </div>
  </div>
</template>
