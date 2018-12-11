let tagsArr = [];
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

$('#filterButton').on('click', function() {
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

/* Collect tags */

gridItems.each(function(index,gridItem) {
    let itemTag = gridItems[index].dataset.tags;
    if (!tagsArr.includes(itemTag)){
        tagsArr.push(itemTag);
    }
}) 

/* Create Buttons from Tags */

for( tag in tagsArr) {
    let buttonId = tagsArr[tag].replace(/\s/g, '');
    let button = document.createElement('button');
    button.className = 'filter-menu-button';
    button.innerHTML = tagsArr[tag].toLowerCase();
    filterMenu.append(button);
    button.onclick = dynamicTagButtons;
    button.id = buttonId;
}

/* Click Events for Dynamic Buttons */

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
    let firstLetterRx = tag.text();
    let uppercaseFirstLetter = firstLetterRx.replace(/\b[a-z]/g,function(f){return f.toUpperCase();});
    $('.filter-container-right-text').empty();
    $('.filter-container-right-text').text(uppercaseFirstLetter);
}

function resetGridClasses() {
    $('.filter-menu-button').removeClass('active');
    gridItems.each(function(index,gridItem) {
        $(gridItem).removeClass('hide');
    })
}

$('#showAllButton').on('click', function() {
    updateCategoryText(allCategories);
    $('.filter-menu-button').removeClass('active');
    gridItems.each(function(index,gridItem) {
        $(gridItem).removeClass('hide');
    })
    initalizeGrid();
})

/* Deep Linking */

var getTheHashInUrl = function () {
    var hash = window.location.hash;
    let stringToArr = hash.split('');
    let removeHashFromStr =  stringToArr.splice(1, stringToArr.length).join('').toLowerCase();
    $('#'+ removeHashFromStr).click();
};

$(window).on('load', getTheHashInUrl);

/* Initialize grid on load */

initalizeGrid();

 

