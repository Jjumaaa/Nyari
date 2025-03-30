document.addEventListener('DOMContentLoaded', function() {
    // Current Year for Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Dropdown Menu
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close Announcement Bar
    const announcementBar = document.querySelector('.announcement-bar');
    const closeAnnouncement = document.querySelector('.close-announcement');
    
    if (closeAnnouncement) {
        closeAnnouncement.addEventListener('click', function() {
            announcementBar.style.display = 'none';
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(slideIndex) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = slideIndex;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

    // Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Calendar Functionality
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthEl = document.getElementById('current-month');
    const calendarDays = document.getElementById('calendar-days');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    function renderCalendar() {
        // Clear previous days
        calendarDays.innerHTML = '';
        
        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day-header');
            dayEl.textContent = day;
            calendarDays.appendChild(dayEl);
        });
        
        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Add empty cells for days before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day');
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = day;
            
            // Highlight current day
            if (currentYear === currentDate.getFullYear() && 
                currentMonth === currentDate.getMonth() && 
                day === currentDate.getDate()) {
                dayEl.classList.add('today');
            }
            
            // Mark days with events (example)
            if (day % 5 === 0 || day % 7 === 0) {
                dayEl.classList.add('event');
            }
            
            calendarDays.appendChild(dayEl);
        }
        
        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    renderCalendar();

    // Donation Amount Buttons
    const amountOptions = document.querySelectorAll('.amount-option');
    const amountInput = document.getElementById('amount');
    
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.amount !== 'other') {
                amountInput.value = this.dataset.amount;
            } else {
                amountInput.value = '';
                amountInput.focus();
            }
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const donationForm = document.getElementById('donation-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Redirecting to secure payment processor...');
            // In a real implementation, this would redirect to payment gateway
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Responsive Iframes (for embedded content)
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('iframe-container');
        iframe.parentNode.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
    });
});