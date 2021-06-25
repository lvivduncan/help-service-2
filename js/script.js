'use strict';

// window.onload = function(){
    
    if(window.innerWidth < 1100){

        levusTooltip();
    }
    
// }

/**
 * стікед навбар
 */

{
    const contact = document.getElementById('contact');

    // flag
    let checkOffset = false;

    const menuButton = document.getElementById('mobile-menu-button'),
          list = document.getElementById('list'),
          phoneButton = document.getElementById('mobile-phone-button'),
          modalContact = document.getElementById('modal-contact'),
          search = document.getElementById('search'),
          searchOutput = document.getElementById('search-output')

    // click to mobile button (menu)
    menuButton.addEventListener('click', () => {

        // switch button class
        menuButton.classList.toggle('active');

        // show/hide nav
        list.classList.toggle('active');

        // close other
        phoneButton.classList.remove('active');
        modalContact.classList.remove('active');

        search.classList.remove('active');
        searchOutput.classList.remove('active');
        search.value = '';
    });

    // click to mobile button (phone)
    phoneButton.addEventListener('click', () => {

        // switch button class
        phoneButton.classList.toggle('active');

        // show/hide phones
        modalContact.classList.toggle('active');

        // close other
        menuButton.classList.remove('active');
        list.classList.remove('active');

        search.classList.remove('active');
        searchOutput.classList.remove('active');
        search.value = '';
    });

    // click and input field search
    search.addEventListener('click', () => {

        // close other
        phoneButton.classList.remove('active');
        modalContact.classList.remove('active');
        menuButton.classList.remove('active');
        list.classList.remove('active');          
    });

    search.addEventListener('input', () => {

        // view/hide block
        if(!search.value){
            search.classList.remove('active');
            searchOutput.classList.remove('active');
        } else {
            searchOutput.classList.add('active');
            search.classList.add('active');
        }
    });

    window.addEventListener('scroll', () => {

        // const list = document.getElementById('list');
        const listOffset = list.getBoundingClientRect().top;
        const headerOffset = document.getElementById('header').getBoundingClientRect().top;

        if(listOffset < 1) {
            
            if(!checkOffset){
                
                contact.classList.add('active');
                list.classList.add('sticky');
                checkOffset = true;
            }

        }

        if(headerOffset > -10){
            
            if(checkOffset){
                
                contact.classList.remove('active');
                list.classList.remove('sticky');
                checkOffset = false;
            }
            
        }

        // clear class menu
        setTimeout(() => {
            phoneButton.classList.remove('active');
            modalContact.classList.remove('active');
            menuButton.classList.remove('active');
            list.classList.remove('active');
            search.classList.remove('active');
            searchOutput.classList.remove('active');            
        }, 50);

    });

}

/**
 * вкладки
 */
{
    let tabs = document.querySelectorAll('.tabs .tabs-caption li');
    let panes = document.querySelectorAll('.tabs .tabs-content');

    tabs.forEach((item,i) => {

        item.addEventListener('click', () => {
            for(let tab of tabs){
                tab.classList.remove('active'); 
            }
            item.classList.add('active');

            for(let pane of panes){
                pane.classList.remove('active');
            }
            panes[i].classList.add('active');            
        });

    });
}

/**
 * слайдер нa головній з автозміною, тому без стрілок
 */
{

    // обгортка
    const slider = document.querySelector('#levus-slider');

    // якщо слайдер існує, тоді робимо все решта
    if (slider !== null) {
        // елементи
        const slides = slider.querySelectorAll('.levus-slide');

        // 1 елемент
        const first = slides[0];

        // вліво
        const left = slider.querySelector('#levus-left');

        // вправо
        const right = slider.querySelector('#levus-right');

        // лічильник
        let cnt = 0;

        // кількість елементів
        const length = slides.length - 1;
        
        first.classList.add('show');

        autoScroll();

        function autoScroll() {
            setInterval(() => {
                slides.forEach(slide => slide.classList.remove('show'));
                cnt < length ? cnt++ : cnt = 0;
                slides[cnt].classList.add('show');
            }, 8000);
        }
    }
    
}

