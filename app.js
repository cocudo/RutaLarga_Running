/* ==========================================================================
   PRODUCT DATABASE
   ========================================================================== */
const PRODUCTS = [
    {
        id: "nimbus-26",
        brand: "Asics",
        name: "Gel-Nimbus 26",
        image: "img/nimbus.png",
        price: 180,
        terrains: ["asfalto", "mixto"],
        weights: ["medio", "pesado"],
        pronation: ["neutra", "supinadora"],
        category: "Máxima Amortiguación",
        desc: "Amortiguación premium con tecnología PureGEL y espuma FF Blast Plus Eco para máxima comodidad en tiradas muy largas.",
        specs: ["PureGEL", "Drop: 8mm", "Protección articular", "Peso: 304g"]
    },
    {
        id: "invincible-3",
        brand: "Nike",
        name: "ZoomX Invincible 3",
        image: "img/nimbus.png", // Reuse cushioning shoe mockup
        price: 190,
        terrains: ["asfalto"],
        weights: ["pesado"],
        pronation: ["neutra"],
        category: "Máximo Rebote",
        desc: "Suela de gran anchura y máximo espesor de espuma reactiva ZoomX, ideal para proteger articulaciones de corredores de peso alto.",
        specs: ["ZoomX", "Drop: 9mm", "Máxima amortiguación", "Estabilidad mejorada"]
    },
    {
        id: "vaporfly-3",
        brand: "Nike",
        name: "Vaporfly 3",
        image: "img/vaporfly.png",
        price: 260,
        terrains: ["asfalto", "pista"],
        weights: ["ligero", "medio"],
        pronation: ["neutra"],
        category: "Competición (Placa)",
        desc: "Zapatilla de competición élite con placa de fibra de carbono Flyplate de longitud completa y espuma ZoomX para reactividad explosiva.",
        specs: ["Placa de Carbono", "Flyplate", "Drop: 8mm", "Peso: 185g"]
    },
    {
        id: "endorphin-speed-4",
        brand: "Saucony",
        name: "Endorphin Speed 4",
        image: "img/vaporfly.png", // Reuse speed shoe mockup
        price: 200,
        terrains: ["asfalto", "pista"],
        weights: ["ligero", "medio", "pesado"],
        pronation: ["neutra"],
        category: "Entrenamiento Rápido / Mixta",
        desc: "Equipada con placa de nailon semi-rígida y amortiguación PWRRUN PB. Muy polivalente tanto para series como para días de carrera.",
        specs: ["Placa de Nylon", "PWRRUN PB", "Drop: 8mm", "Ritmos alegres"]
    },
    {
        id: "gel-kayano-30",
        brand: "Asics",
        name: "Gel-Kayano 30",
        image: "img/nimbus.png", // Reuse cushioning shoe mockup
        price: 200,
        terrains: ["asfalto", "mixto"],
        weights: ["medio", "pesado"],
        pronation: ["pronadora"],
        category: "Soporte & Estabilidad",
        desc: "Sistema 4D Guidance System que proporciona estabilidad activa adaptativa y soporte medial para corredores que tienden a pronar.",
        specs: ["4D Guidance", "Drop: 10mm", "Control de pisada", "Gel interno"]
    },
    {
        id: "adrenaline-23",
        brand: "Brooks",
        name: "Adrenaline GTS 23",
        image: "img/nimbus.png", // Reuse cushioning shoe mockup
        price: 150,
        terrains: ["asfalto"],
        weights: ["ligero", "medio", "pesado"],
        pronation: ["pronadora"],
        category: "Soporte Inteligente",
        desc: "Soporte GuideRails integrado que mantiene bajo control el movimiento excesivo del pie y la rodilla durante la pisada pronadora.",
        specs: ["GuideRails", "Drop: 12mm", "Amortiguación suave", "Estabilidad pasiva"]
    },
    {
        id: "speedgoat-5",
        brand: "Hoka",
        name: "Speedgoat 5",
        image: "img/speedgoat.png",
        price: 160,
        terrains: ["trail"],
        weights: ["ligero", "medio", "pesado"],
        pronation: ["neutra", "supinadora", "pronadora"],
        category: "Trail running",
        desc: "Suela Vibram Megagrip con tacos de tracción profunda para terreno técnico de montaña, junto con la mítica mediasuela Hoka.",
        specs: ["Vibram Megagrip", "Tacos: 5mm", "Drop: 4mm", "Peso: 291g"]
    },
    {
        id: "speedcross-6",
        brand: "Salomon",
        name: "Speedcross 6",
        image: "img/speedgoat.png", // Reuse trail shoe mockup
        price: 140,
        terrains: ["trail"],
        weights: ["ligero", "medio", "pesado"],
        pronation: ["neutra"],
        category: "Trail Técnico",
        desc: "Suela Mud Contagrip con patrón de tacos agresivos, ideal para agarre máximo en barro, hierba mojada y terreno descompuesto.",
        specs: ["Mud Contagrip", "Drop: 10mm", "Ajuste SensiFit", "Quicklace"]
    }
];

