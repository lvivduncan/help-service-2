'use strict';

const log = console.log;

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
    const basket = document.getElementById('basket');
    const modalBasket = document.getElementById('modal-basket');

    modalBasket.className = 'display-none';

    // create modal window
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    
    basket.addEventListener('click', e => {
        e.preventDefault();
        
        // add modal
        document.body.className = 'modal-body-fixed';
        document.body.append(modal);

        // show mobile basket
        modalBasket.className = '';
        
    });

    document.addEventListener('click', e => {
        // e.preventDefault();

        if(e.target.id == 'modal'){

            // clear
            document.body.className = '';
            modal.remove();
            modalBasket.className = 'display-none';

        }
    });
}


/**
 * plus, minus, delete, quantity and other
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
