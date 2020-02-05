$(document).ready(function(){
    $('body > .spinner-border').addClass('d-none');
    $('#demoModal').removeClass('d-none');
    $('#demoModal').modal('show');
});

$(document).ready(function () {
    $('.demo').click( () => {
        $('body > .spinner-border').removeClass('d-none');
        setTimeout(function(){
            $('.carousel').removeClass('d-none');
            $('body > .spinner-border').addClass('d-none');
        }, 5000);
    })
        
});