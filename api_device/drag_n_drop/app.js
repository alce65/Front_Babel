function dragging(oEvent) {
    $(oEvent.target).addClass('dragging');
    $draggedItem = $(oEvent.target);
}
function draggingEnded(oEvent) {
    $(oEvent.target).removeClass('dragging');
}

function dropItem(oEvent) {
    var domNicho = $(oEvent.target);
    if (domNicho.hasClass('nicho') && domNicho.children().length == 0) {
        $draggedItem.detach();
        $draggedItem.appendTo(domNicho);
    }
}

var $draggedItem;
$(document).ready(function () {
    // eventos cuando se arrastra (drag) un item
    $('.item').on('dragstart', dragging);
    $('.item').on('dragend', draggingEnded);
    // eventos cuando se suelta (drop) un item
    $('.nicho').on('dragenter', function (oEv) {oEv.preventDefault() });
    $('.nicho').on('dragover', function (oEv) {oEv.preventDefault() });
    $('.nicho').on('drop', dropItem);
});