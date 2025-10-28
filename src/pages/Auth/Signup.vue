<template>
  <div>
    <header class="site-header">
      <div class="container nav">
        <div>TicketApp</div>
        <div><RouterLink to="/">Home</RouterLink></div>
      </div>
    </header>

    <main class="container" style="padding: 40px 20px;">
      <div style="max-width: 640px; margin: 0 auto;">
        <div class="form-card" role="region" aria-labelledby="signup-heading">
          <h2 id="signup-heading">Create account</h2>
          <form @submit.prevent="onSubmit" novalidate>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                v-model="email"
                aria-describedby="err-email"
              />
              <div id="err-email" class="small-muted" role="alert">
                {{ errors.email || '' }}
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                v-model="password"
                aria-describedby="err-pass"
              />
              <div id="err-pass" class="small-muted" role="alert">
                {{ errors.password || '' }}
              </div>
            </div>

            <div style="display: flex; gap: 12px; align-items: center;">
              <button class="btn-primary" type="submit">Sign up</button>
              <RouterLink to="/auth/login">Have an account?</RouterLink>
            </div>
          </form>
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container">© TicketApp</div>
    </footer>

    <Toast
      v-if="toast"
      :type="toast.type"
      :message="toast.message"
      @close="toast = null"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { signupMock } from '@/utils/auth'
import Toast from '@/components/Toast.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const errors = ref({})
const toast = ref(null)

function validate() {
  const e = {}
  if (!email.value.trim()) e.email = 'Email is required.'
  if (!password.value) e.password = 'Password is required.'
  if (password.value && password.value.length < 6)
    e.password = 'Password must be at least 6 characters.'
  return e
}

async function onSubmit() {
  errors.value = {}
  const e = validate()
  if (Object.keys(e).length) {
    errors.value = e
    toast.value = { type: 'error', message: 'Please fix the highlighted fields.' }
    return
  }

  try {
    await signupMock(email.value.trim(), password.value)
    toast.value = { type: 'success', message: 'Account created — redirecting...' }
    setTimeout(() => router.push('/dashboard'), 700)
  } catch (err) {
    toast.value = { type: 'error', message: 'Failed to create account.' }
  }
}
</script>
