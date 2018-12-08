let tagsArr = [];
// let gridArr = [];
let gridItems = $('.grid').children();
let filterMenu = $('.filter-menu-button-container');
let allCategories = $('#showAllButton');

function initalizeGrid() {
    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: 1,
        fitWidth: true
    });
}

$('#filterButton').on('click', function(){
    $('.filter-menu').toggleClass('show');
    $('#filterButton').toggleClass('active');
})

/* Close the menu if you click away from it */
$(document).click(function(event) {
  if (!$(event.target).closest(".filter-menu,.filter-container").length) {
    $("body").find(".filter-menu").removeClass("show");
    $('#filterButton').removeClass('active');
  }
});
 
gridItems.each(function(index,gridItem) {
    let itemTag = gridItems[index].dataset.tags;
    if (!tagsArr.includes(itemTag)){
        tagsArr.push(itemTag);
    }
})

for( tag in tagsArr) {
    let button = document.createElement('button');
    button.className = 'filter-menu-button';
    button.innerHTML = tagsArr[tag];
    filterMenu.append(button);
    button.onclick = dynamicTagButtons;
}

function dynamicTagButtons() {
    let buttonClicked = $(this);
    resetGridClasses();
    $(buttonClicked).addClass('active');
    updateCategoryText(buttonClicked);
    gridItems.each(function(index,gridItem) {
        let itemTag = gridItems[index].dataset.tags;
        if (itemTag === buttonClicked.text()){
            return;
        } else {
            $(gridItem).addClass('hide');
            initalizeGrid();
        }
    })
}

function updateCategoryText(tag) {
    $('.filter-button-right').empty();
    $('.filter-button-right').text(tag.text());
}

function resetGridClasses() {
    /* Just need to remove active class from button clicked */
    $('.filter-menu-button').removeClass('active');
    gridItems.each(function(index,gridItem) {
        $(gridItem).removeClass('hide');
    })
}

$('#showAllButton').on('click', function(){
    updateCategoryText(allCategories);
    $('.filter-menu-button').removeClass('active');
    gridItems.each(function(index,gridItem) {
        $(gridItem).removeClass('hide');
    })
    initalizeGrid();
})

/* Initialize grid on load */
initalizeGrid();