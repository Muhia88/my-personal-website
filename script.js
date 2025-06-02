// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            // Ensure targetElement exists before proceeding
            if (!targetElement) {
                console.warn(`Target element ${targetId} not found for smooth scroll.`);
                return;
            }
            const headerOffset = document.getElementById('header').offsetHeight; // Height of fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navbarUl.classList.contains('active')) {
                navbarUl.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarUl = document.querySelector('#navbar ul');

    if (menuToggle && navbarUl) { // Ensure elements exist
        menuToggle.addEventListener('click', function() {
            navbarUl.classList.toggle('active');
            this.classList.toggle('active'); // For hamburger to X animation
        });
    }


    // Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('main section[id]'); // Select all sections within main with an ID
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        const headerHeight = document.getElementById('header').offsetHeight;

        sections.forEach(current => {
            if (!current) return; // Skip if current section is null (should not happen with querySelectorAll)
            const sectionHeight = current.offsetHeight;
            // Adjust sectionTop to be slightly higher to trigger highlighting sooner
            const sectionTop = current.offsetTop - headerHeight - 50; // 50px buffer

            const currentId = current.getAttribute('id');
            if (!currentId) return; // Skip if section has no ID

            if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('#navbar ul a').forEach(link => {
                    link.classList.remove('active');
                });
                // Add active class to the corresponding nav link
                const navLinkForSection = document.querySelector('#navbar ul a[href="#' + currentId + '"]');
                if (navLinkForSection) {
                    navLinkForSection.classList.add('active');
                }
            }
        });

        // Special case for hero section at the very top
        if (sections.length > 0 && scrollY < sections[0].offsetTop - headerHeight - 50) {
             document.querySelectorAll('#navbar ul a').forEach(link => {
                link.classList.remove('active');
            });
            const homeLink = document.querySelector('#navbar ul a[href="#hero"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
    // Initial call to set active link on page load
    navHighlighter();


    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) { // Check if the button exists
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) { // Show button after scrolling 300px
                backToTopBtn.style.display = 'block';
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
                // Hide after transition
                setTimeout(() => {
                    if(window.pageYOffset <= 300) backToTopBtn.style.display = 'none';
                }, 300); // Match CSS transition speed
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // Intersection Observer for Fade-in Animations on Scroll
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';// start or resume any CSS animation that is defined for that element
            } 
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused'; // Start paused, will be set to 'running' by observer
        observer.observe(el);
    });


    // Update Footer Year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Log to console that script is loaded
    console.log("Portfolio script loaded successfully. (v2)");

});
