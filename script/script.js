//Отображение страницы только после полной загрузки
const header = document.querySelector('.header')
const advantagesTitle = document.querySelector('.advantages__body')
const weTitle = document.querySelector('.we__title')
const dukich = document.querySelector('.dukich__author')
const body = document.body
window.addEventListener('load', (e) => {
  document.body.classList.add('load')
  if(window.innerWidth > 767) setTimeout(()=>header.classList.add('act'), 1000)  

   //Коэффиценты
   const forHeader= 10;
   //Скорость анимации
   const speed = 0.07;
   
   //Начальные переменные
   let positionX = 0, positionY = 0;
   let coordXprocent = 0, coordYprocent = 0;
   
   function setMouseParallaxStyle(){
       const distX = coordXprocent - positionX;
       const distY = coordYprocent - positionY;
       positionX = positionX + (distX * speed)
       positionY = positionY + (distY * speed)
       //Передаем стили
       weTitle.style.cssText = `transform: translate(${positionX/forHeader}%, ${positionY/forHeader}%);`
       dukich.style.cssText = `transform: translate(${positionX/forHeader}%, ${positionY/forHeader}%);`
       requestAnimationFrame(setMouseParallaxStyle)
   }
   if(!(window.innerWidth < 1000)) setMouseParallaxStyle();
   
   
   window.addEventListener('mousemove', function scroll(e) {
       //Получение ширины и высоты блока
       const parallaxWidth = body.offsetWidth;
       const parallaxHeigth = body.offsetHeight;
       
   
   
       //Ноль по середине
   
       const coordX = e.pageX - parallaxWidth / 2;
       const coordY = e.pageY - parallaxHeigth / 2;
   
       //Получаем проценты
       coordXprocent = coordX / parallaxWidth * 100;
       coordYprocent = coordY / parallaxHeigth * 100;
       
   });
   
   if(window.innerWidth < 1000)  window.removeEventListener('mousemove', scroll)
})


// Меню бургер
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
iconMenu.onclick = function (e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    }
}
//!Плавная прокрутка к определенным элементам при клике
const menuLinks = document.querySelectorAll('.header__link[data-goto]')
if(menuLinks.length > 0) {
    menuLinks.forEach((menuLink)=> {
        menuLink.addEventListener('click', onMenuLinkClick)
    })


    function onMenuLinkClick(e) {
       const menuLink = e.target;
       if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
          const gotoBlock = document.querySelector(menuLink.dataset.goto);
          const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

         if(iconMenu.classList.contains('_active')){
            document.body.classList.remove('_lock')
            iconMenu.classList.remove('_active')
            menuBody.classList.remove('_active')
         }
          window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
          })
          e.preventDefault()
       }
    }
}


// Кнопка вверх
const buttonUp = document.querySelector('.up')
window.addEventListener('scroll', (e) => {
  if (window.pageYOffset > 400) buttonUp.style.visibility = 'visible'
  else buttonUp.style.visibility = 'hidden'
})
buttonUp.onclick = () => window.scrollTo(0, 0);
const model = document.querySelector('.model')
window.addEventListener('scroll', (e) => {
  let responsiveCoords = model.getBoundingClientRect()
  if (window.pageYOffset > responsiveCoords.y) header.style.cssText = ' background-color: rgb(255, 254, 254, 1);'
  else header.style.cssText = ' background-color: rgb(255, 254, 254, 0.4);'
})








   



// PORTFOLIO FILTER


filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("slider__item");
  if (c == "all") c = "";
  // Добавить класс "show" (display:block) к отфильтрованным элементам и удалите класс "show" из элементов, которые не выбраны
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Показать отфильтрованные элементы
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Скрыть элементы, которые не выбраны
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Добавить активный класс к текущей кнопке управления (выделите ее)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.querySelectorAll(".row__filter");
if(btns.length > 0) {
  for (let i = 0; i < btns.length; i++) {
    const btnFilter = btns[i]
    btnFilter.addEventListener('click', (e)=> {
      btns.forEach(item => item.classList.remove('act'))
      btnFilter.classList.add('act')
    })
  }
}




// SLIDER


$(document).ready(function() {
  $('.advantages__body').slick({
      arrows: true,  //Стрелким включены
      dots: false,   // точки включены
      adaptiveHeight: false,  //подстраивание точек и стрелок под каждый слайдер
      slidesToShow: 1,  //сколько слайдеров показано за раз 
      slidesToScroll: 1,  //Количество слайдов которое пролистывается при скроле
      speed: 600, //Скорость пролистывания слайдов
      easing: 'easy',  //Тип анимации при смене слайдов
      infinite: true, //Будет ли слайдер бесконечный
      initialSlide: 0, //Стартовый слайдер
      autoplay: true,  //Будет ли он автоматически листаться
      autoplaySpeed: 2000, //Скорость автоматического листания
      pauseOnFocus: true, //пауза автопроигрывания при нажатии 
      draggable: true, //Можно свайпать на компе
      swipe: true, //Можно свайпать на телефоне
      touchThreshold: 5, //Какое растояние нужно просвайпить для смены слайда
      touchMove: true, //Нельзя тягать с места на место при false
      waitForAnimate: false, //Включает быстрое перелистывание при быстром нажатии на стрелки и точки
      variableWidth: false, //размеры слайдов не регулируются, авто-адаптивность, можно использовать с centerMode
      fade: false, //Слайды не листаются а заменяются, слайд-шоу
  });
})







 
    

