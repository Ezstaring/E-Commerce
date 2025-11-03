// Datos simulados para la lista
const items = [
  { id: 1, name: "Producto A", description: "Descripción del producto A" },
  { id: 2, name: "Producto B", description: "Descripción del producto B" },
  { id: 3, name: "Producto C", description: "Descripción del producto C" },
];

// Escapar HTML para prevenir XSS
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag]));
}

// Renderizado de vistas
function renderHome() {
  return `
    <section aria-labelledby="home-title">
      <h2 id="home-title">Bienvenido a la SPA Accesible</h2>
      <p>Esta aplicación cumple criterios de accesibilidad y es navegable con teclado y lector de pantalla.</p>
    </section>
  `;
}

function renderList() {
  return `
    <section aria-labelledby="list-title">
      <h2 id="list-title">Lista de productos</h2>
      ${items.map(item => `
        <article class="list-item" tabindex="0">
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <button aria-label="Ver detalles de ${escapeHtml(item.name)}">Ver</button>
        </article>
      `).join('')}
    </section>
  `;
}

function renderContact() {
  return `
    <section aria-labelledby="contact-title">
      <h2 id="contact-title">Contáctanos</h2>
      <form id="contact-form" novalidate>
        <div>
          <label for="name">Nombre</label>
          <input id="name" name="name" required aria-required="true" />
          <span id="error-name" class="error" aria-live="polite"></span>
        </div>
        <div>
          <label for="message">Mensaje</label>
          <textarea id="message" name="message" required aria-required="true"></textarea>
          <span id="error-message" class="error" aria-live="polite"></span>
        </div>
        <button type="submit">Enviar</button>
        <p id="form-status" class="success" aria-live="polite"></p>
      </form>
    </section>
  `;
}

// Render principal
function renderRoute(route) {
  const content = document.getElementById("content");
  switch (route) {
    case "#list":
      content.innerHTML = renderList();
      break;
    case "#contact":
      content.innerHTML = renderContact();
      setupContactForm();
      break;
    default:
      content.innerHTML = renderHome();
  }
  content.focus();
}

// Lógica de formulario de contacto
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const message = form.message.value.trim();
    let valid = true;

    document.getElementById("error-name").textContent = "";
    document.getElementById("error-message").textContent = "";

    if (!name) {
      document.getElementById("error-name").textContent = "El nombre es obligatorio.";
      valid = false;
    }
    if (!message) {
      document.getElementById("error-message").textContent = "El mensaje no puede estar vacío.";
      valid = false;
    }

    if (valid) {
      document.getElementById("form-status").textContent = "¡Mensaje enviado con éxito!";
      form.reset();
    }
  });
}

// Enrutamiento con hash
window.addEventListener("hashchange", () => renderRoute(location.hash));
window.addEventListener("load", () => renderRoute(location.hash));
