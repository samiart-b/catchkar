<template>
  <div class="min-h-screen bg-[#f9f9f9] rtl text-right font-sans">
    <header class="bg-[#1a1a1a] text-white py-6 text-center shadow-md">
      <h1 class="text-4xl font-bold">ارسال خودکار رزومه</h1>
    </header>

    <section class="p-6 bg-white shadow-md mt-8 rounded-xl">
      <div class="flex flex-col lg:flex-row gap-8 items-start">
        <!-- فرم -->
        <div class="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 class="text-2xl font-bold text-[#a30000] mb-4">فرم ارسال رزومه</h2>
          <div>
            <label class="block mb-1 text-sm font-medium">آدرس ایمیل شما</label>
            <input type="email" v-model="email" class="w-full border px-4 py-2 rounded" placeholder="your.email@gmail.com" />
          </div>
          <div class="mt-4">
            <label class="block mb-1 text-sm font-medium">آدرس‌های ایمیل اضافی</label>
            <textarea v-model="extraEmails" rows="3" class="w-full border px-4 py-2 rounded" placeholder="ایمیل‌ها را با , جدا کنید."></textarea>
          </div>
          <div class="mt-4">
            <label class="block mb-1 text-sm font-medium">متن ایمیل</label>
            <textarea v-model="message" rows="4" class="w-full border px-4 py-2 rounded" placeholder="پیام شما..."></textarea>
          </div>
          <div class="mt-4">
            <label class="block mb-1 text-sm font-medium">فایل رزومه</label>
            <input type="file" @change="handleFileUpload" class="w-full border px-4 py-2 rounded" />
          </div>
          <div class="text-center pt-4">
            <button @click="submitForm" class="bg-[#a30000] text-white px-6 py-2 rounded hover:bg-[#820000] transition hover:scale-105">
              ارسال رزومه
            </button>
          </div>
        </div>

        <!-- راهنمای استفاده -->
        <div class="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 class="text-2xl font-bold text-[#a30000] mb-4">چطور استفاده کنم؟</h2>
          <ol class="list-decimal space-y-3 text-gray-800 text-lg">
            <li>ایمیل خود را وارد کنید.</li>
            <li>متن پیام را بنویسید.</li>
            <li>رزومه را بارگذاری کنید (PDF).</li>
            <li>ارسال را بزنید.</li>
            <li>از Gmail یا Outlook استفاده کنید.</li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true

export default {
  name: 'AutoSend',
  data() {
    return {
      email: '',
      extraEmails: '',
      message: '',
      file: null
    }
  },
  mounted() {
    axios.get('http://localhost:8000/mailer/csrf/')
      .then(() => console.log('✅ CSRF token set'))
      .catch(err => console.error('CSRF Error:', err))
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0]
    },
    async submitForm() {
      if (!this.email || !this.message || !this.file) {
        alert("لطفاً تمام فیلدها را پر کنید.")
        return
      }

      const formData = new FormData()
      formData.append('email', this.email)
      formData.append('extra_emails', this.extraEmails)
      formData.append('message', this.message)
      formData.append('file', this.file)

      try {
        const res = await axios.post('http://localhost:8000/mailer/send/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log(res.data)
        alert('✅ رزومه با موفقیت ارسال شد!')
      } catch (err) {
        console.error('❌ ارسال ناموفق:', err)
        alert('مشکلی پیش آمد، لطفاً دوباره تلاش کنید.')
      }
    }
  }
}
</script>

<style scoped>
.rtl {
  direction: rtl;
}
</style>
