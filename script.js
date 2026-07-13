// =========================================
// TVK Foundation
// script.js (Part 1)
// =========================================

// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// =========================================
// Smooth Scroll
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// =========================================
// Active Navbar
// =========================================

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (pageYOffset >= top) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// =========================================
// Scroll Animation
// =========================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach((sec) => {

    sec.classList.add("hidden");

    observer.observe(sec);

});// =========================================
// TVK Foundation
// script.js (Part 2)
// =========================================


// ===============================
// Counter Animation
// ===============================

const counters = document.querySelectorAll(".stat-box h2");

const speed = 100;

counters.forEach(counter => {

    const update = () => {

        const target = counter.innerText.replace(/[^\d]/g,"");

        if(target=="") return;

        const count = +counter.getAttribute("data-count") || 0;

        const increment = Math.ceil(target / speed);

        if(count < target){

            const value = count + increment;

            counter.setAttribute("data-count", value);

            counter.innerText = value;

            setTimeout(update,20);

        }else{

            counter.innerText = target +
            (counter.innerText.includes("%")?"%":"");

        }

    }

    update();

});


// ===============================
// Hero Floating Animation
// ===============================

const heroImage = document.querySelector(".hero-image");

if(heroImage){

setInterval(()=>{

heroImage.classList.toggle("float");

},2000);

}


// ===============================
// Scroll To Top
// ===============================

const topBtn=document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.right="20px";
topBtn.style.bottom="20px";
topBtn.style.padding="12px 15px";
topBtn.style.background="#D4AF37";
topBtn