/* ==========================================================================
   CONVERSATIONAL CHATBOT STATE MACHINE
   ========================================================================== */
let userProfile = {
    weight: null,     // ligero | medio | pesado
    terrain: null,    // asfalto | trail | mixto
    objective: null,  // salud | competicion | larga
    pronation: null   // neutra | pronadora | supinadora
};

let currentStep = "welcome";

const CHAT_FLOW = {
    welcome: {
        botMsg: "¡Hola! Soy tu Asesor Técnico y Coach Virtual de <b>RutaLarga Running</b>. 🏃💨<br><br>Mi misión es ayudarte a encontrar las zapatillas exactas para tu perfil biomecánico y tus objetivos para evitar lesiones y mejorar tus tiempos. ¿Te parece si hacemos un rápido <b>Test de Corredor</b> de 4 preguntas?",
        options: [
            { text: "¡Sí, empecemos!", nextStep: "ask_terrain" },
            { text: "Solo quiero curiosear el catálogo", nextStep: "browse_only" }
        ]
    },
    ask_terrain: {
        botMsg: "Genial. Empecemos por la superficie. <b>¿Por qué terreno corres o piensas correr principalmente?</b> 🗺️",
        options: [
            { text: "Asfalto / Pista 🛣️", nextStep: "save_terrain", value: "asfalto" },
            { text: "Montaña / Senderos de Tierra ⛰️", nextStep: "save_terrain", value: "trail" },
            { text: "Mixto (Asfalto y parque/tierra) 🌳", nextStep: "save_terrain", value: "mixto" }
        ]
    },
    ask_weight: {
        botMsg: "Perfecto. El peso corporal influye mucho en la cantidad de amortiguación que necesita el calzado para no dañarte las rodillas ni vencer el material prematuramente. <b>¿Cuál es tu rango de peso aproximado?</b> ⚖️",
        options: [
            { text: "Menos de 70 kg (Ligero) 🟢", nextStep: "save_weight", value: "ligero" },
            { text: "Entre 70 y 80 kg (Medio) 🟡", nextStep: "save_weight", value: "medio" },
            { text: "Más de 80 kg (Pesado) 🔴", nextStep: "save_weight", value: "pesado" }
        ]
    },
    ask_objective: {
        botMsg: "Entendido. Ahora hablemos de tus metas de carrera. <b>¿Cuál es tu objetivo principal actualmente?</b> 🏁",
        options: [
            { text: "Salud / Empezar a correr sin lesionarme ❤️", nextStep: "save_objective", value: "salud" },
            { text: "Mejorar tiempos / Competir en carreras ⏱️", nextStep: "save_objective", value: "competicion" },
            { text: "Entrenar tiradas largas o Maratones 🚀", nextStep: "save_objective", value: "larga" }
        ]
    },
    ask_pronation: {
        botMsg: "Y por último, la biomecánica de tu pisada. <b>¿Sabes qué tipo de pisada tienes?</b> 👣<br><br><i>(Si no lo sabes, cuéntame si tus rodillas tienden a ir hacia adentro cuando te cansas - Pronador, o si tus zapatillas se desgastan por fuera - Supinador).</i>",
        options: [
            { text: "Neutra (Pisada recta / No suelo lesionarme) ⚖️", nextStep: "save_pronation", value: "neutra" },
            { text: "Pronadora (El pie/tobillo gira hacia adentro) 📉", nextStep: "save_pronation", value: "pronadora" },
            { text: "Supinadora (El pie/tobillo apoya por fuera) 📈", nextStep: "save_pronation", value: "supinadora" },
            { text: "No estoy seguro/a (Recomendar neutra) 🤷", nextStep: "save_pronation", value: "neutra" }
        ]
    },
    summary: {
        botMsg: "¡Perfecto! El análisis biomecánico de nuestro recomendador inteligente de IA ha completado el diagnóstico. 🛠️👟<br><br>He ajustado el catálogo de la derecha con las zapatillas técnicas que mejor se adaptan a tu peso, superficie y pisada.<br><br>🎁 Además, como te prometí, te he preparado un <b>Plan de Entrenamiento Técnico Gratuito (PDF)</b> adaptado a tu nivel y un <b>Cupón del 15% de descuento</b> para tu compra. ¿Te gustaría descargarlo?",
        options: [
            { text: "¡Sí! Quiero mi plan y cupón 🎁", action: "open_lead_modal" },
            { text: "Solo ver el catálogo filtrado 🛍️", action: "close_dialog" }
        ]
    }
};

