<template>
  <div
    role="status"
    aria-live="polite"
    class="toast"
    :style="{ background: type === 'error' ? '#7f1d1d' : '#111' }"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
  type: { type: String, default: "info" },
  message: { type: String, default: "" },
  duration: { type: Number, default: 3500 },
  onClose: { type: Function, default: () => {} }
})

let timer = null

onMounted(() => {
  timer = setTimeout(() => props.onClose(), props.duration)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>
