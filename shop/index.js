var Cal = function(divId) {

  //Сохраняем идентификатор div
  this.divId = divId;

  // Дни недели с понедельника
  this.DaysOfWeek = [
    'Пн',
    'Вт',
    'Ср',
    'Чтв',
    'Птн',
    'Суб',
    'Вск'
  ];

  // Месяцы начиная с января
  this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  //Устанавливаем текущий месяц, год
  var d = new Date();

  this.currMonth = d.getMonth('9');
  this.currYear = d.getFullYear('22');
  this.currDay = d.getDate('3');
};

// Показать текущий месяц
Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth);
};



// Показать месяц (год, месяц)
Cal.prototype.showMonth = function(y, m) {

  var d = new Date()
  // Последний день выбранного месяца
  , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
  

  var html = '<table>';

  // Запись выбранного месяца и года
  html += '<thead><tr>';
  html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
  html += '</tr></thead>';


  // заголовок дней недели
  html += '<tr class="days">';
  for(var i=0; i < this.DaysOfWeek.length;i++) {
    html += '<td>' + this.DaysOfWeek[i] + '</td>';
  }
  html += '</tr>';

  // Записываем дни
  var i=1;
  do {

    var dow = new Date(y, m, i).getDay();

    // Начать новую строку в понедельник
    if ( dow == 1 ) {
      html += '<tr>';
    }
    
    // Если первый день недели не понедельник показать последние дни предидущего месяца
    else if ( i == 1 ) {
      html += '<tr>';
      var k = lastDayOfLastMonth - firstDayOfMonth+1;
      for(var j=0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

    // Записываем текущий день в цикл
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<td class="today">' + i + '</td>';
    } else {
      html += '<td class="normal">' + i + '</td>';
    }
    // закрыть строку в воскресенье
    if ( dow == 0 ) {
      html += '</tr>';
    }
    // Если последний день месяца не воскресенье, показать первые дни следующего месяца
    else if ( i == lastDateOfMonth ) {
      var k=1;
      for(dow; dow < 7; dow++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

    i++;
  }while(i <= lastDateOfMonth);


  // Записываем HTML в div
  document.getElementById(this.divId).innerHTML = html;
};

// При загрузке окна
window.onload = function() {

  // Начать календарь
  var c = new Cal("divCal");			
  c.showcurr();
}

//до какого времени
var countDownDate = new Date("May 14, 2023 23:59:59").getTime();

// таймер
var x = setInterval(function() {

  // между сейчас и концом
  var now = new Date().getTime();
  var distance = countDownDate - now;

  // расчёт
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // вывести на страницу
  document.getElementById("timer").innerHTML = "До конца акции осталось: " + days + " дней " + hours + " часов " + minutes + " минут " + seconds + " секунд ";

  //время закончилось-сказать
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Акция окончена";
  }
}, 1000);

