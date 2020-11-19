function smoothScroll () {

    if (window.matchMedia('(min-width: 768px)').matches) {

        const anchors = document.querySelectorAll('a[href*="#"]');

        anchors.forEach((anchor) => {
            
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                        
                const blockID = anchor.getAttribute('href').substr(1);
                
                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    if (window.matchMedia('(max-width: 767px)').matches) {

        const anchors = document.querySelectorAll('.section-link__link');

        anchors.forEach((anchor) => {

            anchor.addEventListener("click", (e) => {
                e.preventDefault();
    
                const blockID = anchor.getAttribute('href').substr(1);
                    
                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    if (window.matchMedia('(max-width: 575px)').matches) {

        const anchor = document.querySelector('.section-link_mobile__link');
        
        anchor.addEventListener("click", (e) => {
            e.preventDefault();

            const blockID = anchor.getAttribute('href').substr(1);
                
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}
smoothScroll();
