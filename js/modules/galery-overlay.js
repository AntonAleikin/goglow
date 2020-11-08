function galeryModal () {

    // Получаем єлементы галереи со страницы
    const 
    galerySection = document.querySelector('.galery-section__galery'),
    pics = document.querySelectorAll('.galery-section__galery-img');


    // Создаем модальное окно
    function createOverlay () {

        const galeryOverlay = document.createElement('div');
        galeryOverlay.classList.add('galery-overlay');
        galeryOverlay.innerHTML = `

            <div class="galery-overlay-close">
                <i class="fas fa-times"></i>
            </div>


            <div class="galery-overlay-wrapper">
            
                <div class="galery-overlay-pointer galery-overlay-pointer-prev">
                    <i class="fas fa-chevron-left"></i>
                </div>

                <div class="galery-overlay-pointer galery-overlay-pointer-next">
                    <i class="fas fa-chevron-right"></i>
                </div>


                <div class="galery-slider-wrapper">
            
                    <div class="galery-slider-inner"></div>
                </div>
            </div>
        `;
        // Добавляем модальное окно в конец секции галереи со страницы
        galerySection.append(galeryOverlay);
    }


    // Добавляем крестику обработчик, который закроет модельное окно (удалит его)
    function overlayClose () {

        const
        galeryOverlay = document.querySelector('.galery-overlay'),
        galeryOverlayClose = galeryOverlay.querySelector('.galery-overlay-close');
        galeryOverlayClose.addEventListener("click", () => {

            galeryOverlay.remove();
            document.documentElement.style.overflow = 'auto';
        });
    }


    // Добавляем фотки со страницы в Слайдер модального окна
    function insertPics () {

        // Получаем созданный ф-цией createOverlay элемент
        const sliderInner = document.querySelector('.galery-slider-inner');

        pics.forEach((pic) => {

            // Создаем слайд - обертку для фото
            const galerySlide = document.createElement('div');
            galerySlide.classList.add('galery-slide');

            sliderInner.append(galerySlide);


            // Создаем для каждой фотки ее копию и добавляем в слайд 
            const galeryOverlayImg = document.createElement('img');
            galeryOverlayImg.classList.add('galery-slide-img');
            galeryOverlayImg.src = pic.src;
            galeryOverlayImg.alt = pic.alt;

            galerySlide.append(galeryOverlayImg);
        });
    }



    // Получаем все новосозданные элементы модального окна и создаем слайдер
    function createSlider (key) {
        
        const 
        overlayWrapper = document.querySelector('.galery-overlay-wrapper'),
        sliderWrapper = overlayWrapper.querySelector('.galery-slider-wrapper'),
        sliderInner = sliderWrapper.querySelector('.galery-slider-inner'),

        // Стрелочки
        pointerPrev = overlayWrapper.querySelector('.galery-overlay-pointer-prev'),
        pointerNext = overlayWrapper.querySelector('.galery-overlay-pointer-next'),

        // Картинки
        slides = sliderWrapper.querySelectorAll('.galery-slide'),
        imgs = sliderWrapper.querySelectorAll('.galery-slide-img'),
        img = sliderWrapper.querySelector('.galery-slide-img');

        // Переменная хранит в себе к-во пикс смещения слайдера. Одно смещение = ширине картинки
        let offset = 0;


        // 3адаем ширину блокам
        function sizing () {

            const imgWidth = Math.round(img.clientWidth) + 'px';
    
            overlayWrapper.style.width = imgWidth;
            sliderWrapper.style.width = imgWidth;

            // Задаем Иннеру ширину в % от Врепера (родителя) = суммарной ширине всех картинок, что есть в галерее
            // При этом, ширина Вреппера строго = ширине одной картинки
            sliderInner.style.width = imgs.length * 100 + '%';

            // Задаем ширину Слайду (отертке фото)
            slides.forEach(slide => {
                slide.style.width = imgWidth;
            }); 
        }
        sizing();


        // Прокручиваем ленту до фотки, на которую кликнули
        function setActivePic () {

            const imgWidth = Math.round(img.clientWidth);

            offset = key * imgWidth;

            sliderInner.style.transform = `translateX(-${offset}px)`;


            // Делаем стрелочку неактивной, если выбран последний слайд
            if (offset == (slides.length - 1) * imgWidth) {

                pointerNext.classList.add('galery-overlay-pointer-next_not-active');
            } 

            // Делаем стрелочку неактивной если выбран первый слайд
            if (offset == 0) {

                pointerPrev.classList.add('galery-overlay-pointer-next_not-active');
            }
        } 
        setActivePic();



        // Слайдер
        function slider () {

            const imgWidth = Math.round(img.clientWidth);

            function next () {

                // Включаем плавную прокрутку
                sliderInner.style.transition = 'all 0.3s ease-out';


                if (offset == (slides.length - 1) * imgWidth) {

                    // В конце списка отключаем обработчик и больше не листаем
                    pointerNext.removeEventListener("click", next);

                } else {

                    offset += imgWidth;
                }
         
                sliderInner.style.transform = `translateX(-${offset}px)`;

                pointerNext.addEventListener("click", next);


                // Делаем стрелочку неактивной после прокрутки предпоследнего слайда
                if (offset == (slides.length - 1) * imgWidth) {

                    pointerNext.classList.add('galery-overlay-pointer-next_not-active');
                }

                // Делаем стрелочку активной, если первый слайд прокручен
                if (offset > 0) {

                    pointerPrev.classList.remove('galery-overlay-pointer-next_not-active');
                }
            }

            pointerNext.addEventListener("click", next);


            function prev () {

                sliderInner.style.transition = 'all 0.3s ease-out';

                if (offset == 0) {

                    pointerPrev.removeEventListener("click", prev);

                } else {

                    offset -= imgWidth;
                }
        
                sliderInner.style.transform = `translateX(-${offset}px)`;

                pointerPrev.addEventListener("click", prev);


                // Делаем стрелочку неактивной если выбран первый слайд
                if (offset == 0) {

                    pointerPrev.classList.add('galery-overlay-pointer-next_not-active');
                }

                // делаем стрелочку аткивной, если прокручен последний слайд
                if (offset < (slides.length - 1) * imgWidth) {

                    pointerNext.classList.remove('galery-overlay-pointer-next_not-active');
                }
            }

            pointerPrev.addEventListener("click", prev);
        }
        slider();
    }
    


    // Устанавливаем на все фотки галереи обработчик, который будет вызывать модальное окно
    pics.forEach((pic, key) => {

        pic.addEventListener("click", () => {

            document.documentElement.style.overflow = 'hidden';

            // Вызываем модальное окно
            createOverlay();

            // Добавляем в него копии фото со страницы
            insertPics();

            // Создаем слайдер
            createSlider(key);

            // Закрываем модальное окно
            overlayClose ();
        });
    });    
}
galeryModal();