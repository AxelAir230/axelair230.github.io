const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

const scrollUpBtn = document.getElementById('scroll-up');
const scrollDownBtn = document.getElementById('scroll-down');
const sectionsArray = Array.from(sections);

function getCurrentSectionIndex() {
    let currentIndex = 0;
    sectionsArray.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            currentIndex = index;
        }
    });
    return currentIndex;
}

function updateArrowVisibility() {
    const currentIndex = getCurrentSectionIndex();

    if (currentIndex === 0) {
        scrollUpBtn.style.opacity = '0.2';
        scrollUpBtn.style.cursor = 'default';
        scrollUpBtn.style.pointerEvents = 'none';
    } else {
        scrollUpBtn.style.opacity = '1';
        scrollUpBtn.style.cursor = 'pointer';
        scrollUpBtn.style.pointerEvents = 'auto';
    }

    if (currentIndex === sectionsArray.length - 1) {
        scrollDownBtn.style.opacity = '0.2';
        scrollDownBtn.style.cursor = 'default';
        scrollDownBtn.style.pointerEvents = 'none';
    } else {
        scrollDownBtn.style.opacity = '1';
        scrollDownBtn.style.cursor = 'pointer';
        scrollDownBtn.style.pointerEvents = 'auto';
    }
}

window.addEventListener('scroll', updateArrowVisibility);
updateArrowVisibility();

scrollUpBtn.addEventListener('click', () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
        sectionsArray[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
});

scrollDownBtn.addEventListener('click', () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sectionsArray.length - 1) {
        sectionsArray[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
});

const terminalTextElement = document.getElementById("terminal-text");
const competencesSection = document.getElementById("competences");

const textToType = `> ./load_skills.sh
Initialisation du module [COMPÉTENCES]...
Chargement des données... [OK]

[+] ADMINISTRATION SYSTÈMES
  ├── Windows Server (AD, GPO, DNS, DHCP)
  ├── Linux (Hardening Debian/Ubuntu)
  └── Scripting (PowerShell/Bash)

[+] SÉCURITÉ & RÉSEAUX
  ├── Firewalling (filtrage, ACL)
  ├── VPN (IPsec / SSL)
  └── Routage OSPF & Segmentation VLAN

[+] INFRASTRUCTURE & VIRTUALISATION
  ├── VMware (ESXi/vCenter) & Hyper-V
  └── Sauvegarde et PRA

[+] MÉTHODES & OUTILS
  ├── Supervision (Zabbix / GLPI)
  ├── Git & Gestion Agile
  └── Assistance IA (Claude, Gemini, ChatGPT)

> En attente d'une nouvelle commande...`;

let i = 0;
let isTyping = false;

function typeWriter() {
    if (i < textToType.length) {
        terminalTextElement.innerHTML += textToType.charAt(i);
        i++;

        let speed = Math.random() * 20 + 10;

        if (textToType.charAt(i - 1) === '\n') {
            speed = 200;
        }
        if (textToType.substring(i - 4, i) === '[OK]') {
            speed = 600;
        }

        setTimeout(typeWriter, speed);
    }
}

const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isTyping) {
            isTyping = true;
            setTimeout(typeWriter, 500);
        }
    });
}, { threshold: 0.5 });

if (competencesSection) {
    terminalObserver.observe(competencesSection);
}

const modal = document.getElementById("legal-modal");
const openModalBtn = document.getElementById("open-legal");
const closeModalBtn = document.querySelector(".close-btn");

openModalBtn.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00e5ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00e5ff",
                "opacity": 0.3,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 180, "line_linked": { "opacity": 0.8 } },
                "push": { "particles_nb": 3 }
            }
        },
        "retina_detect": true
    });
}