const animItems = document.querySelectorAll('.anim__items');
if(animItems.length>0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll () {
        for(let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offSet(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;  
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                animItem.classList.add('active') ;
            } else {
                if (!animItem.classList.contains('anim-no-hide')) {
                    animItem.classList.remove('active') 
                }
            }
        }
    }
    function offSet(el) {
        const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {  top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    setTimeout(()=> {
        animOnScroll ()
    }, 1000)
}




//form 
const textarea = document.getElementById('textarea')
const inputs = document.querySelectorAll('.input')
let placeholder = textarea.getAttribute('placeholder')
textarea.addEventListener('focus', (e)=> {
  textarea.setAttribute('placeholder', '')
})
textarea.addEventListener('blur', (e)=> {
  textarea.setAttribute('placeholder', `${placeholder}`)
})
if(inputs.length > 0){
   for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];
    let placeholder = input.getAttribute('placeholder')
    input.addEventListener('focus', (e)=> {
      input.setAttribute('placeholder', '')
    })
    input.addEventListener('blur', (e)=> {
      input.setAttribute('placeholder', `${placeholder}`)
    })
   }
}




//DUKICH
const dukichBtn = document.querySelector('.see')
const dukichPhoto = document.querySelector('.dukich__photo img')
const dukichCont = document.querySelector('.dukich__container')
dukichBtn.addEventListener('click', (e) => {
  dukichPhoto.classList.toggle('act')
  if(dukichCont.classList.contains('act')) dukichCont.classList.remove('act')
  else dukichCont.classList.add('act')
})

//location
const adress = document.querySelector('.item.anim__items.adress')
const wrapper = document.querySelector('.wrapper')
const headerLocationBtn = document.querySelector('.header__link.adress')
const map = document.querySelector('.location.map')
headerLocationBtn.addEventListener('click', (e) => {
  map.classList.toggle('act')
  if(window.pageXOffset < 768) {
    menuBody.classList.remove('_active')
    document.body.classList.remove('_lock')
    iconMenu.classList.remove('_active')
  } 
})
adress.addEventListener('click', (e) => {
  map.classList.toggle('act')
  if(window.pageXOffset < 768) {
    menuBody.classList.remove('_active')
    document.body.classList.remove('_lock')
    iconMenu.classList.remove('_active')
  } 
})
const locationTelefon = document.querySelector('.location__telefon a')
let locationTelefonText = locationTelefon.textContent
function phone(str) {
  str = str.split('')
  locationTelefon.innerHTML = str.slice(0, str.length - 4).join('') + ' ****'
}
phone(locationTelefonText)
   locationTelefon.addEventListener('click', (e)=> {
    if(locationTelefon.textContent.includes(' ****')) {
      e.preventDefault()
      locationTelefon.innerHTML = locationTelefonText
    }   
})
const locationCloseBtn = document.querySelector('.location__close')
locationCloseBtn.addEventListener('click', (e) => {
  e.preventDefault()
  map.classList.remove('act')
})




// SEARCH
const search = document.querySelector('.header__link.search')
const searchInput = document.getElementById('search1')
const searches = document.querySelector('.searches')
const resultSearch = document.querySelector('.search__result')
const searchBtnClose = document.querySelector('.search__input button')
let arrayResult = Array.from(document.querySelectorAll('.s')) 
let arrayFromArray = arrayResult.map(item => item.textContent).map(item => item.toLowerCase().trim())
search.addEventListener('click', (e) => {
  e.preventDefault()
  searches.classList.toggle('on')
  if(window.pageXOffset < 768) {
    menuBody.classList.remove('_active')
    document.body.classList.remove('_lock')
    iconMenu.classList.remove('_active')
  }
})
searchInput.addEventListener('input', (e)=> {
  // resultSearch.innerHTML = searchInput.value
  if(searchInput.value == '') resultSearch.innerHTML = ''
  validator(arrayFromArray)
})

const placeholderSearch = searchInput.getAttribute('placeholder')
searchInput.addEventListener('focus', (e)=> {
  searchInput.setAttribute('placeholder', '')
})
searchInput.addEventListener('blur', (e)=> {
  searchInput.setAttribute('placeholder', `${placeholderSearch}`)
  // resultSearch.innerHTML = ''
})
searchBtnClose.onclick = (e) => searches.classList.remove('on')
function validator(arr) {
  if(searchInput.value.length > 1) {
    for (let item of arr) {
      if(item.includes(searchInput.value))  resultSearch.innerHTML = item  
    }
  } 
}
resultSearch.addEventListener('click', (e) => {
    e.preventDefault()
    searches.classList.remove('on')
    for (let i = 0; i < arrayResult.length; i++) {
      const el = arrayResult[i];
      console.log(el.textContent.toLowerCase().trim());
      console.log(resultSearch.textContent);
      if(el.textContent.toLowerCase().trim() == resultSearch.textContent) {
        el.scrollIntoView({
          block: "center",
          inline: "nearest",
          behavior: "smooth"
         })
      }   
    }
})





