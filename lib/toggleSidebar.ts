export function toggleSidebar() {
    if (typeof document === "undefined") {
        return;
    }

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (!sidebar || !overlay) {
        return;
    }

    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
}