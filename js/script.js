


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