/* ==========================================================================
   DOM ELEMENTS
   ========================================================================== */
const chatMessagesEl = document.getElementById("chat-messages");
const typingIndicatorEl = document.getElementById("typing-indicator");
const quickRepliesEl = document.getElementById("quick-replies");
const chatInputEl = document.getElementById("chat-input");
const chatSendBtn = document.getElementById("chat-send-btn");
const resetChatBtn = document.getElementById("reset-chat-btn");
const productsGridEl = document.getElementById("products-grid");
const catalogBadgeEl = document.getElementById("catalog-badge");
const catalogSummaryTextEl = document.getElementById("catalog-summary-text");
const leadModalEl = document.getElementById("lead-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const leadFormEl = document.getElementById("lead-form");
const leadSuccessBoxEl = document.getElementById("lead-success-box");
const profileSummaryPillsEl = document.getElementById("profile-summary-pills");
const toastEl = document.getElementById("toast");
const copyCouponBtn = document.getElementById("copy-coupon-btn");

/* ==========================================================================
   HELPER FUNCTIONS
   ========================================================================== */
function showToast(message) {
    toastEl.innerText = message;
    toastEl.classList.remove("hidden");
    setTimeout(() => {
        toastEl.classList.add("hidden");
    }, 3000);
}

function formatTime() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    return `${hrs}:${mins}`;
}

// Simulated delay for bot response
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ==========================================================================
   CHAT MESSAGES RENDERING
   ========================================================================== */
