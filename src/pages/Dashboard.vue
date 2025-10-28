<template>
  <div>
    <header class="site-header">
      <div class="container nav">
        <div><strong>TicketApp</strong></div>

        <button 
          class="hamburger" 
          aria-label="Toggle navigation"
          @click="menuOpen = !menuOpen"
        >
          ☰
        </button>

        <nav :class="['nav-links', menuOpen ? 'open' : '']">
          <RouterLink to="/tickets" @click="menuOpen = false">Tickets</RouterLink>
          <button class="btn-ghost" @click="handleLogout">Logout</button>
        </nav>
      </div>
    </header>

    <main class="container" style="padding:40px 20px">
      <h2>Dashboard</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-top:16px">
        <div class="card"><strong>Total</strong><div style="font-size:24px;margin-top:8px">{{ total }}</div></div>
        <div class="card"><strong>Open</strong><div style="font-size:24px;margin-top:8px">{{ open }}</div></div>
        <div class="card"><strong>Resolved</strong><div style="font-size:24px;margin-top:8px">{{ resolved }}</div></div>
      </div>

      <div style="margin-top:24px">
        <RouterLink to="/tickets" class="btn">Manage Tickets</RouterLink>
      </div>
    </main>

    <footer class="site-footer"><div class="container">© TicketApp</div></footer>

    <Toast v-if="toast" :type="toast.type" :message="toast.message" @close="toast = null"/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { loadTickets } from "@/utils/storage";
import { logout } from "@/utils/auth";
import Toast from "@/components/Toast.vue";

const menuOpen = ref(false);
const tickets = ref([]);
const toast = ref(null);
const router = useRouter();

onMounted(() => {
  try {
    tickets.value = loadTickets();
  } catch {
    toast.value = { type: "error", message: "Failed to load tickets. Please retry." };
  }
});

const total = computed(() => tickets.value.length);
const open = computed(() => tickets.value.filter(t => t.status === "open").length);
const resolved = computed(() => tickets.value.filter(t => t.status === "closed").length);

function handleLogout() {
  logout();
  menuOpen.value = false;
  router.push("/auth/login");
}
</script>
