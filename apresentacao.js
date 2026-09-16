/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const slides = Array.from(
    document.querySelectorAll(".slide")
);

const nextButton =
    document.getElementById("nextButton");

const prevButton =
    document.getElementById("prevButton");

const restartButton =
    document.querySelector(".restart-button");

const slideCounter =
    document.getElementById("slideCounter");

const progressFill =
    document.getElementById("progressFill");

const progressLabel =
    document.getElementById("progressLabel");


/* =========================================================
   NOMES DOS SLIDES
========================================================= */

const slideLabels = [
    "Capa",
    "O problema",
    "Simbiose Industrial",
    "Nossa solução",
    "Como funciona",
    "Demonstração",
    "Localização",
    "Pesquisa de campo",
    "Resultados",
    "Conclusão"
];


/* =========================================================
   ESTADO
========================================================= */

let currentSlide = 0;


/* =========================================================
   MOSTRAR SLIDE
========================================================= */

function showSlide(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= slides.length) {
        index = slides.length - 1;
    }

    currentSlide = index;


    slides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === currentSlide
        );

    });


    updateControls();

}


/* =========================================================
   ATUALIZAR CONTROLES
========================================================= */

function updateControls() {

    const humanNumber =
        currentSlide + 1;

    const total =
        slides.length;


    slideCounter.textContent =
        `${humanNumber} / ${total}`;


    progressLabel.textContent =
        slideLabels[currentSlide];


    const percentage =
        (humanNumber / total) * 100;


    progressFill.style.width =
        `${percentage}%`;


    prevButton.disabled =
        currentSlide === 0;


    if (currentSlide === total - 1) {

        nextButton.innerHTML =
            `<span>Finalizar</span> ✓`;

    } else {

        nextButton.innerHTML =
            `<span>Próximo</span> →`;

    }

}


/* =========================================================
   PRÓXIMO
========================================================= */

function nextSlide() {

    if (currentSlide < slides.length - 1) {

        showSlide(
            currentSlide + 1
        );

    }

}


/* =========================================================
   ANTERIOR
========================================================= */

function previousSlide() {

    if (currentSlide > 0) {

        showSlide(
            currentSlide - 1
        );

    }

}


/* =========================================================
   REINICIAR
========================================================= */

function restartPresentation() {

    showSlide(0);

}


/* =========================================================
   EVENTOS
========================================================= */

nextButton.addEventListener(
    "click",
    nextSlide
);

prevButton.addEventListener(
    "click",
    previousSlide
);


restartButton.addEventListener(
    "click",
    restartPresentation
);


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            event.preventDefault();

            nextSlide();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();

            previousSlide();

        }


        if (
            event.key === "Home"
        ) {

            event.preventDefault();

            showSlide(0);

        }


        if (
            event.key === "End"
        ) {

            event.preventDefault();

            showSlide(slides.length - 1);

        }

    }
);


/* =========================================================
   CLIQUE NO SLIDE
========================================================= */

document.addEventListener(
    "dblclick",
    () => {

        toggleFullscreen();

    }
);


/* =========================================================
   TELA CHEIA
========================================================= */

function toggleFullscreen() {

    if (!document.fullscreenElement) {

        document.documentElement
            .requestFullscreen()
            .catch(() => {});

    } else {

        document
            .exitFullscreen()
            .catch(() => {});

    }

}


/* =========================================================
   TEMA CLARO / ESCURO
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const themeLabel =
    document.getElementById("themeLabel");


function applyTheme(theme) {

    document.documentElement
        .setAttribute("data-theme", theme);

    const isDark = theme === "dark";

    themeIcon.textContent = isDark ? "☾" : "☀";

    themeLabel.textContent = isDark ? "Escuro" : "Claro";

    localStorage.setItem(
        "metaltech-theme",
        theme
    );

}


const savedTheme =
    localStorage.getItem("metaltech-theme");


const prefersLight =
    window.matchMedia(
        "(prefers-color-scheme: light)"
    ).matches;


applyTheme(
    savedTheme ||
    (prefersLight ? "light" : "dark")
);


themeToggle.addEventListener(
    "click",
    () => {

        const current =
            document.documentElement
                .getAttribute("data-theme");

        applyTheme(
            current === "dark"
                ? "light"
                : "dark"
        );

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

showSlide(0);