function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `msg-bubble ${sender === "bot" ? "msg-bot" : "msg-user"}`;
    
    // Add text contents
    const contentSpan = document.createElement("span");
    contentSpan.innerHTML = text;
    messageDiv.appendChild(contentSpan);
    
    // Add timestamp
    const timestampSpan = document.createElement("span");
    timestampSpan.className = "msg-timestamp";
    timestampSpan.innerText = formatTime();
    messageDiv.appendChild(timestampSpan);
    
    chatMessagesEl.appendChild(messageDiv);
    
    // Scroll chat to bottom
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function showTyping() {
    typingIndicatorEl.classList.remove("hidden");
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function hideTyping() {
    typingIndicatorEl.classList.add("hidden");
}

/* ==========================================================================
   PRODUCT CATALOG RENDERING & FILTERING
   ========================================================================== */
function renderCatalog(filteredProducts = PRODUCTS) {
    productsGridEl.innerHTML = "";
    
    if (filteredProducts.length === 0) {
        productsGridEl.innerHTML = `
            <div class="no-products">
                <span class="no-prod-icon">👟</span>
                <h3>Sin coincidencias exactas</h3>
                <p>Tu combinación biomecánica es muy específica. Prueba reiniciando el cuestionario.</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        // Check if this card matches userProfile answers
        const isMatch = userProfile.terrain ? product.terrains.includes(userProfile.terrain) : false;
        
        const card = document.createElement("div");
        card.className = `product-card ${isMatch ? "matching" : ""}`;
        
        // Render specs pills
        const specsHTML = product.specs.map(spec => {
            const isBiomechanicalMatch = (userProfile.pronation && spec.toLowerCase().includes(userProfile.pronation)) ||
                                         (userProfile.terrain && spec.toLowerCase().includes(userProfile.terrain));
            return `<span class="spec-pill ${isBiomechanicalMatch ? 'match' : ''}">${spec}</span>`;
        }).join("");

        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
                ${isMatch ? '<span class="matching-ribbon">Sugerido por IA</span>' : ''}
            </div>
            <div class="product-details">
                <span class="product-brand">${product.brand}</span>
                <h3 class="product-name">${product.name}</h3>
                <span class="spec-pill" style="align-self: flex-start; margin-top: 4px; background-color: rgba(0, 229, 255, 0.05); color: var(--accent-blue);">${product.category}</span>
                <p class="product-desc">${product.desc}</p>
                <div class="product-specs">
                    ${specsHTML}
                </div>
                <div class="product-footer">
                    <span class="product-price">${product.price} €</span>
                    <button class="btn-buy-now" onclick="buyProduct('${product.name}')">Comprar</button>
                </div>
            </div>
        `;
        productsGridEl.appendChild(card);
    });
}

function buyProduct(name) {
    showToast(`🛒 ${name} añadido al carrito.`);
}

function updateCatalogFilter() {
    if (!userProfile.terrain) {
        // No filters applied yet
        catalogBadgeEl.className = "catalog-badge filter-all";
        catalogBadgeEl.innerText = "Catálogo Completo";
        catalogSummaryTextEl.innerText = "Mostrando todas las referencias de alto rendimiento.";
        renderCatalog(PRODUCTS);
        return;
    }

    // Filter products
    let filtered = PRODUCTS.filter(prod => {
        // Filter by terrain
        let terrainMatch = prod.terrains.includes(userProfile.terrain);
        
        // Filter by weight (if specified)
        let weightMatch = true;
        if (userProfile.weight) {
            weightMatch = prod.weights.includes(userProfile.weight);
        }
        
        // Filter by pronation (if specified)
        let pronationMatch = true;
        if (userProfile.pronation) {
            pronationMatch = prod.pronation.includes(userProfile.pronation);
        }
        
        return terrainMatch && weightMatch && pronationMatch;
    });

    // Fallback if too restrictive: show matches by terrain and pronation (ignore weight)
    if (filtered.length === 0) {
        filtered = PRODUCTS.filter(prod => {
            let terrainMatch = prod.terrains.includes(userProfile.terrain);
            let pronationMatch = userProfile.pronation ? prod.pronation.includes(userProfile.pronation) : true;
            return terrainMatch && pronationMatch;
        });
    }

    catalogBadgeEl.className = "catalog-badge filter-active";
    catalogBadgeEl.innerText = "IA Recomendado";
    
    // Build human readable summary text
    let summaryText = `Mostrando calzado de alto rendimiento para correr en <b>${userProfile.terrain}</b>`;
    if (userProfile.weight) summaryText += `, recomendado para peso <b>${userProfile.weight}</b>`;
    if (userProfile.pronation) summaryText += ` y pisada <b>${userProfile.pronation}</b>.`;

    catalogSummaryTextEl.innerHTML = summaryText;
    renderCatalog(filtered);
}

/* ==========================================================================
   CHAT ENGINE AND STEP FLOW LOGIC
   ========================================================================== */
