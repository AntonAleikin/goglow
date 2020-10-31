function headerFixed () {

    const header = document.querySelector('.header');

    window.addEventListener("scroll", () => {

        if (window.scrollY >= window.innerHeight*0.91) {

            header.classList.add('header_fixed');
    
        } else {
    
            header.classList.remove('header_fixed');
        }
    });
}
headerFixed();