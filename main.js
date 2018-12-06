

$('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: 1,
    // percentPosition: true,
    // gutter: 1,
    fitWidth: true
  });

$('#filterButton').on('click', function(){
	$('.filter-menu').toggleClass('show');
})

/* Close the menu if you click away from it */
$(document).click(function(event) {
  if (!$(event.target).closest(".filter-menu,.filter-container").length) {
    $("body").find(".filter-menu").removeClass("show");
  }
});