async function loadStep(stepKey) {
    currentStep = stepKey;
    const step = CHAT_FLOW[stepKey];
    
    if (!step) return;

    showTyping();
    // Simulate thinking delay (natural human rhythm)
    await delay(1000 + Math.random() * 800);
    hideTyping();

    appendMessage("bot", step.botMsg);
    renderQuickReplies(step.options);
}

function renderQuickReplies(options = []) {
    quickRepliesEl.innerHTML = "";
    options.forEach(opt => {
        const button = document.createElement("button");
        button.className = "btn-quick-reply";
        button.innerText = opt.text;
        
        button.addEventListener("click", () => {
            // Append user response as message
            appendMessage("user", opt.text);
            
            // Handle actions or next steps
            if (opt.action) {
                handleAction(opt.action);
            } else if (opt.nextStep) {
                // If it's a save action, update user profile first
                if (opt.nextStep.startsWith("save_")) {
                    saveProfileValue(opt.nextStep, opt.value);
                } else {
                    loadStep(opt.nextStep);
                }
            }
        });
        
        quickRepliesEl.appendChild(button);
    });
}

function saveProfileValue(saveStepName, value) {
    switch (saveStepName) {
        case "save_terrain":
            userProfile.terrain = value;
            updateCatalogFilter();
            loadStep("ask_weight");
            break;
            
        case "save_weight":
            userProfile.weight = value;
            updateCatalogFilter();
            loadStep("ask_objective");
            break;
            
        case "save_objective":
            userProfile.objective = value;
            loadStep("ask_pronation");
            break;
            
        case "save_pronation":
            userProfile.pronation = value;
            updateCatalogFilter();
            loadStep("summary");
            break;
    }
}

function handleAction(action) {
    quickRepliesEl.innerHTML = "";
    if (action === "open_lead_modal") {
        openModal();
    } else if (action === "close_dialog") {
        appendMessage("bot", "¡Perfecto! Echa un vistazo al catálogo filtrado. Tienes las mejores zapatillas recomendadas para tu perfil biomecánico a la derecha. Si necesitas asesoramiento técnico adicional, puedes escribirme aquí.");
        enableManualInput();
    }
}

function enableManualInput() {
    chatInputEl.removeAttribute("disabled");
    chatSendBtn.removeAttribute("disabled");
    chatInputEl.placeholder = "Escribe tu pregunta biomecánica aquí...";
}

// Simulated free text response logic
async function handleManualMessageSubmit() {
    const text = chatInputEl.value.trim();
    if (!text) return;

    appendMessage("user", text);
    chatInputEl.value = "";

    showTyping();
    await delay(1500);
    hideTyping();

    // Natural NLP responses simulated
    const query = text.toLowerCase();
    let response = "";

    if (query.includes("lesion") || query.includes("dolor") || query.includes("rodilla") || query.includes("tendon")) {
        response = "El dolor en articulaciones al correr suele deberse a dos factores: una amortiguación vencida o un drop no adecuado para tu técnica. Te sugiero modelos con un drop superior a 8mm (como la <b>Asics Nimbus 26</b> o <b>Brooks Adrenaline</b>) para liberar la tensión del tendón de Aquiles, y asegurarte de cambiar de calzado cada 700-800km.";
    } else if (query.includes("talla") || query.includes("medida") || query.includes("cm")) {
        response = "Las tallas varían bastante entre marcas. Por ejemplo, en Asics te recomiendo pedir medio número más que en Nike. En nuestra base de datos preventa tenemos la tabla de equivalencias automatizada para asistirte y reducir las devoluciones en un 25%.";
    } else if (query.includes("carbono") || query.includes("placa") || query.includes("rapida")) {
        response = "Las zapatillas con placa de carbono (como las <b>Vaporfly 3</b>) están optimizadas para ritmos inferiores a 4:15 min/km en competición. Si entrenas a diario, te recomiendo alternarlas con un calzado mixto sin placa (ej. <b>Endorphin Speed 4</b>) para no debilitar los tendones del pie.";
    } else {
        response = "¡Excelente consulta! Como asesor preventa IA de RutaLarga Running, te confirmo que la clave está en el binomio drop-amortiguación. ¿Te gustaría que afinemos alguna recomendación del catálogo según tu ritmo de carrera actual?";
    }

    appendMessage("bot", response);
}

