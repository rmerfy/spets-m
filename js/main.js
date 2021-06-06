document.addEventListener('DOMContentLoaded', function () {
    //slider

    var slider = new Swiper('.slider__content', {
        speed: 400,
        spaceBetween: 5,
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {

            625: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 4,
                loop: false
            }
        },
    });


    // tabs 

    let list = document.querySelectorAll('#tabNav a');
    list = Array.prototype.slice.call(list, 0); // convert nodeList to Array
    list.forEach(function (el, i, ar) {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            var tab = document.querySelector(el.getAttribute('href'));

            // remove "act" class
            document.querySelector('#tabNav .act')
                .classList.remove('act');
            document.querySelector('#tabsWrap .act')
                .classList.remove('act');

            // set "act"
            el.classList.add('act');
            tab.classList.add('act');
        })
    })
    //page sliders

    var completedThumbs = new Swiper('.completed-job__thumbs', {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 1,
        loop: true,
        loopedSlides: 5,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            580: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            892: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var completedJob = new Swiper('.completed-job__slider', {
        speed: 400,
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5,
        thumbs: {
            swiper: completedThumbs
        }
    });

    var license = new Swiper('.license__slider', {
        speed: 400,
        spaceBetween: 10,
        loop: true,
        loopedSlides: 4,
        slidesPerView: 1,
        breakpoints: {
            680: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });





    // меню

    const menuBtn = document.querySelector('.menu-btn'),
        menuClose = document.querySelector('.menu__close'),
        menu = document.querySelector('.menu__wrapper');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    menuClose.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    //inputmask

    var phone = document.querySelectorAll("input[type='tel']");
    var im = new Inputmask("+7 (999) 999-99-99");
    im.mask(phone);

    // scroll menu
    const menuBlock = document.querySelector('.header'),
        page = document.querySelector('.page');


    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= 200) {
            menuBlock.classList.add('header--fixed');
            page.classList.add('page--scroll');
        } else if (window.pageYOffset < 200) {
            menuBlock.classList.remove('header--fixed');
            page.classList.remove('page--scroll');
        }
    });

    //E-mail Ajax Send
    $("form").submit(function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: th.serialize()
        }).done(function () {
            callbackModal.close();
            submitModal.open();
            $('.form').css('width', '100%');
            setTimeout(function () {
                // Выполнено
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });


    // Форма

    const

        btnNext = document.querySelector('.form-calc__next'),
        btnPrev = document.querySelector('.form-calc__prev'),
        btnSubmit = document.querySelector('.form-calc__submit'),
        step = document.querySelectorAll('.step');
    var currentTab = 0;

    if (step.length != 0) {
        showTab(currentTab);

        function showTab(n) {
            step[n].style.display = "block";
            step[n].classList.remove('step--active');
            if (n == 4) {
                btnNext.style.display = "none";
                btnSubmit.style.display = "inline-block";
            } else {
                btnNext.style.display = "inline-block";
                btnSubmit.style.display = "none";

            }
            if (n == 0) {
                btnPrev.style.display = "none";
            } else {
                btnPrev.style.display = "inline-block";
            }

            fixStepIndicator(n);
        }

        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            nextPrev(1);
        });

        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            nextPrev(-1);
        });

        function nextPrev(n) {
            step[currentTab].style.display = "none";
            currentTab = currentTab + n;
            showTab(currentTab);
        }


        function fixStepIndicator(n) {
            var progress = document.querySelector('.form-calc__progress-bar');
            var number = document.querySelector('.current');
            number.innerHTML = n + 1;
            switch (n) {
                case 0:
                    progress.style.width = "20%";
                    break;

                case 1:
                    progress.style.width = "40%";
                    break;

                case 2:
                    progress.style.width = "60%";
                    break;

                case 3:
                    progress.style.width = "80%";
                    break;

                case 4:
                    progress.style.width = "100%";
                    break;

            }

        }
    }



    // modals
    var submitModal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Закрыть",
        cssClass: ['custom-class-2'],
    });

    submitModal.setContent('<div class="modal__content"><h2 class="title modal__title">Спасибо!</h2><span class="step__select-title">Мы свяжемся с вами в течение 20 минут</span></div>');


    // modals quest

    var questBtns = document.querySelectorAll('.questions__item-title');

    if (questBtns != null) {
        var questionsModal1 = new tingle.modal({
            footer: false,
            stickyFooter: false,
            closeMethods: ['overlay', 'button', 'escape'],
            closeLabel: "Закрыть",
            cssClass: ['questions__modal'],
        });

        questionsModal1.setContent(document.querySelector('.questions__item-info--1').innerHTML);


        var questionsModal2 = new tingle.modal({
            footer: false,
            stickyFooter: false,
            closeMethods: ['overlay', 'button', 'escape'],
            closeLabel: "Закрыть",
            cssClass: ['questions__modal'],
        });

        questionsModal2.setContent(document.querySelector('.questions__item-info--2').innerHTML);


        var questionsModal3 = new tingle.modal({
            footer: false,
            stickyFooter: false,
            closeMethods: ['overlay', 'button', 'escape'],
            closeLabel: "Закрыть",
            cssClass: ['questions__modal'],
        });

        questionsModal3.setContent(document.querySelector('.questions__item-info--3').innerHTML);


        questBtns[0].addEventListener('click', function () {
            questionsModal1.open();
        });
        questBtns[1].addEventListener('click', function () {
            questionsModal2.open();
        });
        questBtns[2].addEventListener('click', function () {
            questionsModal3.open();
        });

    }



    // sub-menu

    var menuItems = document.querySelectorAll('.menu-item-has-children');

    function resetMenuItems() {
        menuItems.forEach((menuItem) => {
            if (menuItem.classList.contains('active')) {
                menuItem.classList.remove('active');
            }
        });
    }
    menuItems.forEach((menuItem) => {
        menuItem.addEventListener('click', function (e) {
            // e.preventDefault();
            if (menuItem.classList.contains('active')) {
                menuItem.classList.remove('active');
            } else {
                resetMenuItems();
                menuItem.classList.add('active');
            }

        });
    });

    // quest 

    $('input[type="checkbox"]').on('change', function () {
        $('input[type="checkbox"]').not(this).prop('checked', true);
    });

    // плавный скролл 

    document.querySelectorAll('.scrollto[href^="#"').forEach(link => {

        link.addEventListener('click', function (e) {
            // e.preventDefault();

            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);

            // const topOffset = document.querySelector('.scrollto').offsetHeight;
            const topOffset = 100; // отступ сверху 
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

});