/**
 * DR TECANY | دكتور تقني — Engineering-Grade Interactive Script
 * Pure Vanilla JavaScript (ES6+) — Compliant with UI/UX Guard & WCAG 2.2 AA
 */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ==========================================================================
       1. Sticky Navbar, ScrollSpy & Accessible Mobile Menu
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    const closeMobileMenu = () => {
        if (!navLinksContainer || !menuToggle) return;
        navLinksContainer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    const handleScroll = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // ScrollSpy
        let currentSection = 'hero';
        const scrollPos = window.scrollY + 160;

        sections.forEach((sec) => {
            if (scrollPos >= sec.offsetTop) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinksContainer.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ==========================================================================
       2. Signature Hero Telemetry Bench (Before vs After Maintenance)
       ========================================================================== */
    const benchBeforeBtn = document.getElementById('benchBeforeBtn');
    const benchAfterBtn = document.getElementById('benchAfterBtn');
    const telTemp = document.getElementById('telTemp');
    const telTempStatus = document.getElementById('telTempStatus');
    const telTempBar = document.getElementById('telTempBar');
    const telBoot = document.getElementById('telBoot');
    const telBootStatus = document.getElementById('telBootStatus');
    const telBootBar = document.getElementById('telBootBar');

    const updateBenchmark = (mode) => {
        if (!telTemp || !telBoot) return;
        const isBefore = mode === 'before';

        benchBeforeBtn.classList.toggle('active', isBefore);
        benchBeforeBtn.setAttribute('aria-pressed', String(isBefore));
        benchAfterBtn.classList.toggle('active', !isBefore);
        benchAfterBtn.setAttribute('aria-pressed', String(!isBefore));

        if (isBefore) {
            telTemp.textContent = '94°C';
            telTemp.className = 'telemetry-val bad';
            telTempStatus.textContent = 'سخونة حرجة';
            telTempStatus.className = 'telemetry-tag bad';
            telTempBar.style.width = '92%';
            telTempBar.parentElement.className = 'progress-mini bad';

            telBoot.textContent = '68.0 sec';
            telBoot.className = 'telemetry-val bad';
            telBootStatus.textContent = 'بطء شديد';
            telBootStatus.className = 'telemetry-tag bad';
            telBootBar.style.width = '22%';
            telBootBar.parentElement.className = 'progress-mini bad';
        } else {
            telTemp.textContent = '44°C';
            telTemp.className = 'telemetry-val good';
            telTempStatus.textContent = 'تبريد مثالي';
            telTempStatus.className = 'telemetry-tag good';
            telTempBar.style.width = '38%';
            telTempBar.parentElement.className = 'progress-mini';

            telBoot.textContent = '6.8 sec';
            telBoot.className = 'telemetry-val cyan';
            telBootStatus.textContent = 'أسرع 10X';
            telBootStatus.className = 'telemetry-tag cyan';
            telBootBar.style.width = '94%';
            telBootBar.parentElement.className = 'progress-mini cyan';
        }
    };

    if (benchBeforeBtn && benchAfterBtn) {
        benchBeforeBtn.addEventListener('click', () => updateBenchmark('before'));
        benchAfterBtn.addEventListener('click', () => updateBenchmark('after'));
    }

    /* ==========================================================================
       3. Scroll Reveal & Animated Counters (Respecting Reduced Motion)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up');

    if (prefersReducedMotion) {
        revealElements.forEach((el) => el.classList.add('visible'));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        revealElements.forEach((el) => revealObserver.observe(el));
    }

    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    const animateCounters = () => {
        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (prefersReducedMotion) {
                counter.textContent = target.toLocaleString('en-US');
                return;
            }
            const duration = 1600;
            const startTime = performance.now();

            const updateCounter = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(eased * target);
                counter.textContent = currentVal.toLocaleString('en-US');

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('en-US');
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const statsBanner = document.querySelector('.stats-banner');
    if (statsBanner) {
        const statsObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !countersStarted) {
                    countersStarted = true;
                    animateCounters();
                }
            },
            { threshold: 0.3 }
        );
        statsObserver.observe(statsBanner);
    }

    /* ==========================================================================
       4. Interactive Quick Diagnostic Tool (Keyboard Accessible Tabs)
       ========================================================================== */
    const diagnosticData = {
        slow: {
            category: 'تشخيص الأداء ووحدات التخزين',
            time: 'الوقت المتوقع للإصلاح: 45 – 60 دقيقة',
            title: 'السبب الهندسي المحتمل: اختناق سرعة القراءة في الهارد التقليدي (HDD) أو استهلاك الذاكرة العشوائية',
            desc: 'عندما يعتمد اللابتوب على قرص صلب ميكانيكي قديم أو نسخة ويندوز متراكمة بالملفات المؤقتة، تنخفض سرعة الاستجابة بنسبة تصل إلى 80%. الحل الجذري هو الترقية إلى وحدة تخزين SSD / NVMe فائقة السرعة مع ضبط النظام.',
            steps: ['✓ تركيب وحدة SSD أو M.2 NVMe', '✓ رفع الذاكرة العشوائية RAM', '✓ نقل النظام والملفات بدون فورمات'],
            serviceRec: 'ترقية RAM و SSD + تحسين الأداء',
            formValue: 'ترقية RAM و SSD'
        },
        heat: {
            category: 'تشخيص التبريد والحرارة',
            time: 'الوقت المتوقع للإصلاح: 45 دقيقة',
            title: 'السبب الهندسي المحتمل: انسداد فتحات التبريد بالأتربة وجفاف المعجون الحراري',
            desc: 'ارتفاع الحرارة يؤدي إلى هبوط حاد في الأداء (Thermal Throttling) أو انطفاء اللابتوب المفاجئ لحماية المعالج. نقوم بتنظيف دورة التبريد بالكامل ووضع معجون حراري احترافي عالي التوصيل.',
            steps: ['✓ تنظيف المراوح والمشتت الحراري', '✓ تغيير المعجون الحراري الاحترافي', '✓ فحص سرعة دوران المروحة'],
            serviceRec: 'باقة الأداء والتبريد القصوى',
            formValue: 'باقة الأداء والتبريد القصوى'
        },
        hardware: {
            category: 'تشخيص الهاردوير والمكونات',
            time: 'الوقت المتوقع للإصلاح: 60 – 120 دقيقة',
            title: 'السبب الهندسي المحتمل: تلف في الشاشة أو الكيبورد أو كسر في مفاصل الشاسية',
            desc: 'نوفر قطع غيار أصلية مطابقة لموديل جهازك (شاشات IPS/FHD، كيبورد مضيء أو عادي، بطاريات أصلية) بالإضافة إلى إصلاح وتدعيم مفاصل اللابتوب المكسورة بدقة عالية تعيدها كالمصنع.',
            steps: ['✓ فحص مجاني للقطعة التالفة', '✓ استبدال بقطعة أصلية بضمان', '✓ إصلاح وتدعيم المفاصل وسوكيت الشحن'],
            serviceRec: 'صيانة الهاردوير المتقدمة',
            formValue: 'صيانة الهاردوير'
        },
        virus: {
            category: 'تشخيص الحماية وأمن البيانات',
            time: 'الوقت المتوقع للإصلاح: 45 – 60 دقيقة',
            title: 'السبب الهندسي المحتمل: إصابة ببرمجيات خبيثة أو فيروسات الفدية والاختصارات',
            desc: 'نقوم بفحص عميق لكافة الأقراص وإزالة الفيروسات وملفات التجسس والإعلانات المزعجة نهائياً مع الحفاظ الكامل على ملفاتك الشخصية، وتثبيت حماية قوية تمنع تكرار الإصابة.',
            steps: ['✓ تطهير شامل من الفيروسات والـ Malware', '✓ استرجاع الملفات المخفية أو التالفة', '✓ تثبيت جدار حماية أصلي خفيف'],
            serviceRec: 'إزالة الفيروسات وحماية البيانات',
            formValue: 'إزالة الفيروسات وحماية البيانات'
        },
        windows: {
            category: 'تشخيص نظام التشغيل والبرامج',
            time: 'الوقت المتوقع للإصلاح: 45 دقيقة',
            title: 'السبب الهندسي المحتمل: تلف ملفات النظام أو تعارض في تعريفات كرت الشاشة',
            desc: 'نثبت لك أحدث إصدار رسمي من Windows 10 أو Windows 11 مع جميع التعريفات الأصلية من موقع الشركة المصنعة، وحزمة البرامج المكتبية والهندسية أو برامج التصميم بأعلى استقرار.',
            steps: ['✓ نسخ احتياطي آمن لملفاتك', '✓ تثبيت ويندوز أصلي وتعريفات المصنع', '✓ تثبيت برامج الأوفيس والتخصص'],
            serviceRec: 'تثبيت ويندوز وبرامج احترافية',
            formValue: 'تثبيت ويندوز وبرامج'
        },
        power: {
            category: 'تشخيص اللوحة الأم ودائرة الطاقة',
            time: 'الوقت المتوقع للفحص: 30 دقيقة',
            title: 'السبب الهندسي المحتمل: خلل في دائرة الباور أو آي سي الشحن على الماذربورد',
            desc: 'لا داعي لتغيير اللوحة الأم بالكامل بتكلفة باهظة! يقوم مهندسو الهاردوير لدينا بتتبع مسارات الطاقة مجهرياً وتحديد المكثف أو الـ IC التالف واستبداله بدقة مع ضمان معتمد.',
            steps: ['✓ فحص مجهري لدائرة الباور والشحن', '✓ إصلاح اللوحة الأم (Motherboard)', '✓ اختبار ثبات الجهد الكهربائي'],
            serviceRec: 'صيانة الهاردوير (إصلاح الماذربورد)',
            formValue: 'صيانة الهاردوير'
        }
    };

    const symptomBtns = Array.from(document.querySelectorAll('.symptom-btn'));
    const diagCategory = document.getElementById('diagCategory');
    const diagTime = document.getElementById('diagTime');
    const diagTitle = document.getElementById('diagTitle');
    const diagDesc = document.getElementById('diagDesc');
    const diagSteps = document.getElementById('diagSteps');
    const diagServiceRec = document.getElementById('diagServiceRec');
    const diagBookBtn = document.getElementById('diagBookBtn');
    const diagnosticPanel = document.getElementById('diagnosticPanel');

    const activateSymptomTab = (btn) => {
        symptomBtns.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        if (diagnosticPanel && btn.id) {
            diagnosticPanel.setAttribute('aria-labelledby', btn.id);
        }

        const key = btn.getAttribute('data-symptom');
        const info = diagnosticData[key];
        if (!info) return;

        diagCategory.textContent = info.category;
        diagTime.textContent = info.time;
        diagTitle.textContent = info.title;
        diagDesc.textContent = info.desc;
        diagSteps.innerHTML = info.steps
            .map((step) => `<span class="diag-step-pill">${step}</span>`)
            .join('');
        diagServiceRec.textContent = info.serviceRec;
        diagBookBtn.setAttribute('data-service', info.formValue);
    };

    symptomBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => activateSymptomTab(btn));
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                const next = symptomBtns[(idx + 1) % symptomBtns.length];
                next.focus();
                activateSymptomTab(next);
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = symptomBtns[(idx - 1 + symptomBtns.length) % symptomBtns.length];
                prev.focus();
                activateSymptomTab(prev);
            }
        });
    });

    /* ==========================================================================
       5. Pre-fill Contact Form when clicking Service / Package Buttons
       ========================================================================== */
    const serviceSelect = document.getElementById('serviceType');
    const clientNameInput = document.getElementById('clientName');
    const contactSection = document.getElementById('contact');

    const selectServiceAndScroll = (serviceName) => {
        if (serviceSelect && serviceName) {
            const options = Array.from(serviceSelect.options);
            const match = options.find((opt) => opt.value === serviceName);
            if (match) {
                serviceSelect.value = serviceName;
                serviceSelect.closest('.form-group')?.classList.remove('invalid');
            }
        }
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            setTimeout(() => {
                if (clientNameInput) clientNameInput.focus();
            }, prefersReducedMotion ? 50 : 550);
        }
    };

    document.querySelectorAll('.select-service-btn, .select-service-link').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const service = btn.getAttribute('data-service');
            selectServiceAndScroll(service);
        });
    });

    if (diagBookBtn) {
        diagBookBtn.addEventListener('click', () => {
            const service = diagBookBtn.getAttribute('data-service');
            selectServiceAndScroll(service);
        });
    }

    /* ==========================================================================
       6. Currency Switcher in Pricing Section
       ========================================================================== */
    const currencyBtns = document.querySelectorAll('.currency-btn');
    const priceValues = document.querySelectorAll('.price-val');
    const priceCurrs = document.querySelectorAll('.price-curr');

    const currencySymbols = {
        EGP: 'ج.م',
        SAR: 'ر.س',
        USD: '$'
    };

    currencyBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            currencyBtns.forEach((b) => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const curr = btn.getAttribute('data-currency');
            const attrName = `data-${curr.toLowerCase()}`;

            priceValues.forEach((valEl) => {
                const newPrice = valEl.getAttribute(attrName);
                if (newPrice) {
                    valEl.textContent = newPrice;
                }
            });

            priceCurrs.forEach((currEl) => {
                currEl.textContent = currencySymbols[curr] || 'ج.م';
            });
        });
    });

    /* ==========================================================================
       7. Testimonials Category Filter
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const reviewCards = document.querySelectorAll('.review-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const filter = btn.getAttribute('data-filter');
            reviewCards.forEach((card) => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ==========================================================================
       8. FAQ Accordion (Accessible aria-expanded)
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                faqItems.forEach((i) => {
                    i.classList.remove('active');
                    i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    item.classList.add('active');
                    questionBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    /* ==========================================================================
       9. Active Contact Form Validation, Loading State & Accessible Modal [A-8, A-9, F-2, F-4]
       ========================================================================== */
    const bookingForm = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const doneModalBtn = document.getElementById('doneModalBtn');
    const printTicketBtn = document.getElementById('printTicketBtn');
    const modalTicketId = document.getElementById('modalTicketId');
    const modalSummary = document.getElementById('modalSummary');
    const whatsappConfirmBtn = document.getElementById('whatsappConfirmBtn');

    const backgroundLandmarks = [
        document.getElementById('topBar'),
        document.getElementById('navbar'),
        document.getElementById('mainContent'),
        document.getElementById('footer')
    ].filter(Boolean);

    let lastFocusedElement = null;

    const escapeHtml = (str) =>
        str.replace(/[&<>"']/g, (ch) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[ch]));

    const validateField = (inputEl) => {
        const group = inputEl.closest('.form-group');
        if (!group) return true;
        const val = inputEl.value.trim();
        let valid = val.length >= 2;

        if (inputEl.id === 'clientPhone') {
            valid = /^[0-9+\-\s()]{8,16}$/.test(val);
        } else if (inputEl.id === 'serviceType') {
            valid = val.length > 0;
        }

        group.classList.toggle('invalid', !valid);
        inputEl.setAttribute('aria-invalid', String(!valid));
        return valid;
    };

    const requiredIds = ['clientName', 'clientPhone', 'laptopModel', 'serviceType'];
    requiredIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => validateField(el));
            el.addEventListener('change', () => validateField(el));
        }
    });

    const openModal = () => {
        if (!successModal) return;
        lastFocusedElement = document.activeElement;
        successModal.removeAttribute('hidden');
        backgroundLandmarks.forEach((el) => {
            el.setAttribute('inert', '');
            el.setAttribute('aria-hidden', 'true');
        });
        if (closeModalBtn) closeModalBtn.focus();
    };

    const closeModal = () => {
        if (!successModal || successModal.hasAttribute('hidden')) return;
        successModal.setAttribute('hidden', '');
        backgroundLandmarks.forEach((el) => {
            el.removeAttribute('inert');
            el.removeAttribute('aria-hidden');
        });
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    };

    // Focus Trap & Escape Key Handler [A-2, A-8]
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (successModal && !successModal.hasAttribute('hidden')) {
                closeModal();
            } else if (navLinksContainer && navLinksContainer.classList.contains('open')) {
                closeMobileMenu();
                menuToggle?.focus();
            }
            return;
        }

        if (e.key === 'Tab' && successModal && !successModal.hasAttribute('hidden')) {
            const focusable = Array.from(
                successModal.querySelectorAll('button:not([disabled]), a[href]')
            );
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameEl = document.getElementById('clientName');
            const phoneEl = document.getElementById('clientPhone');
            const modelEl = document.getElementById('laptopModel');
            const serviceEl = document.getElementById('serviceType');
            const detailsEl = document.getElementById('issueDetails');
            const deliveryEl = document.querySelector('input[name="deliveryMethod"]:checked');

            const fields = [nameEl, phoneEl, modelEl, serviceEl];
            let firstInvalid = null;

            fields.forEach((field) => {
                const ok = validateField(field);
                if (!ok && !firstInvalid) {
                    firstInvalid = field;
                }
            });

            // Scroll to and focus first invalid field [F-2]
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
                firstInvalid.focus();
                return;
            }

            // Loading state on submit button [F-4, L-1, L-3]
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');
            const originalText = submitBtnText.textContent;
            submitBtnText.textContent = 'جاري إصدار تذكرة الحجز...';

            setTimeout(() => {
                const ticketNum = `#DR-${Math.floor(1000 + Math.random() * 9000)}`;
                const safeName = escapeHtml(nameEl.value.trim());
                const safePhone = escapeHtml(phoneEl.value.trim());
                const safeModel = escapeHtml(modelEl.value.trim());
                const safeService = escapeHtml(serviceEl.value);
                const deliveryMethod = deliveryEl ? escapeHtml(deliveryEl.value) : 'زيارة مقر المركز';
                const issueText = escapeHtml(detailsEl.value.trim() || 'فحص وتشخيص شامل');

                modalTicketId.textContent = `TICKET ${ticketNum}`;
                modalSummary.innerHTML = `
                    <div><strong>الاسم:</strong> <bdi>${safeName}</bdi></div>
                    <div><strong>الهاتف:</strong> <span dir="ltr">${safePhone}</span></div>
                    <div><strong>الجهاز:</strong> <bdi>${safeModel}</bdi></div>
                    <div><strong>الخدمة المطلوبة:</strong> <bdi>${safeService}</bdi></div>
                    <div><strong>طريقة الخدمة:</strong> ${deliveryMethod}</div>
                    <div><strong>الملاحظات:</strong> <bdi>${issueText}</bdi></div>
                `;

                const waMessage = encodeURIComponent(
                    `مرحباً مركز دكتور تقني (DR TECANY)\n` +
                    `أود تأكيد حجز صيانة رقم (${ticketNum}):\n` +
                    `• الاسم: ${nameEl.value.trim()}\n` +
                    `• الهاتف: ${phoneEl.value.trim()}\n` +
                    `• موديل اللابتوب: ${modelEl.value.trim()}\n` +
                    `• الخدمة: ${serviceEl.value}\n` +
                    `• طريقة الخدمة: ${deliveryEl ? deliveryEl.value : 'زيارة مقر المركز'}\n` +
                    `• التفاصيل: ${detailsEl.value.trim() || 'فحص وتشخيص شامل'}`
                );
                whatsappConfirmBtn.setAttribute('href', `https://wa.me/?text=${waMessage}`);

                submitBtn.disabled = false;
                submitBtn.removeAttribute('aria-busy');
                submitBtnText.textContent = originalText;

                bookingForm.reset();
                openModal();
            }, 350);
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (doneModalBtn) doneModalBtn.addEventListener('click', closeModal);
    if (printTicketBtn) {
        printTicketBtn.addEventListener('click', () => window.print());
    }
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeModal();
        });
    }
});
