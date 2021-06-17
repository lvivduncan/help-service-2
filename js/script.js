'use strict';

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
 * слайдер не головній з автозміною, тому без стрілок
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

    modalBasket.className = 'display-none';

    // create modal window
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal-wrapper');

    const close = document.createElement('div');
    close.setAttribute('id', 'modal-button-close');

    // open-close
    document.addEventListener('click', e => {        
        if(e.target.id === 'basket' || e.target.id === 'basket-sum' || e.target.id === 'checkout-edit'){
            e.preventDefault();
        
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


    // todo: add check empty
    
    // create checkout edit button
    const checkoutGoods = document.getElementById('checkout-goods');
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

/**
 * mobile header
 */
/* 
{
    // місце, де все відбувається
    const header = document.querySelector('#header .wrapper');

    const basket = document.getElementById('basket').cloneNode(true);
    const search = document.getElementById('search').cloneNode(true);

    const button = document.createElement('div');
    button.setAttribute('id', 'mobile-button');

    const body = document.querySelector('body');

    const spacer = document.createElement('div');
    spacer.setAttribute('id', 'header-spacer');

    window.addEventListener('resize', function() {
        requestAnimationFrame(changeHeader);
        
    });

    changeHeader();

    // при зменшенні екрану у хедері мають вставитися 3 елементи замість попередніх двох
    // мобільна кнопка має бути згенерована
    function changeHeader(){

        if(window.innerWidth < 1240){

            document.body.prepend(spacer);
            header.append(button);
            header.append(basket);
            header.append(search);

        }
        
        if(window.innerWidth > 1240){

            spacer.remove();
            button.remove();
            basket.remove();
            search.remove();
        }
    }
}
 */
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
 * desktop menu catalog fixed
 */
/* 
{
    const body = document.querySelector('body');
    const list = document.getElementById('list');
    const listOffsetTop = list.getBoundingClientRect().top;

    // const spacer = document.createElement('div');
    // spacer.setAttribute('id', 'header-spacer');
    
    window.addEventListener('scroll', () => {

        if(window.pageYOffset > listOffsetTop){
            list.classList.add('fixed');
            // document.body.prepend(spacer);
            body.classList.add('offset-top');
        }
        
        if(window.pageYOffset <= listOffsetTop) {
            list.classList.remove('fixed');
            // spacer.remove();
            body.classList.remove('offset-top');
        }

    });
}
 */


/**
 * mobile and fixed menu
 */
{
    // смуга з каталогом
    const list = document.querySelector('#list');

    const wrapper = list.querySelector('.wrapper');

    // кошик
    const basket = document.getElementById('basket').cloneNode(true);

    // пошук
    const search = document.getElementById('search').cloneNode(true);

    // мобільна кнопка
    const button = document.getElementById('list-button');

    // меню каталогу
    const menu = list.querySelector('ul');

/* 
    if(window.innerWidth <= 1240){

        fixedMenu();  

    } else {

        window.addEventListener('scroll', () => {

            // висота до смуги з каталогом
            const listOffsetTop = list.getBoundingClientRect().top;

            if(listOffsetTop < 1){

                fixedMenu();
            } else {

                unFixedMenu();
            }
        });
    }

    window.addEventListener('resize', () => {
        if(window.innerWidth <= 1240){

            fixedMenu();
        } else {

            unFixedMenu();
        }
    });
 */

    // чЕкаємо на виконання умови
    let flag = false;

    if(window.innerWidth <= 1240){

        if(flag === false){

            fixedMenu();
            flag = true;
        }

    } else {       

        window.addEventListener('scroll', () => {

            // висота до смуги з каталогом
            const listOffsetTop = list.getBoundingClientRect().top;

            if(listOffsetTop < 1){

                if(flag === false){

                    fixedMenu();
                    flag = true;
                }

            } else {

                if(flag === true){

                    unFixedMenu();
                    flag = false;
                }
            }
        });
    }

    window.addEventListener('resize', () => {
        if(window.innerWidth <= 1240){

            if(flag === false){

                fixedMenu();
                flag = true;
            }

        } else {

            if(flag === true){

                unFixedMenu();
                flag = false;
            }

        }

    });

    list.addEventListener('click', e => {
        if(e.target.classList.contains('sticky-button')){
            e.target.classList.toggle('active');
            menu.classList.toggle('active');
        }
    });

    function fixedMenu(){
        list.classList.add('sticky');
        // menu.classList.add('sticky-menu');
        button.classList.add('sticky-button');
        wrapper.append(search);
        wrapper.append(basket);
    }

    function unFixedMenu(){
        list.classList.remove('sticky');
        // menu.classList.remove('sticky-menu');
        button.classList.remove('sticky-button');
        search.remove();
        basket.remove();
    }

}

{



}