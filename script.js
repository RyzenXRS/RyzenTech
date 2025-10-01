

$(document).ready(function() {
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scroll 
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000, 'easeInOutExpo');
        }
    });

    // Menu close on click (buat mobile)
    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Counter animation untuk statistik di about section
    function animateCounters() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var target = parseInt($this.data('target'));
            var current = 0;
            var increment = target / 100;
            var timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                $this.text(Math.floor(current) + (target > 100 ? '+' : ''));
            }, 20);
        });
    }

    // Interaksi dengan Intersection Observer untuk animasi fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // animasi penghitung saat bagian tentang terlihat
                if (entry.target.id === 'about') {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    $('.service-card, .portfolio-item, .about-content, .contact-form').each(function() {
        $(this).addClass('fade-in');
        observer.observe(this);
    });


    $('.service-card').hover(
        function() {
            $(this).find('.service-icon').css('transform', 'scale(1.1) rotate(5deg)');
        },
        function() {
            $(this).find('.service-icon').css('transform', 'scale(1) rotate(0deg)');
        }
    );

 
    $('.portfolio-item').on('click', function() {
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 300);
    });

   
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
  
        var formData = {
            name: $(this).find('input[placeholder="Nama Lengkap"]').val(),
            email: $(this).find('input[placeholder="Email"]').val(),
            subject: $(this).find('input[placeholder="Subjek"]').val(),
            message: $(this).find('textarea').val()
        };

        // basic validasi
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Mohon lengkapi semua field!', 'error');
            return;
        }

        // Validasi email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }

        // simulasi pengiriman
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.text();
        
        submitBtn.text('Mengirim...').prop('disabled', true);
        
        setTimeout(function() {
            submitBtn.text(originalText).prop('disabled', false);
            $('.contact-form')[0].reset();
            showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
        }, 2000);
    });

    // notifikasi sistem
    function showNotification(message, type) {
        var notificationClass = type === 'success' ? 'alert-success' : 'alert-danger';
        var notification = $(`
            <div class="alert ${notificationClass} alert-dismissible fade show notification" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('body').append(notification);
        
        setTimeout(function() {
            notification.alert('close');
        }, 5000);
    }


    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var parallax = $('.hero-section');
        var speed = scrolled * 0.1;
        
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });


    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect
    setTimeout(function() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        }
    }, 1000);

    // Floating animation for hero cards
    $('.floating-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.5) + 's');
    });

    // Service link hover effect
    $('.service-link').hover(
        function() {
            $(this).find('i').css('transform', 'translateX(5px)');
        },
        function() {
            $(this).find('i').css('transform', 'translateX(0)');
        }
    );

    // Add loading animation to page
    $('body').addClass('loaded');

    // Scroll to top functionality
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            if (!$('.scroll-to-top').length) {
                $('body').append(`
                    <button class="scroll-to-top" style="
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(135deg, #6366f1, #8b5cf6);
                        border: none;
                        border-radius: 50%;
                        color: white;
                        font-size: 1.2rem;
                        cursor: pointer;
                        z-index: 1000;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
                    ">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                `);
            }
        } else {
            $('.scroll-to-top').remove();
        }
    });

    // Scroll to top click handler
    $(document).on('click', '.scroll-to-top', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // Add hover effects to scroll to top button
    $(document).on('mouseenter', '.scroll-to-top', function() {
        $(this).css({
            'transform': 'translateY(-3px) scale(1.1)',
            'box-shadow': '0 8px 25px rgba(99, 102, 241, 0.6)'
        });
    }).on('mouseleave', '.scroll-to-top', function() {
        $(this).css({
            'transform': 'translateY(0) scale(1)',
            'box-shadow': '0 4px 15px rgba(99, 102, 241, 0.4)'
        });
    });

    // Initialize AOS (Animate On Scroll) alternative
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        elements.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    initScrollAnimations();

    
    $('.portfolio-filter').on('click', function() {
        var filter = $(this).data('filter');
        $('.portfolio-filter').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.portfolio-item').fadeIn();
        } else {
            $('.portfolio-item').hide();
            $('.portfolio-item[data-category="' + filter + '"]').fadeIn();
        }
    });

    $('.btn').on('click', function(e) {
        var ripple = $('<span class="ripple"></span>');
        var size = Math.max($(this).outerWidth(), $(this).outerHeight());
        var x = e.pageX - $(this).offset().left - size / 2;
        var y = e.pageY - $(this).offset().top - size / 2;
        
        ripple.css({
            width: size,
            height: size,
            left: x,
            top: y
        }).appendTo(this);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    console.log('TechSolution Landing Page loaded successfully!');
});

$.easing.easeInOutExpo = function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};


$('<style>')
    .prop('type', 'text/css')
    .html(`
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .clicked {
            transform: scale(0.95);
            transition: transform 0.1s ease;
        }
        .notification {
            animation: slideInRight 0.5s ease;
        }
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `)
    .appendTo('head');