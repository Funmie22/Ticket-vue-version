<template>
  <section class="hero" aria-labelledby="hero-heading" role="region">
    <div class="hero-inner container">
      <div class="hero-copy">
        <h1 id="hero-heading" class="hero-title">
          Tickify
          <span class="hero-accent">for modern workflows</span>
        </h1>

        <p class="hero-sub">
          Organize, prioritize, and resolve work faster. Built for teams that value clarity and speed.
        </p>

        <div class="hero-ctas">
          <RouterLink class="btn btn-primary" to="/auth/signup" role="button">
            Get Started
          </RouterLink>
          <RouterLink class="btn btn-primary btn-secondary" to="/auth/login" role="button">
            Login
          </RouterLink>
        </div>
      </div>
    </div>

    <img class="decor decor-circle-1" :src="circle1" alt="" aria-hidden="true" />
    <img class="decor decor-circle-2" :src="circle2" alt="" aria-hidden="true" />

    <div class="hero-wave" aria-hidden="true">
      <img :src="waveSrc" alt="" />
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import './hero.css'
import waveSrc from '../../assets/wave.svg'
import circle1 from '../../assets/circle-1.svg'
import circle2 from '../../assets/circle-2.svg'
</script>