/* ==========================================================================
   LEAD MAGNET / MODAL LOGIC
   ========================================================================= */
function openModal() {
    // Generate profile summary pills in modal
    profileSummaryPillsEl.innerHTML = "";
    const pLabels = {
        terrain: `Terreno: ${userProfile.terrain}`,
        weight: `Peso: ${userProfile.weight}`,
        objective: `Meta: ${userProfile.objective}`,
        pronation: `Pisada: ${userProfile.pronation}`
    };
    
    for (let key in pLabels) {
        const pill = document.createElement("span");
        pill.className = "profile-pill";
        pill.innerText = pLabels[key];
        profileSummaryPillsEl.appendChild(pill);
    }

    // Set PDF download dynamic href
    const downloadBtn = document.getElementById("download-plan-btn");
    let planType = "Plan_Iniciacion_0_5K.pdf";
    if (userProfile.objective === "competicion") planType = "Plan_Velocidad_10K.pdf";
    if (userProfile.objective === "larga") planType = "Plan_Media_Maraton.pdf";
    if (userProfile.terrain === "trail") planType = "Plan_Iniciacion_Trail.pdf";
    
    downloadBtn.setAttribute("href", `#${planType}`);
    downloadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showToast(`📥 Descarga simulada: ${planType}`);
    });

    leadModalEl.classList.remove("hidden");
}

function closeModal() {
    leadModalEl.classList.add("hidden");
    appendMessage("bot", "¡Perfecto! Ya tienes el catálogo filtrado con tus zapatillas recomendadas. Recuerda usar el cupón de descuento <b>RUTALARGA15</b> en tu carrito de compras.");
    enableManualInput();
}

/* ==========================================================================
   EVENT LISTENERS & STARTUP
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Render initial catalog
    renderCatalog(PRODUCTS);
    
    // Start Chat workflow
    loadStep("welcome");

    // Modal close button
    closeModalBtn.addEventListener("click", closeModal);

    // Lead Form Submit
    leadFormEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("lead-email").value;
        const phone = document.getElementById("lead-phone").value;

        // Simulate CRM Capture (Klaviyo)
        showToast("💾 Lead capturado y sincronizado en Klaviyo.");
        
        // Hide form, show success contents
        leadFormEl.classList.add("hidden");
        leadSuccessBoxEl.classList.remove("hidden");
    });

    // Copy Coupon Code
    copyCouponBtn.addEventListener("click", () => {
        const codeText = document.getElementById("coupon-code").innerText;
        navigator.clipboard.writeText(codeText)
            .then(() => {
                showToast("📋 ¡Cupón copiado al portapapeles!");
            })
            .catch(() => {
                showToast("Error al copiar cupón.");
            });
    });

    // Manual Input keypress
    chatInputEl.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleManualMessageSubmit();
        }
    });
    chatSendBtn.addEventListener("click", handleManualMessageSubmit);

    // Reset Chat btn
    resetChatBtn.addEventListener("click", () => {
        chatMessagesEl.innerHTML = "";
        userProfile = { weight: null, terrain: null, objective: null, pronation: null };
        quickRepliesEl.innerHTML = "";
        chatInputEl.value = "";
        chatInputEl.setAttribute("disabled", "true");
        chatSendBtn.setAttribute("disabled", "true");
        chatInputEl.placeholder = "Pregunta algo al asesor sobre running...";
        
        // Hide lead form success/reset states
        leadFormEl.classList.remove("hidden");
        leadSuccessBoxEl.classList.add("hidden");
        leadFormEl.reset();

        updateCatalogFilter();
        loadStep("welcome");
        showToast("🔄 Cuestionario reiniciado.");
    });
});