/**
 * фото у товарі
 * мініатюри і скрол
 */
{
    const scroll = document.querySelectorAll('.levus-horizontal-scroll');

    scroll.forEach(item => {
        const ul = item.querySelector('ul');
        // elements
        let li = ul.querySelectorAll('li');

        // if less than 4, cloned 
        if (li.length <= 4) {
            // cloned and append elements
            li.forEach(element => ul.append(element.cloneNode(true)));
            // new nodelist
            li = item.querySelectorAll('li');
        }

        item.innerHTML += '<div class="levus-nav"><span class="left"></span><span class="right"></span></div>';

        item.addEventListener('click', e => {
            const ul = item.querySelector('ul');
            if (e.target.className == 'left') {
                // move last element
                const last = ul.lastElementChild;
                ul.prepend(last);
                // destroy transition
                ul.style.transition = 'none';
                ul.classList.add('to-right');
                setTimeout(() => {
                    ul.classList.remove('to-right');
                    ul.style.transition = '.5s';
                }, 50);
            }
        });

        item.addEventListener('click', e => {
            const ul = item.querySelector('ul');
            if (e.target.className == 'right') {
                // move first element
                const first = ul.firstElementChild;
                ul.append(first);
                // destroy transition
                ul.style.transition = 'none';
                ul.classList.add('to-left');
                setTimeout(() => {
                    ul.classList.remove('to-left');
                    ul.style.transition = '.5s';
                }, 50);
            }
        });
    });

    // заміна великого фото при наведенні
    const full = document.querySelector('#item-image-full img');
    const thumbs = document.querySelectorAll('#item-thumbs img');

    thumbs.forEach(thumb => {
        thumb.addEventListener('mouseover', () => {
            full.src = thumb.src;
        });
    });
}

// lightbox
const lightboxDescription = GLightbox({
    selector: '.glightbox',
    loop: true
});


/**
 * modal
 */
{
    // const basket = document.getElementById('basket');
    const modalBasket = document.getElementById('modal-basket');

    // кошика може не бути
    if(modalBasket !== null){

        modalBasket.className = 'display-none';

        // create modal window
        const modal = document.createElement('div');
        modal.setAttribute('id', 'modal-wrapper');

        const close = document.createElement('div');
        close.setAttribute('id', 'modal-button-close');

        // open-close
        document.addEventListener('click', e => {        
            if(e.target.id === 'basket' || e.target.id === 'basket-sum' || e.target.id === 'checkout-edit'){
                // e.preventDefault();
            
                // add modal
                document.body.className = 'modal-body-fixed';
                document.body.append(modal);
        
                // close button
                modalBasket.append(close);

                // show mobile basket
                modalBasket.className = '';
            }

            if(e.target.id == 'modal-wrapper' || e.target.id === 'modal-button-close'){

                // clear and close modal
                document.body.className = '';
                modal.remove();
                close.remove();
                modalBasket.className = 'display-none';

            }
        });

        // close 'esc'
        document.addEventListener('keydown', e => {
            if(e.code === 'Escape' || e.key === 'Escape'){

                // clear and close modal
                document.body.className = '';
                modal.remove();
                modalBasket.className = 'display-none';
            }
        });


        
        // create checkout edit button
        const checkoutGoods = document.getElementById('checkout-goods');
        
        // check empty
        if(checkoutGoods !== null){

            const checkoutEdit = document.createElement('div');
            checkoutEdit.setAttribute('id', 'checkout-edit');
            checkoutGoods.append(checkoutEdit);

            // checkout tabs
            const checkoutInfoButton = document.querySelector('.checkout-info');
            const checkoutGoodsButton = document.querySelector('.checkout-goods');

            const checkoutInfoData = document.getElementById('checkout-info');
            const checkoutGoodsData = document.getElementById('checkout-goods');

            checkoutInfoButton.addEventListener('click', () => {
                checkoutInfoData.classList.add('active');
                checkoutGoodsData.classList.remove('active');

                checkoutInfoButton.classList.add('active');
                checkoutGoodsButton.classList.remove('active');
            });

            checkoutGoodsButton.addEventListener('click', () => {
                checkoutGoodsData.classList.add('active');
                checkoutInfoData.classList.remove('active');

                checkoutGoodsButton.classList.add('active');
                checkoutInfoButton.classList.remove('active');
            });
        }

    }


}


