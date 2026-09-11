/**
 * main.js
 * Core functionality for Joshi Madam Astrology Website
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(253, 251, 247, 1)';
            navbar.classList.add('shadow-sm');
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.backgroundColor = 'rgba(253, 251, 247, 0.95)';
            navbar.classList.remove('shadow-sm');
        }
    });

    // 2. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a.nav-link, a.navbar-brand, a.btn');
    
    navLinks.forEach(link => {
        if (link.hash !== "") {
            link.addEventListener('click', function(e) {
                if (this.dataset.bsToggle) return;
                
                const target = document.querySelector(this.hash);
                if (target) {
                    e.preventDefault();
                    
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }
                    
                    const offset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        }
    });

    // 2b. Active Link Tab as Per Scroll (ScrollSpy)
    const trackedSections = Array.from(document.querySelectorAll('header[id], section[id]'))
        .filter(sec => document.querySelector(`.navbar-nav .nav-link[href="#${sec.id}"]`))
        .sort((a, b) => a.offsetTop - b.offsetTop);
        
    const headerNavLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveNavLinkOnScroll() {
        const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

        if (isNearBottom) {
            headerNavLinks.forEach(link => link.classList.remove('active'));
            const contactLink = document.querySelector('.navbar-nav .nav-link[href="#contact"]');
            if (contactLink) contactLink.classList.add('active');
            return;
        }

        const scrollPos = window.scrollY + 120;
        let currentId = trackedSections.length > 0 ? trackedSections[0].id : 'home';

        for (let i = 0; i < trackedSections.length; i++) {
            const section = trackedSections[i];
            if (scrollPos >= section.offsetTop) {
                currentId = section.id;
            } else {
                break;
            }
        }

        headerNavLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLinkOnScroll, { passive: true });
    window.addEventListener('resize', () => {
        // Recalculate section offsets on resize
        trackedSections.sort((a, b) => a.offsetTop - b.offsetTop);
        updateActiveNavLinkOnScroll();
    }, { passive: true });
    updateActiveNavLinkOnScroll();

    // 3. Language Selector Logic (Client-side Dictionary for Demo)
    const translations = {
        'en': {
            'brand.name': 'Joshi Madam',
            
            // Navigation
            'nav.home': 'Home', 'nav.about': 'About', 'nav.services': 'Services', 'nav.whyus': 'Why Choose Us', 'nav.testimonials': 'Testimonials', 'nav.faq': 'FAQ', 'nav.contact': 'Contact', 'nav.book': 'Book Consultation',
            
            // Hero
            'hero.badge': 'Trusted Astrology & Spiritual Guidance',
            'hero.title': 'Discover Clarity, Guidance<br>& a Better Path Forward',
            'hero.subtitle': 'Experience traditional astrological wisdom combined with personalized, confidential consultation to overcome life\'s challenges and unlock your true potential.',
            'hero.cta1': 'Book a Consultation', 'hero.cta2': 'Explore Services',
            'hero.trust1': 'Personal Guidance', 'hero.trust2': 'Confidential Consultation', 'hero.trust3': 'Experienced Astrologer',
            
            // Stats
            'stats.exp': 'Years Experience', 'stats.consult': 'Consultations', 'stats.serv': 'Astrology Services', 'stats.conf': 'Confidential',
            
            // About
            'about.label': 'About The Astrologer',
            'about.title': 'Guidance Rooted in Experience, Tradition & Understanding',
            'about.p1': 'Welcome. I am Joshi Madam, dedicated to providing insightful astrological guidance to help you navigate life\'s complexities.',
            'about.p2': 'With over 15 years of deep study and practice in traditional Indian astrology, my approach combines ancient wisdom with a modern understanding of today\'s challenges. Every individual\'s birth chart is a unique cosmic blueprint, and my goal is to help you decode it to find clarity in your career, relationships, and personal growth.',
            'about.p3': 'All consultations are strictly confidential, offering you a safe space to discuss your deepest concerns and discover a clear path forward.',
            'about.cta': 'Know More About My Services',
            
            // Services
            'services.label': 'Astrology Services',
            'services.title': 'Personalized guidance for life\'s important decisions.',
            'srv.1.t': 'Horoscope Reading', 'srv.1.d': 'Detailed analysis of your birth chart to understand planetary influences on your life path, strengths, and challenges.',
            'srv.2.t': 'Kundli Analysis', 'srv.2.d': 'Comprehensive Kundli generation and interpretation for deep insights into your personality, destiny, and doshas.',
            'srv.3.t': 'Marriage & Compatibility', 'srv.3.d': 'Gun Milan and relationship compatibility analysis to ensure harmony and long-lasting bonds in partnerships.',
            'srv.4.t': 'Career & Business Guidance', 'srv.4.d': 'Astrological insights to choose the right career path, overcome professional hurdles, and achieve financial stability.',
            'srv.5.t': 'Love & Relationships', 'srv.5.d': 'Guidance for relationship issues, understanding partner dynamics, and finding peace in personal connections.',
            'srv.6.t': 'Vastu Consultation', 'srv.6.d': 'Align your living or workspace with natural forces to attract positive energy, prosperity, and well-being.',
            'srv.btn': 'Learn More',
            
            // Featured
            'feat.title': 'Looking for Personal Guidance?',
            'feat.desc': 'Every person\'s journey is different. Get a personalized consultation based on your concerns and goals. Take the first step towards clarity today.',
            'feat.cta': 'Book Your Consultation',
            
            // Why Us
            'why.label': 'Why Choose Us',
            'why.title': 'Committed to Authentic & Honest Guidance',
            'why.1.t': 'Experienced Guidance', 'why.1.d': 'Years of dedicated practice offering deep insights grounded in authentic astrological traditions.',
            'why.2.t': 'Confidential Discussions', 'why.2.d': 'Your privacy is paramount. All consultations are held with the strictest confidentiality and respect.',
            'why.3.t': 'Personalized Consultation', 'why.3.d': 'No generic answers. Every reading is uniquely tailored to your specific birth details and circumstances.',
            'why.4.t': 'Online & In-Person', 'why.4.d': 'Flexible consultation modes allowing you to seek guidance from anywhere in the world.',
            
            // How it works
            'how.label': 'Process', 'how.title': 'How It Works',
            'how.1': 'Choose Service', 'how.2': 'Book Time', 'how.3': 'Discuss', 'how.4': 'Get Guidance', 'how.btn': 'Start Now',
            
            // Zodiac
            'zod.label': 'The Cosmos', 'zod.title': 'Wisdom of the 12 Signs',
            'z.1': 'Aries', 'z.2': 'Taurus', 'z.3': 'Gemini', 'z.4': 'Cancer', 'z.5': 'Leo', 'z.6': 'Virgo', 'z.7': 'Libra', 'z.8': 'Scorpio', 'z.9': 'Sagittarius', 'z.10': 'Capricorn', 'z.11': 'Aquarius', 'z.12': 'Pisces',
            
            // Testimonials
            'test.label': 'Client Stories', 'test.title': 'What People Say',
            'test.1.t': '"The guidance I received was incredibly insightful and helped me navigate a very confusing transition in my career. Highly professional and deeply understanding."',
            'test.1.n': 'Amit S.', 'test.1.s': 'Career Consultation',
            'test.2.t': '"Very respectful and confidential consultation. The Kundli analysis clarified many doubts we had regarding our marriage alignment. We are very grateful."',
            'test.2.n': 'Priya & Rahul M.', 'test.2.s': 'Marriage Compatibility',
            'test.3.t': '"I was impressed by the deep traditional knowledge combined with such a practical modern perspective. It brought me a lot of peace of mind."',
            'test.3.n': 'Neha K.', 'test.3.s': 'Personal Guidance',
            
            // Gallery
            'gal.label': 'Gallery', 'gal.title': 'A Glimpse Into Our Environment',
            
            // FAQ
            'faq.label': 'Questions?', 'faq.title': 'Frequently Asked Questions',
            'faq.1.q': 'What information is required for a horoscope consultation?', 'faq.1.a': 'To create an accurate birth chart (Kundli), we require your exact Date of Birth, Time of Birth (AM/PM), and Place of Birth (City/Town).',
            'faq.2.q': 'Can I consult online?', 'faq.2.a': 'Yes, we offer flexible online consultations via Phone calls, WhatsApp video, or Google Meet, allowing you to seek guidance from the comfort of your home.',
            'faq.3.q': 'Is my information confidential?', 'faq.3.a': 'Absolutely. We strictly adhere to a confidentiality policy. All discussions, personal details, and astrological readings are kept entirely private.',
            'faq.4.q': 'How long does a consultation take?', 'faq.4.a': 'A standard personalized consultation usually takes between 30 to 45 minutes, allowing ample time to discuss your chart and address your specific concerns.',
            
            // Contact
            'cnt.label': 'Get in Touch', 'cnt.title': 'Book Your Astrology Consultation',
            'cnt.f.name': 'Full Name', 'cnt.f.phone': 'Phone Number', 'cnt.f.email': 'Email Address', 'cnt.f.srv': 'Preferred Service', 'cnt.f.srv.def': 'Select a service', 'cnt.f.msg': 'Message / Your Concern', 'cnt.f.btn': 'Request Consultation',
            'cnt.info.title': 'Contact Information', 'cnt.info.desc': 'Reach out to us directly for immediate assistance or to schedule an appointment.',
            'cnt.info.call': 'Call Us', 'cnt.info.wa': 'WhatsApp', 'cnt.info.mail': 'Email', 'cnt.info.add': 'Address', 'cnt.info.hrs': 'Business Hours',
            
            // Footer
            'ft.desc': 'Dedicated to providing traditional astrological wisdom and personalized spiritual guidance to help you navigate life\'s journey with clarity and confidence.',
            'ft.ql': 'Quick Links', 'ft.srv': 'Services', 'ft.lgl': 'Legal & Contact',
            'ft.pp': 'Privacy Policy', 'ft.tc': 'Terms & Conditions', 'ft.dis': 'Disclaimer',
            'ft.cr': '© 2026 Joshi Madam Astrology. All rights reserved.',
            'ft.warn': 'Disclaimer: Astrological readings are based on traditional knowledge and meant for guidance purposes. Outcomes depend on individual karma and effort.'
        },
        'mr': {
            'brand.name': 'जोशी मॅडम',
            'meta.title': 'जोशी मॅडम - विश्वसनीय ज्योतिष आणि आध्यात्मिक मार्गदर्शन',
            
            'nav.home': 'मुख्यपृष्ठ', 'nav.about': 'आमच्याबद्दल', 'nav.services': 'सेवा', 'nav.whyus': 'आम्हाला का निवडा', 'nav.testimonials': 'प्रतिक्रिया', 'nav.faq': 'सामान्य प्रश्न', 'nav.contact': 'संपर्क', 'nav.book': 'सल्ला घ्या',
            
            'hero.badge': 'विश्वसनीय ज्योतिष आणि आध्यात्मिक मार्गदर्शन',
            'hero.title': 'स्पष्टता, मार्गदर्शन<br>आणि उत्तम मार्ग शोधा',
            'hero.subtitle': 'जीवनातील आव्हानांवर मात करण्यासाठी आणि तुमची खरी क्षमता उघड करण्यासाठी वैयक्तिक, गोपनीय सल्ल्यासह पारंपारिक ज्योतिषीय ज्ञानाचा अनुभव घ्या.',
            'hero.cta1': 'सल्ला बुक करा', 'hero.cta2': 'सेवा पहा',
            'hero.trust1': 'वैयक्तिक मार्गदर्शन', 'hero.trust2': 'गोपनीय सल्ला', 'hero.trust3': 'अनुभवी ज्योतिषी',
            
            'stats.exp': 'वर्षांचा अनुभव', 'stats.consult': 'सल्लामसलत', 'stats.serv': 'ज्योतिष सेवा', 'stats.conf': 'गोपनीयता',
            
            'about.label': 'ज्योतिषी बद्दल',
            'about.title': 'अनुभव आणि परंपरेवर आधारित मार्गदर्शन',
            'about.p1': 'नमस्कार. मी जोशी मॅडम आहे, जीवनातील गुंतागुंतीतून मार्ग काढण्यासाठी सखोल ज्योतिषीय मार्गदर्शन देण्यासाठी समर्पित आहे.',
            'about.p2': 'पारंपारिक भारतीय ज्योतिषशास्त्रातील १५ हून अधिक वर्षांचा अभ्यास आणि सरावानंतर, माझा दृष्टिकोन प्राचीन ज्ञान आणि आधुनिक समस्या समजून घेतो. प्रत्येक व्यक्तीची जन्मपत्रिका वेगळी असते, आणि करिअर, नातेसंबंध आणि वैयक्तिक प्रगतीमध्ये स्पष्टता मिळवण्यासाठी मी तुम्हाला मदत करू शकते.',
            'about.p3': 'तुमची सर्व माहिती गोपनीय ठेवली जाते, ज्यामुळे तुम्हाला तुमच्या समस्या सुरक्षितपणे मांडता येतील.',
            'about.cta': 'माझ्या सेवांबद्दल अधिक जाणून घ्या',
            
            'services.label': 'ज्योतिष सेवा',
            'services.title': 'महत्त्वाच्या निर्णयांसाठी वैयक्तिक मार्गदर्शन.',
            'srv.1.t': 'जन्मपत्रिका वाचन', 'srv.1.d': 'तुमच्या जीवनातील ग्रहांचा प्रभाव, सामर्थ्य आणि आव्हाने समजून घेण्यासाठी जन्मपत्रिकेचे सविस्तर विश्लेषण.',
            'srv.2.t': 'कुंडली विश्लेषण', 'srv.2.d': 'व्यक्तिमत्व आणि भविष्यातील दोषांबद्दल सखोल माहिती मिळवण्यासाठी कुंडली तयार करणे आणि विश्लेषण करणे.',
            'srv.3.t': 'विवाह आणि सुसंगतता', 'srv.3.d': 'नातेसंबंधांमध्ये सुसंवाद आणि दीर्घकाळ टिकणारे बंध सुनिश्चित करण्यासाठी गुण मिलान.',
            'srv.4.t': 'करिअर आणि व्यवसाय मार्गदर्शन', 'srv.4.d': 'योग्य करिअर मार्ग निवडण्यासाठी, व्यावसायिक अडचणी दूर करण्यासाठी आणि आर्थिक स्थैर्य मिळवण्यासाठी मार्गदर्शन.',
            'srv.5.t': 'प्रेम आणि नातेसंबंध', 'srv.5.d': 'नातेसंबंधातील समस्यांसाठी मार्गदर्शन, जोडीदाराची गतिशीलता समजून घेणे.',
            'srv.6.t': 'वास्तू सल्ला', 'srv.6.d': 'सकारात्मक ऊर्जा, समृद्धी आणि कल्याणासाठी तुमचे राहण्याचे किंवा कामाचे ठिकाण नैसर्गिक शक्तींशी संरेखित करा.',
            'srv.btn': 'अधिक माहिती',
            
            'feat.title': 'वैयक्तिक मार्गदर्शन शोधत आहात?',
            'feat.desc': 'प्रत्येक व्यक्तीचा प्रवास वेगळा असतो. तुमच्या चिंता आणि ध्येयांवर आधारित वैयक्तिकृत सल्ला मिळवा. स्पष्टतेकडे पहिले पाऊल टाका.',
            'feat.cta': 'तुमचा सल्ला बुक करा',
            
            'why.label': 'आम्हाला का निवडा',
            'why.title': 'प्रामाणिक आणि खऱ्या मार्गदर्शनासाठी वचनबद्ध',
            'why.1.t': 'अनुभवी मार्गदर्शन', 'why.1.d': 'प्रामाणिक ज्योतिषीय परंपरेवर आधारित सखोल अंतर्दृष्टी.',
            'why.2.t': 'गोपनीय चर्चा', 'why.2.d': 'तुमची गोपनीयता सर्वात महत्त्वाची आहे. सर्व चर्चा गोपनीय ठेवल्या जातात.',
            'why.3.t': 'वैयक्तिकृत सल्ला', 'why.3.d': 'कोणतीही सामान्य उत्तरे नाहीत. प्रत्येक वाचन तुमच्या जन्मपत्रिकेनुसार असते.',
            'why.4.t': 'ऑनलाइन आणि प्रत्यक्ष', 'why.4.d': 'जगाच्या पाठीवर कुठूनही मार्गदर्शन मिळवण्यासाठी लवचिक सल्ला पद्धती.',
            
            'how.label': 'प्रक्रिया', 'how.title': 'हे कसे काम करते',
            'how.1': 'सेवा निवडा', 'how.2': 'वेळ निश्चित करा', 'how.3': 'चर्चा करा', 'how.4': 'मार्गदर्शन मिळवा', 'how.btn': 'आता सुरू करा',
            
            'zod.label': 'ब्रह्मांड', 'zod.title': '१२ राशींचे ज्ञान',
            'z.1': 'मेष', 'z.2': 'वृषभ', 'z.3': 'मिथुन', 'z.4': 'कर्क', 'z.5': 'सिंह', 'z.6': 'कन्या', 'z.7': 'तूळ', 'z.8': 'वृश्चिक', 'z.9': 'धनु', 'z.10': 'मकर', 'z.11': 'कुंभ', 'z.12': 'मीन',
            
            'test.label': 'ग्राहकांच्या कथा', 'test.title': 'लोक काय म्हणतात',
            'test.1.t': '"माझ्या करिअरमधील गोंधळाच्या काळात मला मिळालेले मार्गदर्शन अत्यंत उपयुक्त ठरले. खूप व्यावसायिक."',
            'test.1.n': 'अमित एस.', 'test.1.s': 'करिअर सल्ला',
            'test.2.t': '"खूप आदरणीय आणि गोपनीय सल्लामसलत. कुंडली विश्लेषणाने आमच्या विवाहासंबंधीच्या अनेक शंका दूर केल्या."',
            'test.2.n': 'प्रिया आणि राहुल एम.', 'test.2.s': 'विवाह सुसंगतता',
            'test.3.t': '"सखोल पारंपारिक ज्ञान आणि आधुनिक दृष्टिकोनाचा हा मेळ पाहून मी प्रभावित झाले. यातून मला खूप मनःशांती मिळाली."',
            'test.3.n': 'नेहा के.', 'test.3.s': 'वैयक्तिक मार्गदर्शन',
            
            'gal.label': 'गॅलरी', 'gal.title': 'आमच्या परिसराची एक झलक',
            
            'faq.label': 'प्रश्न?', 'faq.title': 'वारंवार विचारले जाणारे प्रश्न',
            'faq.1.q': 'सल्ल्यासाठी कोणती माहिती आवश्यक आहे?', 'faq.1.a': 'अचूक जन्मपत्रिका तयार करण्यासाठी, आम्हाला तुमची अचूक जन्मतारीख, जन्मवेळ आणि जन्मस्थळ आवश्यक आहे.',
            'faq.2.q': 'मी ऑनलाइन सल्ला घेऊ शकतो का?', 'faq.2.a': 'होय, आम्ही फोन कॉल, व्हॉट्सॲप व्हिडिओ किंवा गुगल मीटद्वारे ऑनलाइन सल्ला देतो.',
            'faq.3.q': 'माझी माहिती गोपनीय राहील का?', 'faq.3.a': 'नक्कीच. आम्ही गोपनीयतेच्या धोरणाचे काटेकोरपणे पालन करतो.',
            'faq.4.q': 'सल्लामसलत करण्यासाठी किती वेळ लागतो?', 'faq.4.a': 'एका वैयक्तिकृत सल्ल्यासाठी साधारणपणे ३० ते ४५ मिनिटे लागतात.',
            
            'cnt.label': 'संपर्कात रहा', 'cnt.title': 'तुमचा ज्योतिष सल्ला बुक करा',
            'cnt.f.name': 'पूर्ण नाव', 'cnt.f.phone': 'फोन नंबर', 'cnt.f.email': 'ईमेल', 'cnt.f.srv': 'सेवा निवडा', 'cnt.f.srv.def': 'सेवा निवडा', 'cnt.f.msg': 'तुमचा प्रश्न', 'cnt.f.btn': 'विनंती पाठवा',
            'cnt.info.title': 'संपर्क माहिती', 'cnt.info.desc': 'तातडीच्या मदतीसाठी किंवा वेळ निश्चित करण्यासाठी आमच्याशी संपर्क साधा.',
            'cnt.info.call': 'कॉल करा', 'cnt.info.wa': 'व्हॉट्सॲप', 'cnt.info.mail': 'ईमेल', 'cnt.info.add': 'पत्ता', 'cnt.info.hrs': 'कामाची वेळ',
            
            'ft.desc': 'जीवनाच्या प्रवासात स्पष्टता आणि आत्मविश्वासाने मार्गक्रमण करण्यासाठी पारंपारिक ज्योतिषीय ज्ञान आणि वैयक्तिक आध्यात्मिक मार्गदर्शन प्रदान करण्यासाठी समर्पित.',
            'ft.ql': 'जलद दुवे', 'ft.srv': 'सेवा', 'ft.lgl': 'कायदेशीर आणि संपर्क',
            'ft.pp': 'गोपनीयता धोरण', 'ft.tc': 'नियम आणि अटी', 'ft.dis': 'अस्वीकरण',
            'ft.cr': '© २०२६ जोशी मॅडम ज्योतिष. सर्व हक्क राखीव.',
            'ft.warn': 'अस्वीकरण: ज्योतिषीय वाचन पारंपारिक ज्ञानावर आधारित आहे आणि केवळ मार्गदर्शनासाठी आहे. परिणाम वैयक्तिक कर्मावर अवलंबून असतात.'
        },
        'hi': {
            'brand.name': 'जोशी मैडम',
            'meta.title': 'जोशी मैडम - विश्वसनीय ज्योतिष और आध्यात्मिक मार्गदर्शन',
            
            'nav.home': 'होम', 'nav.about': 'हमारे बारे में', 'nav.services': 'सेवाएं', 'nav.whyus': 'हमें क्यों चुनें', 'nav.testimonials': 'समीक्षा', 'nav.faq': 'सामान्य प्रश्न', 'nav.contact': 'संपर्क', 'nav.book': 'परामर्श लें',
            
            'hero.badge': 'विश्वसनीय ज्योतिष और आध्यात्मिक मार्गदर्शन',
            'hero.title': 'स्पष्टता, मार्गदर्शन<br>और एक बेहतर मार्ग खोजें',
            'hero.subtitle': 'जीवन की चुनौतियों को दूर करने और अपनी वास्तविक क्षमता को अनलॉक करने के लिए व्यक्तिगत, गोपनीय परामर्श के साथ पारंपरिक ज्योतिषीय ज्ञान का अनुभव करें।',
            'hero.cta1': 'परामर्श बुक करें', 'hero.cta2': 'सेवाएं खोजें',
            'hero.trust1': 'व्यक्तिगत मार्गदर्शन', 'hero.trust2': 'गोपनीय परामर्श', 'hero.trust3': 'अनुभवी ज्योतिषी',
            
            'stats.exp': 'वर्षों का अनुभव', 'stats.consult': 'परामर्श', 'stats.serv': 'ज्योतिष सेवाएं', 'stats.conf': 'गोपनीयता',
            
            'about.label': 'ज्योतिषी के बारे में',
            'about.title': 'अनुभव और परंपरा पर आधारित मार्गदर्शन',
            'about.p1': 'नमस्ते। मैं जोशी मैडम हूँ, जो जीवन की जटिलताओं को नेविगेट करने में मदद करने के लिए ज्योतिषीय मार्गदर्शन प्रदान करने के लिए समर्पित हूँ।',
            'about.p2': 'पारंपरिक भारतीय ज्योतिष में 15 से अधिक वर्षों के अध्ययन के साथ, मेरा दृष्टिकोण प्राचीन ज्ञान को आधुनिक समझ के साथ जोड़ता है। प्रत्येक व्यक्ति की जन्म कुंडली अद्वितीय है, और मेरा लक्ष्य आपके करियर, रिश्तों और व्यक्तिगत विकास में स्पष्टता खोजने में मदद करना है।',
            'about.p3': 'सभी परामर्श पूरी तरह से गोपनीय हैं, जो आपको अपनी चिंताओं पर चर्चा करने के लिए एक सुरक्षित स्थान प्रदान करते हैं।',
            'about.cta': 'मेरी सेवाओं के बारे में अधिक जानें',
            
            'services.label': 'ज्योतिष सेवाएं',
            'services.title': 'महत्वपूर्ण निर्णयों के लिए व्यक्तिगत मार्गदर्शन।',
            'srv.1.t': 'जन्म कुंडली पढ़ना', 'srv.1.d': 'आपके जीवन पथ, ताकत और चुनौतियों पर ग्रहों के प्रभाव को समझने के लिए विस्तृत विश्लेषण।',
            'srv.2.t': 'कुंडली विश्लेषण', 'srv.2.d': 'आपके व्यक्तित्व और नियति में गहरी अंतर्दृष्टि के लिए व्यापक कुंडली निर्माण और व्याख्या।',
            'srv.3.t': 'विवाह और अनुकूलता', 'srv.3.d': 'साझेदारी में सद्भाव और लंबे समय तक चलने वाले बंधन सुनिश्चित करने के लिए गुण मिलान।',
            'srv.4.t': 'करियर और व्यवसाय', 'srv.4.d': 'सही करियर मार्ग चुनने और वित्तीय स्थिरता प्राप्त करने के लिए ज्योतिषीय अंतर्दृष्टि।',
            'srv.5.t': 'प्रेम और रिश्ते', 'srv.5.d': 'रिश्ते के मुद्दों के लिए मार्गदर्शन, और व्यक्तिगत संबंधों में शांति खोजना।',
            'srv.6.t': 'वास्तु परामर्श', 'srv.6.d': 'सकारात्मक ऊर्जा, समृद्धि और भलाई को आकर्षित करने के लिए अपने कार्यक्षेत्र को प्राकृतिक बलों के साथ संरेखित करें।',
            'srv.btn': 'और जानें',
            
            'feat.title': 'व्यक्तिगत मार्गदर्शन की तलाश है?',
            'feat.desc': 'हर व्यक्ति की यात्रा अलग होती है। अपनी चिंताओं और लक्ष्यों के आधार पर व्यक्तिगत परामर्श प्राप्त करें। आज ही स्पष्टता की ओर पहला कदम उठाएं।',
            'feat.cta': 'अपना परामर्श बुक करें',
            
            'why.label': 'हमें क्यों चुनें',
            'why.title': 'प्रामाणिक और ईमानदार मार्गदर्शन के लिए प्रतिबद्ध',
            'why.1.t': 'अनुभवी मार्गदर्शन', 'why.1.d': 'प्रामाणिक ज्योतिषीय परंपराओं में आधारित गहरी अंतर्दृष्टि प्रदान करने के वर्षों का अभ्यास।',
            'why.2.t': 'गोपनीय चर्चा', 'why.2.d': 'आपकी गोपनीयता सर्वोपरि है। सभी परामर्श सख्त गोपनीयता के साथ आयोजित किए जाते हैं।',
            'why.3.t': 'व्यक्तिगत परामर्श', 'why.3.d': 'कोई सामान्य उत्तर नहीं। प्रत्येक पठन आपकी विशिष्ट जन्म विवरणों के अनुरूप होता है।',
            'why.4.t': 'ऑनलाइन और व्यक्तिगत', 'why.4.d': 'दुनिया में कहीं से भी मार्गदर्शन प्राप्त करने की अनुमति देने वाले लचीले परामर्श मोड।',
            
            'how.label': 'प्रक्रिया', 'how.title': 'यह कैसे काम करता है',
            'how.1': 'सेवा चुनें', 'how.2': 'समय बुक करें', 'how.3': 'चर्चा करें', 'how.4': 'मार्गदर्शन प्राप्त करें', 'how.btn': 'अभी शुरू करें',
            
            'zod.label': 'ब्रह्मांड', 'zod.title': '12 राशियों का ज्ञान',
            'z.1': 'मेष', 'z.2': 'वृषभ', 'z.3': 'मिथुन', 'z.4': 'कर्क', 'z.5': 'सिंह', 'z.6': 'कन्या', 'z.7': 'तुला', 'z.8': 'वृश्चिक', 'z.9': 'धनु', 'z.10': 'मकर', 'z.11': 'कुंभ', 'z.12': 'मीन',
            
            'test.label': 'ग्राहकों की कहानियाँ', 'test.title': 'लोग क्या कहते हैं',
            'test.1.t': '"मेरे करियर में भ्रम की अवधि के दौरान मुझे जो मार्गदर्शन मिला वह अत्यंत सहायक था। बहुत ही पेशेवर।"',
            'test.1.n': 'अमित एस.', 'test.1.s': 'करियर परामर्श',
            'test.2.t': '"बहुत ही सम्मानजनक और गोपनीय परामर्श। कुंडली विश्लेषण ने विवाह से जुड़े हमारे कई संदेहों को दूर किया।"',
            'test.2.n': 'प्रिया और राहुल एम.', 'test.2.s': 'विवाह अनुकूलता',
            'test.3.t': '"गहरे पारंपरिक ज्ञान और आधुनिक दृष्टिकोण के इस मिश्रण से मैं प्रभावित हुआ। इससे मुझे बहुत मन की शांति मिली।"',
            'test.3.n': 'नेहा के.', 'test.3.s': 'व्यक्तिगत मार्गदर्शन',
            
            'gal.label': 'गैलरी', 'gal.title': 'हमारे परिवेश की एक झलक',
            
            'faq.label': 'प्रश्न?', 'faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
            'faq.1.q': 'परामर्श के लिए क्या जानकारी चाहिए?', 'faq.1.a': 'सटीक जन्म कुंडली बनाने के लिए, हमें आपकी जन्म तिथि, जन्म का समय और जन्म स्थान की आवश्यकता होती है।',
            'faq.2.q': 'क्या मैं ऑनलाइन परामर्श ले सकता हूँ?', 'faq.2.a': 'हाँ, हम फोन कॉल, व्हाट्सएप वीडियो या गूगल मीट के माध्यम से ऑनलाइन परामर्श प्रदान करते हैं।',
            'faq.3.q': 'क्या मेरी जानकारी गोपनीय रहेगी?', 'faq.3.a': 'बिल्कुल। हम सख्त गोपनीयता नीति का पालन करते हैं।',
            'faq.4.q': 'परामर्श में कितना समय लगता है?', 'faq.4.a': 'एक व्यक्तिगत परामर्श में आमतौर पर 30 से 45 मिनट लगते हैं।',
            
            'cnt.label': 'संपर्क करें', 'cnt.title': 'अपना ज्योतिष परामर्श बुक करें',
            'cnt.f.name': 'पूरा नाम', 'cnt.f.phone': 'फ़ोन नंबर', 'cnt.f.email': 'ईमेल', 'cnt.f.srv': 'सेवा चुनें', 'cnt.f.srv.def': 'सेवा का चयन करें', 'cnt.f.msg': 'आपका प्रश्न', 'cnt.f.btn': 'अनुरोध भेजें',
            'cnt.info.title': 'संपर्क जानकारी', 'cnt.info.desc': 'तत्काल सहायता या अपॉइंटमेंट शेड्यूल करने के लिए हमसे सीधे संपर्क करें।',
            'cnt.info.call': 'कॉल करें', 'cnt.info.wa': 'व्हाट्सएप', 'cnt.info.mail': 'ईमेल', 'cnt.info.add': 'पता', 'cnt.info.hrs': 'कार्य समय',
            
            'ft.desc': 'जीवन की यात्रा में स्पष्टता और आत्मविश्वास के साथ आगे बढ़ने में मदद करने के लिए पारंपरिक ज्योतिषीय ज्ञान प्रदान करने के लिए समर्पित।',
            'ft.ql': 'त्वरित लिंक', 'ft.srv': 'सेवाएं', 'ft.lgl': 'कानूनी और संपर्क',
            'ft.pp': 'गोपनीयता नीति', 'ft.tc': 'नियम और शर्तें', 'ft.dis': 'अस्वीकरण',
            'ft.cr': '© 2026 जोशी मैडम ज्योतिष। सर्वाधिकार सुरक्षित।',
            'ft.warn': 'अस्वीकरण: ज्योतिषीय पठन पारंपरिक ज्ञान पर आधारित हैं और केवल मार्गदर्शन के लिए हैं। परिणाम व्यक्तिगत कर्म पर निर्भर करते हैं।'
        }
    };

    const langSelector = document.getElementById('languageSelector');

    function applyTranslation(lang) {
        const dict = translations[lang];
        if (dict) {
            if (dict['meta.title']) {
                document.title = dict['meta.title'];
            }
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = dict[key];
                    } else if (el.tagName === 'OPTION') {
                        el.textContent = dict[key];
                    } else {
                        el.innerHTML = dict[key];
                    }
                }
            });
        }
    }

    if (langSelector) {
        // Retrieve saved language, or use the browser's retained select value, or default to 'en'
        const savedLang = localStorage.getItem('astrologer_lang') || langSelector.value || 'en';
        langSelector.value = savedLang;
        
        // Apply the translation on initial load
        applyTranslation(savedLang);

        // Apply translation when user changes the dropdown
        langSelector.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            localStorage.setItem('astrologer_lang', selectedLang);
            applyTranslation(selectedLang);
        });
    }
});

function showImage(imageSrc) {
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.src = imageSrc;
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('formSuccessMessage');
    
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        form.reset();
        successMessage.classList.remove('d-none');
        btn.innerHTML = originalText;
        btn.disabled = false;
        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 5000);
    }, 1500);
}
