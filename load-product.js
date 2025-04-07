// load-product.js
function getProductKeyFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // bijvoorbeeld ?id=midrange-gaming-pc
}

function generateProductPage(product) {
  const container = document.getElementById("content");

  document.title = `${product.title} - Lextops`;

  let galleryHTML = product.images.map((src, i) => `
    <img src="${src}" class="gallery-image${i === 0 ? " active" : ""}" alt="${product.title} Image ${i + 1}" />
  `).join("");

  let buttonsHTML = product.images.map((_, i) => `
    <button class="nav-button${i === 0 ? " active" : ""}" onclick="changeImage(${i})"></button>
  `).join("");

  let specsHTML = product.specs.map(s => `<li><strong>${s.split(":")[0]}:</strong> ${s.split(":")[1]}</li>`).join("");
  let fpsHTML = product.fps ? product.fps.map(f => `<li>${f}</li>`).join("") : '';
  
  // Ensure 'includes' is always an array
  const includes = Array.isArray(product.includes) ? product.includes : ["✔️ Windows 11 Pro Geïnstalleerd", "✔️ Voedingskabel", "✔️ De complete gaming PC"];
  
  let includesHTML = includes.map(i => `<li>${i}</li>`).join("");

  // Default email if not provided in product data
  const contactEmail = product.contactEmail || "lex.kimmel@gmail.com";

  // Customizable mailto body with placeholders
  const mailtoBody = `Hallo,%0A%0AIk wil graag de volgende PC bestellen:%0A%0A${product.title}%0A${product.specs.join('%0A')}%0A%0AIk zie graag een reactie tegemoet.%0A%0AMet vriendelijke groet,%0A%0A[UW NAAM]`;

  // Customizable availability text
  const availabilityText = product.availability || "Nog slechts 1 beschikbaar"; // Default if not provided

  container.innerHTML = `
    <div class="navigation">
      <p><a href="index.html">Home</a> / ${product.title}</p>
    </div>

    <div class="gallery">
      <div class="product-gallery">${galleryHTML}</div>
      <div class="gallery-nav">${buttonsHTML}</div>
    </div>

    <h2 class="product-title">${product.title}</h2>
    <p class="short-description">${product.description}</p>

    <div class="product-description">
      <h3>Specificaties:</h3>
      <ul>${specsHTML}</ul>
      ${fpsHTML ? `<h3>Gaming prestaties:</h3><ul>${fpsHTML}</ul>` : ''}
      <h3>Wat krijg je erbij?</h3>
      <ul>${includesHTML}</ul>
    </div>

    <div class="purchase-section">
      <h2 class="price">${product.price}</h2>
      <p>${availabilityText}</p> <!-- Customizable availability text -->
      <a href="mailto:${contactEmail}?subject=Bestelling%20${encodeURIComponent(product.title)}&body=${mailtoBody}">
        <button class="buy-button primary">Bestellen</button>
      </a>
    </div>
  `;
}

// Initialiseren
const productKey = getProductKeyFromURL();
if (products[productKey]) {
  generateProductPage(products[productKey]);
} else {
  document.getElementById("product-content").innerHTML = "<p>Product niet gevonden.</p>";
}
