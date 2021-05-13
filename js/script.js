
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log;


// todo: слайдер і вкладки будуть vanilla JS!

/*
// слайдер на головній
$('#carousel').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items: 1,
    margin: 30,
    stagePadding: 30,
    smartSpeed: 450,
    dots: true,
    autoplay: true,
    loop: true
});
    
// tabs
(function($) {
    $(function() {
        $('ul.tabs-caption').on('click', 'li:not(.active)', function() {
            $(this).addClass('active')
                    .siblings()
                    .removeClass('active')
                    .closest('div.tabs')
                    .find('div.tabs-content')
                    .removeClass('active')
                    .eq($(this).index())
                    .addClass('active');
        });
    });
})(jQuery);
*/


/**
 * фото у товарі
 */
{
    const fullImage = $('#item-image-full img');
    const thumbs = $$('#item-thumbs img');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            e.preventDefault();
            fullImage.src = thumb.src;
        });
    });
}


/**
 * вкладки
 */
{
    let tabs = $$('.tabs .tabs-caption li');
    let panes = $$('.tabs .tabs-content');

    tabs.forEach((item,i) => {

        item.onclick = () => {
            for(let tab of tabs){
                tab.classList.remove('active'); 
            }
            item.classList.add('active');

            for(let pane of panes){
                pane.classList.remove('active');
            }
            panes[i].classList.add('active');
        }

    });
}