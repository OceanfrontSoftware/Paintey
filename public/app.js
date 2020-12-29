/* OPEN MODAL FORM EDITORS */
$(document).ready(function(){
    $("button[data-action]").click(openActionHandler);
    $(".closeButton").click(closeActionHandler)
})

function openActionHandler(event){
    event.preventDefault();
    var button = $(this);
    var action = button.attr('data-action');
    
    if(action == '')
        return console.log('no form associated with this button data-action');

    
    $("#form-container").removeClass('hide');
    var button = $("#"+ action);
    button.removeClass('hide');
    button.addClass('show');
}

function closeActionHandler(){
    console.log('close');
    var form = $(".show");
    var action = form.attr('id');
    $("#form-container").addClass('hide');
    var button = $("#"+ action);
    button.addClass('hide');
    button.removeClass('show');
}


