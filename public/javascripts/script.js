$.fn.editable.defaults.mode = 'inline';
$.fn.editable.defaults.ajaxOptions = {
    type: "PUT"
};

function onTextAreaShown() {
    $(".content").on("shown", function(element, test) {
        $(test.input.$input[0]).attr("cols", "55")
    });
}

$(document).ready(function() {
    $('.content').editable();
    onTextAreaShown();
});

$('.submit').on('click', function() {
    var post = $("#twit").val().trim();
    $.ajax({
        type: "POST",
        url: '/twit',
        data: {
            content: post
        },
        success: function(data, textStatus, jqXHR) {
            $("#twit").val('')
            $('.list-group').prepend(data);
            $('.content').editable();
            onTextAreaShown();
        }
    });
});

$(document).on('click', '.delete', function() {
    $elm = $(this);
    var post = $elm.attr('data-val');
    $.ajax({
        type: "DELETE",
        url: '/twit/' + post,
        success: function(data, textStatus, jqXHR) {
            $elm.parent().fadeOut(500, function() {
                $elm.parent().remove();
            });
        }
    });
});