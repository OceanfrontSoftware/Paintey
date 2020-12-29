/* OPEN MODAL FORM EDITORS */
$(document).ready(function(){
    $("button[data-action]").click(openActionHandler);
    $(".closeButton").click(closeActionHandler)
})


function openActionHandler(event){
    event.preventDefault();
    var button = $(this);
    var action = button.attr('data-action');
    $("#form-container").removeClass('hide');
    $("#"+ action).removeClass('hide');
    $("#"+ action).addClass('show');
}

function closeActionHandler(){
    console.log('close');
    var form = $(".show");
    var action = form.attr('id');
    $("#form-container").addClass('hide');
    $("#"+ action).addClass('hide');
    $("#"+ action).removeClass('show');
}


