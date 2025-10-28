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
        <div class="form-card" role="region" aria-labelledby="login-heading">
          <h2 id="login-heading">Login</h2>
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
                {{ errors.email || "" }}
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
                {{ errors.password || "" }}
              </div>
            </div>

            <div style="display: flex; gap: 12px; align-items: center;">
              <button class="btn-primary" type="submit">Login</button>
              <RouterLink to="/auth/signup">Create account</RouterLink>
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
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { loginMock } from "@/utils/auth";
import Toast from "@/components/Toast.vue";

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const errors = reactive({});
const toast = ref(null);

onMounted(() => {
  const reason = route.query.reason;
  if (reason === "expired") {
    toast.value = {
      type: "error",
      message: "Your session has expired. Please log in again.",
    };
    router.replace({ path: route.path });
  }
});

function validate() {
  const e = {};
  if (!email.value.trim()) e.email = "Email is required.";
  if (!password.value) e.password = "Password is required.";
  return e;
}

async function onSubmit() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  const e = validate();
  if (Object.keys(e).length) {
    Object.assign(errors, e);
    toast.value = {
      type: "error",
      message: "Please fix the highlighted fields.",
    };
    return;
  }

  try {
    await loginMock(email.value.trim(), password.value);
    toast.value = {
      type: "success",
      message: "Login successful — redirecting...",
    };
    setTimeout(() => router.push("/dashboard"), 700);
  } catch {
    toast.value = { type: "error", message: "Invalid credentials." };
  }
}
</script>
