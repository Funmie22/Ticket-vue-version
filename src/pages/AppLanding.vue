<template>
  <div>
    <header class="site-header">
      <div class="container nav">
        <div class="brand">
          <strong>TicketApp</strong>
        </div>

        <button 
          class="hamburger" 
          aria-label="Toggle navigation"
          @click="menuOpen = !menuOpen"
        >
          ☰
        </button>

        <nav :class="['nav-links', menuOpen ? 'open' : '']">
          <RouterLink to="/" @click="menuOpen = false">Home</RouterLink>
          <RouterLink to="/dashboard" @click="menuOpen = false">Dashboard</RouterLink>
          <RouterLink to="/auth/login" @click="menuOpen = false">Login</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <Hero />

      <section class="features container" aria-label="features">
        <div class="card">⚡ Fast CRUD — Create, Read, Update, Delete</div>
        <div class="card">🔒 Protected routes & session simulation</div>
        <div class="card">🌍 Accessible and fully responsive</div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container">© {{ new Date().getFullYear() }} TicketApp — Built with ❤️</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import Hero from "@/components/Hero/Hero.vue";

const menuOpen = ref(false);
</script>
