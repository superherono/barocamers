//==========================Test-Browser-on-WebP==============================

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

//=======================BURGER====================
const burger = document.querySelector('.icon-menu');
const mobileMenu = document.querySelector('.nav-bottom-header');
const classNameActive = '_active';
const classNameLock = 'lock';
const elements = [burger, mobileMenu];

function toggleClass(elements, classNameActive, classNameLock) {
	elements.forEach(element => element.classList.toggle(classNameActive))
	document.querySelector('body').classList.toggle(classNameLock)
}

burger.onclick = () => toggleClass(elements, classNameActive, classNameLock)


//======================IBG===============
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();

//====================Открываем суб-меню по клику=============
const navLinks = document.querySelectorAll('._add');

if (navLinks.length > 0) {
	for (let index = 0; index < navLinks.length; index++) {
		const navLink = navLinks[index];
		
		navLink.addEventListener('click', function (e) {
			navLink.classList.toggle("_active");
			e.preventDefault();
		});
	}
}
//==================Smooth Scroll========================
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	
	if (!anchor.classList.contains('popup-link') && !anchor.classList.contains('popup__close')) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
	
			const blockID = anchor.getAttribute('href').substr(1);
			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	}

}
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}
//=====================Spollers================================
let spollers = document.querySelectorAll("._spoller");
const assortmentFilter = document.querySelector('.assortment__filter '); 
let readMore = document.querySelector('.read-more');  
let spollersGo = true;
if (spollers.length > 0) {

	function spollerCLick(e) {
		const spoller = e.target.classList.contains('_spoller') ? e.target : e.target.closest('._spoller');
		if (spollersGo) {
			spollersGo = false;

			if (spoller.closest('._spollers').classList.contains('_one')) {
				let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
				for (let i = 0; i < curent_spollers.length; i++) {
					let el = curent_spollers[i];
					if (el != spoller) {
						el.classList.remove('_active');
						_slideUp(el.nextElementSibling);
					}
				}
			}
			// console.log(spoller.nextElementSibling);
			spoller.classList.toggle('_active');
			if (assortmentFilter) {
				assortmentFilter.classList.toggle('_active');
				
			}
			if (readMore) {
				readMore.classList.toggle('_active');
			}
			_slideToggle(spoller.nextElementSibling);

			setTimeout(function () {
				spollersGo = true;
				
			}, 500);
		}
	}
	function spollersInit() {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			let spollerMax = spoller.getAttribute('data-max');
			
			if (spollerMax && window.innerWidth > spollerMax) {
				if (spoller.classList.contains('_init')) {
					spoller.classList.remove('_active');
					spoller.classList.remove('_init');
					spoller.nextElementSibling.style.cssText = '';
					spoller.removeEventListener("click", spollerCLick);
				}
			} else if (!spoller.classList.contains('_init')) {
				spoller.classList.add('_init');
				spoller.addEventListener("click", spollerCLick);
			}
		}
	}
	function spollersShowActive() {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			if (spoller.classList.contains('_active')) {
				_slideToggle(spoller.nextElementSibling);
			}
		}
	}
	// window.addEventListener("resize", spollersInit);

	setTimeout(function () {
		spollersShowActive();
		spollersInit();
	}, 0);
}
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}

//=====================Сворачиваем табы в моб версии================================
const breakpoint = window.matchMedia('(max-width:767.98px)');
let filterBody = document.querySelector('.filter__body');

const breakpointChecker = function () {
	
	if (breakpoint.matches === true) {
		assortmentFilter.classList.add('_active');
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
				spoller.classList.remove('_init');
				spoller.classList.add('_active');

			if (spoller.classList.contains('_active')) {
				_slideUp(spoller.nextElementSibling);
			}
		}
		
		return;

	}
	else {
		spollersShowActive();
		spollersInit();
	}

};
if (filterBody) {
	// keep an eye on viewport size changes
breakpoint.addListener(breakpointChecker);

// kickstart
breakpointChecker();
}

