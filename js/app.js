"use strict";
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {
   iconMenu.addEventListener('click', () => {
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
      document.body.classList.toggle('_lock');
   });
   menuBody.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 991.98px)').matches && e.target.closest('.menu__link')) {
         iconMenu.classList.remove('_active');
         menuBody.classList.remove('_active');
         document.body.classList.remove('_lock');
      }
   });
}

document.addEventListener('DOMContentLoaded', () => {
   const msnry = new Masonry('.service__items', {
      itemSelector: '.service__item',
      gutter: 30,
      percentPosition: true,
   });
});

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
         const animItem = animItems[index];
         const animItemHeight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top;
         const animStart = 10;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
         ) {
            animItem.classList.add('_active');
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
   }
   setTimeout(() => {
      animOnScroll();
   }, 300);
}
document.addEventListener('DOMContentLoaded', function () {
   function callback(entries, observer) {
      if (entries[0].isIntersecting) {
         headerElement.classList.remove('_scroll');
      } else {
         headerElement.classList.add('_scroll');
      }
   }
   const headerElement = document.querySelector('.header');
   const headerObserver = new IntersectionObserver(callback);
   headerObserver.observe(headerElement);
});

document.addEventListener('DOMContentLoaded', () => {
   const setActiveLink = () => {
      const links = document.querySelectorAll('.menu__link');
      const sections = document.querySelectorAll('section[data-section]');
      sections.forEach((section) => {
         if (
            window.pageYOffset + document.querySelector('.header__body').offsetHeight >=
            section.offsetTop
         ) {
            links.forEach((link) => {
               if (link.classList.contains('_active')) {
                  link.classList.remove('_active');
               }
            });
            document
               .querySelector(`.menu__link[href='#${section.dataset.section}']`)
               .classList.add('_active');
         }
      });
   };

   setActiveLink();

   window.addEventListener('scroll', () => {
      setActiveLink();
   });
   window.addEventListener('resize', () => {
      setActiveLink();
   });
});

function ibg() {

	let ibg = document.querySelectorAll("._ibg");

	for (let index = 0; index < ibg.length; index++) {
		if (ibg[index].querySelector('img')) {
			ibg[index].style.backgroundImage = 'url(' + ibg[index].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();
function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// ???????????? ????????????????
	this.??bjects = [];
	this.daClassname = "_dynamic_adapt_";
	// ???????????? DOM-??????????????????
	this.nodes = document.querySelectorAll("[data-da]");

	// ???????????????????? ??bjects ????????????????
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const ??bject = {};
		??bject.element = node;
		??bject.parent = node.parentNode;
		??bject.destination = document.querySelector(dataArray[0].trim());
		??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
		??bject.index = this.indexInParent(??bject.parent, ??bject.element);
		this.??bjects.push(??bject);
	}

	this.arraySort(this.??bjects);

	// ???????????? ???????????????????? ??????????-????????????????
	this.mediaQueries = Array.prototype.map.call(this.??bjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// ?????????????????????? ?????????????????? ???? ??????????-????????????
	// ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// ???????????? ???????????????? ?? ???????????????????? ????????????????????????
		const ??bjectsFilter = Array.prototype.filter.call(this.??bjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, ??bjectsFilter);
		});
		this.mediaHandler(matchMedia, ??bjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < ??bjects.length; i++) {
			const ??bject = ??bjects[i];
			??bject.index = this.indexInParent(??bject.parent, ??bject.element);
			this.moveTo(??bject.place, ??bject.element, ??bject.destination);
		}
	} else {
		for (let i = 0; i < ??bjects.length; i++) {
			const ??bject = ??bjects[i];
			if (??bject.element.classList.contains(this.daClassname)) {
				this.moveBack(??bject.parent, ??bject.element, ??bject.index);
			}
		}
	}
};

// ?????????????? ??????????????????????
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

// ?????????????? ????????????????
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// ?????????????? ?????????????????? ?????????????? ???????????? ????????????????
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place 
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max
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
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
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
			target.hidden = true;
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
}

let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
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
}

let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
let spoilersArray = document.querySelectorAll("[data-spoilers]");

if (spoilersArray.length > 0) {
	// ?????????????????? ?????????????? ??????????????????
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		return !item.dataset.spoilers.split(",")[0];
	})
	// ?????????????????????????? ?????????????? ??????????????????
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}

	// ?????????????????? ?????????????????? ?? ?????????? ??????????????????
	const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
		return item.dataset.spoilers.split(",")[0];
	})

	// ?????????????????????????? ?????????????????? ?? ?????????? ??????????????????
	if (spoilersMedia.length > 0) {
		const breakpointsArray = [];

		spoilersMedia.forEach(item => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		})

		// ???????????????? ???????????????????? ??????????????????????
		let mediaQueries = breakpointsArray.map(item => {
			return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
		});

		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		})

		// ???????????????? ?? ???????????? ????????????????????????
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// ?????????????? ?? ?????????????? ??????????????????
			const spoilersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			})
			matchMedia.addEventListener("change", function () {
				initSpoilers(spoilersArray, matchMedia)
			})
			initSpoilers(spoilersArray, matchMedia);
		})
	}

	// ??????????????????????????
	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach(spoilersBlock => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add("_init");
				initSpoilerBody(spoilersBlock);
				spoilersBlock.addEventListener("click", setSpoilerAction);
			} else {
				spoilersBlock.classList.remove("_init");
				initSpoilerBody(spoilersBlock, false);
				spoilersBlock.removeEventListener("click", setSpoilerAction);
			}
		})
	}

	// ???????????? ?? ??????????????????
	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");
		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach(spoilerTitle => {
				if (hideSpoilerBody) {
					spoilerTitle.removeAttribute("tabindex");
					if (!spoilerTitle.classList.contains("_active")) {
						spoilerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spoilerTitle.setAttribute("tabindex", "-1");
					spoilerTitle.nextElementSibling.hidden = false;
				}
			})
		}
	}
	function setSpoilerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
			const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
			if (!spoilersBlock.querySelectorAll("._slide").length) {
				if (oneSpoiler && !spoilerTitle.classList.contains("_active")) {
					hideSpoilerBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle("_active");
				_slideToggle(spoilerTitle.nextElementSibling, 500)
			}
			e.preventDefault();
		}
	}
	function hideSpoilerBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove("_active");
			_slideUp(spoilerActiveTitle.nextElementSibling, 500)
		}
	}
}
//BuildSlider


let sliders = document.querySelectorAll("._swiper");

if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-build')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement("div");
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = "";
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-build');
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_build_callback();
}

function sliders_build_callback() { }

let testimonial__slider = new Swiper('.slider-testimonial__body', {
	slidesPerView: 1,
	loop: true,
	pagination: {
		el: '.slider-testimonial__dotts',
		clickable: true,
	},
})

