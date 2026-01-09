<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <form @submit.prevent="handleRegister" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-semibold text-center">ثبت‌نام کاربر</h2>
      
      <input v-model="email" type="email" placeholder="ایمیل" class="input" required />
      <input v-model="password" type="password" placeholder="رمز عبور" class="input" required />
      <input v-model="confirmPassword" type="password" placeholder="تکرار رمز عبور" class="input" required />

      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

      <button type="submit" class="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        ثبت‌نام
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RegisterUser } from '@/services/RegisterUser'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'رمز عبور و تکرار آن یکسان نیستند'
    return
  }

  try {
    const user = await RegisterUser({
      email: email.value,
      password: password.value
    })

    console.log('ثبت‌نام موفق:', user)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'مشکلی در ثبت‌نام پیش آمد'
    console.error(err)
  }
}
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400;
}
</style>