//=====================Filter================================
const filters = document.querySelector('#filters');
if (filters) {
	filters.addEventListener('input', filterGoods);

	function filterGoods() {
		const
		  equipment = [...filters.querySelectorAll('#equipment input:checked')].map(n => n.value),
		  capacity = [...filters.querySelectorAll('#capacity input:checked')].map(n => n.value),
		  purpose = [...filters.querySelectorAll('#purpose input:checked')].map(n => n.value),
		  priceMin = document.querySelector('#price-min').value,
		  priceMax = document.querySelector('#price-max').value;
	  
		outputGoods(DATA.filter(n => (
		  // (!equipment.length || equipment.includes(n.equipment)) &&
		  (!equipment.length || equipment.some(el => n.equipment.includes(el))) &&
		  (!capacity.length || capacity.some(el => n.capacity.includes(el))) &&
		  (!purpose.length || purpose.some(el => n.purpose.includes(el))) &&
		  (!priceMin || priceMin <= n.cost) &&
		  (!priceMax || priceMax >= n.cost)
		)));
	  }
	  
	  function outputGoods(goods) {
		document.getElementById('goods').innerHTML = goods.map(n => `
		  <div itemscope itemtype="http://schema.org/Product" class="assortment__products__item product-assortment">
			  <a href="${n.link}" class="product-assortment__image _ibg">
				  <picture>
					  <source srcset="${n.image}, ../img/catalog/products/mobile/01-x2.webp 2x, ../img/catalog/products/mobile/01-x3.webp 3x" media="(max-width: 400px)" type="image/webp">
					  <source srcset="../img/catalog/products/mobile/01-x3.webp" media="(max-width: 767px)" type="image/webp">
					  <img itemprop="image" src="${n.image}" alt="Фото Барокамеры">
				  </picture>
			  </a>
			  <p class="product-assortment__status"><span class="_icon-checked"></span>В наличии</p>
			  <h3 itemprop="name" class="product-assortment__title">${n.name}</h3>
			  <div class="product-assortment__rating">
				  <span class="product-assortment__label">Рейтинг:</span>
				  <div class="product-assortment__stars"><img src="../img/footer/stars.svg" alt=""></div>
			  </div>
			  <a itemprop="url" href="${n.link}" class="btn product-assortment__btn">Купить</a>

			  <meta itemprop="description" content="${n.description}">
			  <span itemprop="brand" itemscope itemtype="http://schema.org/Brand">
			  <meta itemprop="name" content="Эверест"></span>
			  <span itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
				<meta itemprop="ratingValue" content="5">
				<meta itemprop="bestRating" content="5">
				<meta itemprop="worstRating" content="1">
				<meta itemprop="ratingCount" content="6"></span>
		  </div>
		`).join('');
	  }
	  
	  const DATA = [
		{
		  "equipment" : ["concentrator", "capsule"],
		  "name" : "Эверест 1.68",
		  "cost" : 1000,
		  "image" : "../img/catalog/products/01.webp",
		  "purpose": ["sessions","oxygenation","procedures","hypoxia","diseases","pregnancy"],
		  "capacity" : ["single", "all"],
		  "link": "everest-1-68.html",
		  "description": "Модель барокамеры “Эверест 1,68” идеально подходит для проведения индивидуальных сеансов. Она обладает достаточной вместимостью для комфортного размещения одного человека любой комплектации.",
		},
		{
		  "equipment" : ["concentrator", "capsule"],
		  "name" : "Эверест 2.52",
		  "cost" : 1500,
		  "image" : "../img/catalog/products/02.webp",
		  "purpose": 
			  ["sessions","oxygenation","procedures","hypoxia","diseases","pregnancy"],
		  "capacity" : ["multi", "all"],
		  "link": "everest-2-52.html",
		  "description": "Модель барокамеры “Эверест 2,52” обладает наибольшей вместимостью и рекомендована для проведения групповых сеансов. Легко и комфортно внутри может разместиться до 4х человек.",
		},
		{
		  "equipment" : "capsule",
		  "name" : "Эверест 3.2",
		  "cost" : 1700,
		  "image" : "../img/catalog/products/03.webp",
		  "purpose": "",
		  "capacity" : ["single", "all"],
		  "link": "#",
		  "description":"",
		},
		{
		  "equipment" : "capsule",
		  "name" : "Эверест 4.8",
		  "cost" : 2400,
		  "image" : "../img/catalog/products/03.webp",
		  "purpose": "",
		  "capacity" : ["single", "all"],
		  "link": "#",
		  "description":"",
		},
		{
		  "equipment" : ["concentrator", "capsule"],
		  "name" : "Эверест 1",
		  "cost" : 2000,
		  "image" : "../img/catalog/products/04.webp",
		  "purpose": 
			  ["oxygenation","procedures","hypoxia","diseases", "animals"],
		  "capacity" : 
			  ["single", "all"],
			  "link": "#",
			  "description":"",
		},
	  ];
	  
	  outputGoods(DATA);

	  //=====================Reset Filter================================

	let filterBtn = document.querySelector('.filter__cancel_text');
		filterBtn.addEventListener("click", function(e) {
			form_clean(filterBody);
			setTimeout(() => {
				outputGoods(DATA);
			}, 100);
		}
	);
}

