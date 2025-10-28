<template>
  <form @submit.prevent="submitHandler" novalidate>
    <div class="form-group">
      <label for="t-title">Title</label>
      <input
        id="t-title"
        v-model="title"
        aria-describedby="err-title"
      />
      <div id="err-title" class="small-muted" role="alert">
        {{ errors.title || "" }}
      </div>
    </div>

    <div class="form-group">
      <label for="t-desc">Description (optional)</label>
      <textarea
        id="t-desc"
        rows="5"
        v-model="description"
        aria-describedby="err-desc"
      ></textarea>
      <div id="err-desc" class="small-muted" role="alert">
        {{ errors.description || "" }}
      </div>
    </div>

    <div class="form-group">
      <label for="t-status">Status</label>
      <select
        id="t-status"
        v-model="status"
        aria-describedby="err-status"
      >
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="closed">closed</option>
      </select>
      <div id="err-status" class="small-muted" role="alert">
        {{ errors.status || "" }}
      </div>
    </div>

    <div class="form-group">
      <label for="t-pri">Priority</label>
      <select id="t-pri" v-model="priority">
        <option value="low">low</option>
        <option value="normal">normal</option>
        <option value="high">high</option>
      </select>
    </div>

    <div style="display:flex; gap:8px; margin-top:8px;">
      <button class="btn-primary" type="submit">
        {{ initial ? "Save" : "Create" }}
      </button>
      <button
        v-if="initial"
        type="button"
        class="btn-ghost"
        @click="onCancel"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, reactive } from "vue"

// Props
const props = defineProps({
  initial: { type: Object, default: null },
  onCreate: Function,
  onUpdate: Function,
  onCancel: Function
})

// State
const title = ref(props.initial?.title || "")
const description = ref(props.initial?.description || "")
const status = ref(props.initial?.status || "open")
const priority = ref(props.initial?.priority || "normal")
const errors = reactive({})

// Watch for prop changes (like React's useEffect)
watch(
  () => props.initial,
  (newVal) => {
    title.value = newVal?.title || ""
    description.value = newVal?.description || ""
    status.value = newVal?.status || "open"
    priority.value = newVal?.priority || "normal"
    Object.keys(errors).forEach(k => delete errors[k])
  }
)

function validate() {
  const e = {}
  if (!title.value.trim()) e.title = "Title is required."
  if (title.value && (title.value.trim().length < 3 || title.value.trim().length > 200))
    e.title = "Title must be 3–200 characters."
  const allowed = ["open", "in_progress", "closed"]
  if (!allowed.includes(status.value)) e.status = "Invalid status."
  if (description.value && description.value.length > 2000)
    e.description = "Description too long."
  return e
}

function submitHandler() {
  const e = validate()
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, e)

  if (Object.keys(e).length) return

  const payload = {
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
    priority: priority.value
  }

  if (props.initial) props.onUpdate(props.initial.id, payload)
  else {
    props.onCreate(payload)
    title.value = ""
    description.value = ""
    status.value = "open"
    priority.value = "normal"
  }
}
</script>
