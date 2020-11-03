function changeColor () {

    if (window.matchMedia("(min-width: 768px)").matches) {

        const socialBar = document.querySelector('.social-bar'),
        socialBarLink = socialBar.querySelectorAll('.social-bar__link');

        window.addEventListener("scroll", () => {
            
            if (window.scrollY >= window.innerHeight*0.72 && window.scrollY <= window.innerHeight*1.72 ||
                window.scrollY >= window.innerHeight*2.72 && window.scrollY <= window.innerHeight*3.72 ||
                window.scrollY >= window.innerHeight*4.72 && window.scrollY <= window.innerHeight*5.72) {

                socialBar.classList.add('social-bar_dark');
                socialBarLink.forEach((item) => {
                    item.classList.add('social-bar_dark__link');
                });

            } else {

                socialBar.classList.remove('social-bar_dark');
                socialBarLink.forEach((item) => {
                    item.classList.remove('social-bar_dark__link');
                });
            }  
        });
    }
}
changeColor();