function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.filter__checkbox');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

//=====================Tabs================================
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}




"use strict";

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#','');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupCloseIcon(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add ('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}
//Блокирует сдвиги контента при открытии попапа
 function bodyLock() {
     const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

     if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
             const el = lockPadding[index];
             el.style.paddingRight = lockPaddingValue;
         }
     }
     body.style.paddingRight = lockPaddingValue;
     header.style.paddingRight = lockPaddingValue;
     body.classList.add('lock');

     unlock = false;
     setTimeout(function () {
         unlock = true;
     }, timeout);
 }

 function bodyUnlock() {
     setTimeout(function () {
         if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
         }
            body.style.paddingRight = '0px';
            header.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle



function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');
        }
        if (slider.classList.contains('_gallery')) {
            //slider.data('lightGallery').destroy(true);
        }
    }
    sliders_bild_callback();
}

function sliders_bild_callback(params) {}

// if (document.querySelector('.mainslider')) {
//     let mainslider = new Swiper('.mainslider__body', {
//     /*
//         effect: 'fade',
//         autoplay: {
//             delay: 3000,
//             disableOnInteraction: false,
//         },
//         */
//     observer: true,
//     observeParents: true,
//     slidesPerView: 1,
//     spaceBetween: 0,
//     autoHeight: true,
//     speed: 800,
//     //touchRatio: 0,
//     //simulateTouch: false,
//     //loop: true,
//     //preLoadImages: false,
//     //Lazy: true,
//     //Dotts
//     pagination: {
//     el: '.mainslider__dotts',
//     clickable: true,
//     },
//     //Arrows
//     /*
//     navigation: {
//         nextEl: '.about__more .more__item_next',
//         prevEl: '.about__more .more__item_prev',
//     },
//     */
//     /*
//     breakpoints: {
//         320: {
//             slidesPerView: 1,
//             spaceBetween: 0,
//             autoHeight: true,
//         },
//         768: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//         },
//         992: {
//             slidesPerView: 3,
//             spaceBetween: 20,
//         },
//         1268: {
//             slidesPerView: 4,
//             spaceBetween: 30,
//         },
//     },
//     */
//     on: {
//         lazyImageReady: function () {
//             ibg();
//         },
//     }
//     //And if we need scrollbar
//     //scrollbar: {
//     //el: '.swiper-scrollbar',
//     //},
// });
//     let mainsliderImages = document.querySelectorAll('.mainslider__image');
//     let mainsliderDotts = document.querySelectorAll('.mainslider__dotts .swiper-pagination-bullet');

