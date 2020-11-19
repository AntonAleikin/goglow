<?php

class Calendar 
{  
    private $exitData = [];

    function __construct()
    {   
        $this->displayMonth();
        $this->displayDays();

        //print_r($this->exitData);
        
        exit(json_encode($this->exitData));
    }

    public function displayMonth () 
    {
        $currentMonth = date('m'); // Получаем текущий месяц
        
        $months = [
            '1' => 'Январь',
            '2' => 'Февраль',
            '3' => 'Март',
            '4' => 'Апрель',
            '5' => 'Май',
            '6' => 'Июнь',
            '7' => 'Июль',
            '8' => 'Август',
            '9' => 'Сентябрь',
            '10' => 'Октябрь',
            '11' => 'Ноябрь',
            '12' => 'Декабрь'
        ];

        foreach ($months as $number => $month) 
        {
            if ($number == $currentMonth) 
            {
                $this->exitData['month'] = $month;
            } 
        }
    }

    function displayDays () 
    {
        $currentMonth = date('m'); 

        $currentDate = date('d');
    
        $numOfDays = date('t'); 
    
        $firstDay = date('N', mktime(0, 0, 0, $currentMonth, 1)); 
    
        $days = [
            '1' => 'Пн',
            '2' => 'Вт',
            '3' => 'Ср',
            '4' => 'Чт',
            '5' => 'Пт',
            '6' => 'Сб', 
            '7' => 'Вс'
        ];

        $this->exitData['currentDate'] = $currentDate;
     
        for($m = 1; $m <= $numOfDays; $m++) 
        {
            foreach ($days as $num => $name) 
            {   
                if ($firstDay == $num) 
                {
                    $this->exitData[$m] = 
                    [
                        'num' => $num, 
                        'name' => $name,
                        'date' => $m
                    ];
                }  
            } 
    
            if ($firstDay == 7) 
            {
                $firstDay = 1;
            }
            else
            {
                $firstDay++;
            }
        }


    }
}
$calendar = new Calendar();