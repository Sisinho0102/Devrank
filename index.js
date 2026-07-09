(() => {
    const canvas = document.getElementById("matrix-rain");
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fontSize = 15;
    const glyphs = "01{}[]()<>/\\;:.,+-*=!@#$%^&_~ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let columns = 0;
    let drops = [];

    function setup() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = new Array(columns).fill(0).map(() => Math.random() * -80);
    }

    function draw() {
        ctx.fillStyle = "rgba(11, 13, 19, 0.14)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px "JetBrains Mono", monospace';
        ctx.lineWidth = 0.7;

        for (let i = 0; i < columns; i++) {
            const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.strokeStyle = "rgba(180, 188, 210, 0.4)";
            ctx.strokeText(glyph, x, y);

            ctx.fillStyle = "#000000";
            ctx.fillText(glyph, x, y);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setup();
    window.addEventListener("resize", setup);

    if (!prefersReduced) {
        setInterval(draw, 55);
    } else {
        ctx.fillStyle = "#0b0d13";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("sort-criteria");
    const container = document.getElementById("ranking-list");

    function sortItems(criterion) {
        const items = Array.from(container.querySelectorAll(".ranking-item"));

        items.sort((a, b) => {
            if (criterion === "alpha") {
                return a.getAttribute("data-title").localeCompare(b.getAttribute("data-title"));
            }
            if (criterion === "views") {
                return parseInt(b.getAttribute("data-views")) - parseInt(a.getAttribute("data-views"));
            }
            if (criterion === "date") {
                return new Date(b.getAttribute("data-date")) - new Date(a.getAttribute("data-date"));
            }
        });

        items.forEach(item => container.appendChild(item));
        document.body.setAttribute("data-sort", criterion);
    }

    select.addEventListener("change", (e) => sortItems(e.target.value));
    sortItems(select.value);
});