//     for(let index = 0; index < mainsliderImages.length; index++) {
//         const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
//         mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
//     }
// }
// if (document.querySelector('.products__items')) {
//     let mainslider = new Swiper('.slider-body', {
//         /*
//             effect: 'fade',
//             autoplay: {
//                 delay: 3000,
//                 disableOnInteraction: false,
//             },
//             */
//         observer: true,
//         observeParents: true,
//         slidesPerView: 3,
//         spaceBetween: 0,
//         autoHeight: true,
//         speed: 800,
//         //touchRatio: 0,
//         simulateTouch: true,
//         loop: true,
//         //preLoadImages: false,
//         //Lazy: true,
//         //Dotts
//         pagination: {
//             el: '.gallery__dotts',
//             clickable: true,
//         },
//         //Arrows
//         /*
//         navigation: {
//             nextEl: '.about__more .more__item_next',
//             prevEl: '.about__more .more__item_prev',
//         },
//         */
//         breakpoints: {
//             320: {
//                 slidesPerView: 1,
//                 spaceBetween: 0,
//                 autoHeight: true,
//             },
//             768: {
//                 slidesPerView: 2,
//                 spaceBetween: 50,
//             },
//             992: {
//                 slidesPerView: 3,
//                 spaceBetween: 40,
//             },
//             1268: {
//                 slidesPerView: 3,
//                 spaceBetween: 45,
//             },
//         },
//         on: {
//             lazyImageReady: function () {
//                 ibg();
//             },
//         }
//         //And if we need scrollbar
//         //scrollbar: {
//         //el: '.swiper-scrollbar',
//         //},
//     });

    if (document.querySelector('.products__items')) {
        let productsSlider = new Swiper('.slider-body', {
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 40,
            speed: 800,
            touchRatio: 1,
            simulateTouch: true,
            // loop: true,
            //preLoadImages: false,
            //Lazy: true,
            //Dotts

            //Arrows
            navigation: {
                nextEl: '.products__arrow_right',
                prevEl: '.products__arrow_left',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
            },

            on: {
                lazyImageReady: function () {
                    ibg();
                },
            },
            //And if we need scrollbar
            //scrollbar: {
            //el: '.swiper-scrollbar',
            //},

        });


        
    // }
    
//     let mainsliderImages = document.querySelectorAll('.gallery__slide');
//     let mainsliderDotts = document.querySelectorAll('.gallery__controls .swiper-pagination-bullet');

//     for (let index = 0; index < mainsliderImages.length; index++) {
//         const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
//         mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
//     }
}
if (document.querySelector('.welcome__images')) {
    let welcomeSlider = new Swiper('.welcome__images', {
        effect: 'fade',
	  	fadeEffect: {
	  		crossFade: true,
	  	},
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          observer: true,
          observeParents: true,
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: true,
          speed: 800,
          loop: true,
        // loop: true,
        preLoadImages: false,
        Lazy: true,
        //Dotts

        //Arrows

        // navigation: {
        //     nextEl: '.show-room-slider__arrow_next',
        //     prevEl: '.show-room-slider__arrow_prev',
        // },
        // breakpoints: {
        //     320: {
        //         slidesPerView: 1,
        //         autoHeight: true,
        //     },
        //     480: {
        //         slidesPerView: 1,
        //     },
        //     600: {
        //         slidesPerView: 1,
        //     },
        //     768: {
        //         slidesPerView: 1,
        //     },
        //     992: {
        //         slidesPerView: 1,
        //     },
        // },

        on: {
            lazyImageReady: function () {
                ibg();
            },
        },
        //And if we need scrollbar
        //scrollbar: {
        //el: '.swiper-scrollbar',
        //},

    });


    
// }


//     let mainsliderImages = document.querySelectorAll('.gallery__slide');
//     let mainsliderDotts = document.querySelectorAll('.gallery__controls .swiper-pagination-bullet');

//     for (let index = 0; index < mainsliderImages.length; index++) {
//         const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
//         mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
//     }
}



// selector of all videos on the page
const videos = document.querySelectorAll('.video');

// generate video url
let generateUrl = function (id) {
	let query = '?rel=0&showinfo=0&autoplay=1';

	return 'https://www.youtube.com/embed/' + id + query;
};

// creating iframe
let createIframe = function (id) {
	let iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay; encrypted-media');
	iframe.setAttribute('src', generateUrl(id));

	return iframe;
};

// main code
videos.forEach((el) => {
	let videoHref = el.getAttribute('data-video');

	let deletedLength = 'https://youtu.be/'.length;

	let videoId = videoHref.substring(deletedLength, videoHref.length);
    let srcImg = el.querySelector('source');
	let img = el.querySelector('img');
	let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
	srcImg.setAttribute('srcset', youtubeImgSrc);
	img.setAttribute('src', youtubeImgSrc);

	el.addEventListener('click', (e) => {
		e.preventDefault();

		let iframe = createIframe(videoId);
		el.querySelector('img').remove();
		el.appendChild(iframe);
		el.querySelector('button').remove();
	});
});
