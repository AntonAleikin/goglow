//import fetchService from '../services/fetch-service';

function calendar () 
{
    const 
    sliderWrapper = document.querySelector('.calendar-slider-wrapper'),
    sliderInner = sliderWrapper.querySelector('.calendar-slider-inner'),
    calendarDays = sliderWrapper.querySelector('.calendar__days'),
    calendarDay = sliderWrapper.querySelector('.calendar__day'),

    // Ширина окна просмотра
    sliderWrapperWidth = window.getComputedStyle(sliderWrapper).width;


    function slider () 
    {
        function sizing() 
        {
            // Задаем sliderInner ширину = к-ву элемов внутри него
            sliderInner.style.width = 100 * 2 + '%';


            // Задаем блоку с открытым днем и блоку со всеми днями ширину = ширине обертки
            calendarDay.style.width = sliderWrapperWidth;
            calendarDays.style.width = sliderWrapperWidth;


            // Сдвигаем sliderInner вправо на всю ширину sliderWrapper чтобы отобразить блок со всеми днями
            sliderInner.style.transform = `translateX(-${sliderWrapperWidth})`;
        }
        sizing();



    }
    slider();


    function setMonth (currentMonth) {

        const month = document.querySelector('.calendar__month');
        month.innerText = currentMonth;
    }


    function createDay (parent, none, num, name, date, currentDate) 
    {
        const day = document.createElement('div');
        day.dataset.num = num;
        day.classList.add('calendar__days-item');
        day.innerHTML = 
        `
            <div class="calendar__days-item-name">${name}</div>

            <div class="calendar__days-item-date">${date}</div>
        `;

        if (date == currentDate && date != undefined && currentDate != undefined)
        {
            day.classList.add('calendar__days-item-active');
        }

        if (none === true)
        {
            day.classList.add('calendar__days-item-none');
        }
        else
        {
            day.classList.add('calendar__days-item-hover');
        }

        parent.append(day);
    }


    function offsetDays (num, date)
    {
        if (date == 1 && num != 1)
        {
            for (let i = 1; i < num; i++)
            {
                createDay(
                    calendarDays,
                    true,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                );
            }
        }
    }
    

    function load () 
    {
        //fetchService('php/Calendar.php');

        fetch('php/Calendar.php')
        .then(response => response.json())
        .then(response => 
        {
            setMonth(response.month);
            delete response.month;

            const currentDate = response.currentDate;
            delete response.currentDate;

            offsetDays(
                response[1].num,
                response[1].date
            );
            
            for(let object in response)
            {
                createDay(
                    calendarDays,
                    false,
                    response[object].num,
                    response[object].name,
                    response[object].date,
                    currentDate
                );
            }    
        });
    }
    load();
}
calendar();