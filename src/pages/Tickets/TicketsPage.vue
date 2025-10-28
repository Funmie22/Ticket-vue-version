<template>
  <div>
    <!-- Header -->
    <header class="site-header">
      <div class="container nav">
        <div><strong>TicketApp</strong></div>
        <div><RouterLink to="/dashboard">Dashboard</RouterLink></div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container" style="padding: 32px 20px;">
      <div class="main-grid">
        <!-- Tickets Section -->
        <section>
          <h2>Tickets</h2>

          <div class="ticket-grid" aria-live="polite">
            <p v-if="tickets.length === 0">No tickets yet. Create one.</p>

            <article
              v-for="t in tickets"
              :key="t.id"
              class="ticket-card"
              :aria-labelledby="`t-${t.id}`"
            >
              <div class="ticket-header">
                <h3 :id="`t-${t.id}`" class="ticket-title">{{ t.title }}</h3>
                <StatusBadge :status="t.status" />
              </div>

              <p class="ticket-desc">
                <span v-if="t.description">{{ t.description }}</span>
                <span v-else class="small-muted">No description</span>
              </p>

              <div class="ticket-actions">
                <button class="btn-primary" @click="editing = t">Edit</button>
                <button class="btn-danger" @click="handleDelete(t.id)">Delete</button>
              </div>
            </article>
          </div>
        </section>

        <!-- Form Section -->
        <aside>
          <div class="form-card">
            <h3>{{ editing ? "Edit ticket" : "Create ticket" }}</h3>
            <TicketForm
              :initial="editing"
              @create="handleCreate"
              @update="handleUpdate"
              @cancel="editing = null"
            />
          </div>
        </aside>
      </div>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container">© TicketApp</div>
    </footer>

    <!-- Toast -->
    <Toast
      v-if="toast"
      :type="toast.type"
      :message="toast.message"
      @close="toast = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import { loadTickets, createTicket, updateTicket, deleteTicket } from "@/utils/storage"
import TicketForm from "@/components/Tickets/TicketForm.vue"
import Toast from "@/components/Toast.vue"

const tickets = ref([]);
const editing = ref(null);
const toast = ref(null);

onMounted(() => {
  tickets.value = loadTickets();
});

function handleCreate(payload) {
  try {
    const t = createTicket(payload);
    tickets.value = [t, ...tickets.value];
    toast.value = { type: "success", message: "Ticket created." };
  } catch {
    toast.value = { type: "error", message: "Failed to create ticket." };
  }
}

function handleUpdate(id, patch) {
  try {
    const updated = updateTicket(id, patch);
    tickets.value = tickets.value.map((t) =>
      t.id === id ? updated : t
    );
    editing.value = null;
    toast.value = { type: "success", message: "Ticket updated." };
  } catch {
    toast.value = { type: "error", message: "Failed to update ticket." };
  }
}

function handleDelete(id) {
  if (!confirm("Delete this ticket?")) return;
  try {
    deleteTicket(id);
    tickets.value = tickets.value.filter((t) => t.id !== id);
    toast.value = { type: "success", message: "Ticket deleted." };
  } catch {
    toast.value = { type: "error", message: "Failed to delete ticket." };
  }
}
</script>