/**
 * plus, minus, delete, quantity and other (basket)
 */
{
    // mobile basket
    const modalBasket = document.getElementById('modal-basket');

    // quantity
    const quantity = modalBasket.querySelector('#modal-basket-number stong');

    // todo: quantity

    // sum
    const sum = modalBasket.querySelector('#modal-sum span');

    // todo: sum

    // todo: change number from keyboard


    // virtual dom
    modalBasket.addEventListener('click', e => {
        
        // видаляємо товар
        if(e.target.classList == 'product-button-delete'){
            e.target.parentElement.parentElement.remove();
        }

        // click minus
        if(e.target.className == 'minus'){

            const article = e.target.parentElement.parentElement;
            const number = article.querySelector('.number');

            // check 0
            if(number.value == 1){
                number.parentElement.parentElement.parentElement.remove();
            } else {
                number.value = +number.value - 1;
            }

        }

        // click plus
        if(e.target.className == 'plus'){

            const article = e.target.parentElement.parentElement;
            const number = article.querySelector('.number');
            number.value = +number.value + 1;

        }

    });

}


/**
 * filter-range and filter-price
 */
{
    if(document.getElementById('filter-price') != null){
        // ліве поле (мінімум)
        const min = document.getElementById('filter-price-min');

        // праве поле (максимум)
        const max = document.getElementById('filter-price-max');

        // лівий бігунок
        const left = document.getElementById('filter-range-left');

        // правий бігунок
        const right = document.getElementById('filter-range-right');

        // move range
        left.addEventListener('input', () => {
            min.value = left.value;
        });

        right.addEventListener('input', () => {
            max.value = right.value;
        });

        // change numbers
        min.addEventListener('change', () => {
            left.value = min.value;
        });

        max.addEventListener('change', () => {
            right.value = max.value;
        });  
    }
}

// to up
{
    const levusUp = document.createElement('div');
    levusUp.setAttribute('id', 'levus-up');
    document.body.append(levusUp);

    // show/hide
    window.addEventListener('scroll', () => {
        if(window.pageYOffset < 50){
            levusUp.className = '';
        } else if(window.pageYOffset > 100) {
            setTimeout( () => {
                levusUp.className = 'active';
            }, 10);
        }
    });

    // click to up
    levusUp.addEventListener('click', () => {
        document.documentElement.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * автоматичні тултіпи
 */

 function levusTooltip(){
    // затримка
    const delay = 1000;

    // елементи
    const tooltip = document.querySelectorAll('.levus-tooltip');

    if(localStorage.tooltip != 1){

        // швидше працює
        for(let i = 0; i<tooltip.length; i++){

            // створили елемент
            const span = document.createElement('span');

            // додали клас для вибірки
            span.setAttribute('class', 'content');

            // отримали контент з атрибута
            const title = tooltip[i].ariaLabel;

            // встановили затримку
            span.style.animationDelay = `${delay * i}ms`;

            // поклали дані з атрибута у тултіп
            span.append(title);

            // додали в тег
            tooltip[i].append(span);

            // додатковий клас для першого
            tooltip[0].classList.add('first');

            // додатковий клас для останнього
            tooltip[tooltip.length - 1].classList.add('last');
        }

        localStorage.tooltip = 1;

    }

}