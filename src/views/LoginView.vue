<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f9f9f9] p-6">
    <div class="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
      <h1 class="text-2xl font-bold text-gray-900">ورود به CatchKar</h1>
      <p class="text-sm text-gray-500">برای ورود، ایمیل و رمز عبور خود را وارد کنید.</p>

      <div v-if="error" class="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded">
        {{ error }}
      </div>

      <label class="block text-sm font-medium text-gray-700">ایمیل</label>
      <input
        v-model.trim="email"
        type="email"
        class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
        placeholder="example@gmail.com"
      />

      <label class="block text-sm font-medium text-gray-700">رمز عبور</label>
      <input
        v-model="password"
        type="password"
        class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
        placeholder="••••••••"
      />

      <button
        @click="login"
        :disabled="loading"
        class="w-full mt-2 px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 disabled:opacity-60"
      >
        {{ loading ? "در حال ورود..." : "ورود" }}
      </button>

      <div class="text-sm text-gray-600">
        حساب ندارید؟
        <router-link to="/register" class="text-indigo-700 hover:underline">ثبت‌نام</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { loginUser } from "@/services/authApi";

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

async function login() {
  error.value = "";
  if (!email.value || !password.value) {
    error.value = "لطفاً ایمیل و رمز عبور را وارد کنید.";
    return;
  }

  loading.value = true;

  try {
    const data = await loginUser({ email: email.value, password: password.value });

    if (!data?.access) {
      throw new Error("پاسخ سرور نامعتبر است (توکن دریافت نشد).");
    }

    localStorage.setItem("auth_token", data.access);
    localStorage.setItem("auth_email", email.value);

    const redirectTo = route.query.redirect || "/dashboard";
    router.push(String(redirectTo));
  } catch (e) {
    const msg =
      e?.response?.data?.detail ||
      e?.response?.data?.message ||
      e?.message ||
      "خطا در ورود. دوباره تلاش کنید.";
    error.value = msg;
  } finally {
    loading.value = false;
  }
}
</script>

