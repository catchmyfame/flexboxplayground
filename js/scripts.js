$(function () {
    var maxContainerWidth, selectedItem;
    $('#resize_toggle').change(function () {
        if ($(this).is(':checked')) {
            $("#resizable").css("resize", "both");
        } else {
            $("#resizable").css("resize", "none");
        }
    })
    var item = 1;
    $('#add_item').click(function () {
        item++;
        var content = `<div class="flex_item"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>Item ${item}</div>`;
        $(content).hide().appendTo('#flexbox_container').fadeIn('fast');
    })
    $('#reset').click(function () { if (confirm("Are you sure you want to reset the playground?")) location.reload(); });
    $('#view').click(function(){
        // slidetoggle a div from the top with code
        var container_display = getComputedStyle( document.getElementById('flexbox_container') ).getPropertyValue('display'); 
        var container_flex_dir = getComputedStyle( document.getElementById('flexbox_container') ).getPropertyValue('flex-direction'); 
        var container_flex_wrap = getComputedStyle( document.getElementById('flexbox_container') ).getPropertyValue('flex-wrap'); 
        var container_justify_content = getComputedStyle( document.getElementById('flexbox_container') ).getPropertyValue('justify-content'); 
        var container_align_items = getComputedStyle( document.getElementById('flexbox_container') ).getPropertyValue('align-items'); 
        var container_align_content = getComputedStyle( document.getElementById('flexbox_container') ).getPropertyValue('align-content'); 
console.log(container_display, container_flex_dir, container_flex_wrap, container_justify_content, container_align_items, container_align_content);
        code = htmlEntities(`<div style="display: ${container_display}; ">code</div>`);
        $('#code').html(`<pre><code>${code}</code></pre>`).slideToggle('fast');
    })
    $('#flexbox_container').on('click', '.flex_item > button', function (e) {
        e.stopPropagation();
        $(this).parent('.flex_item').remove();
        $('div.flex_item').html(function(i,o){
            return(o.replace(/Item \d*/g, `Item ${i+1}`))
        });
        item--;
    })
    $('input[name="container_display"]').change(function () {
        $("#flexbox_container").css('display', $(this).val());
    })
    $('input[name="container_flex_direction"]').change(function () {
        $("#flexbox_container").css('flex-direction', $(this).val());
        if ($(this).val() === 'row') $('#flexbox_container_direction_icon').css('transform', 'rotate(0deg)');
        if ($(this).val() === 'row-reverse') $('#flexbox_container_direction_icon').css('transform', 'rotate(-180deg)');
        if ($(this).val() === 'column') $('#flexbox_container_direction_icon').css('transform', 'rotate(90deg)');
        if ($(this).val() === 'column-reverse') $('#flexbox_container_direction_icon').css('transform', 'rotate(-90deg)');
        $('#flex_flow').text($(this).val() + ' ' + $('input[name="container_flex_wrap"]:checked').val());
        var flex_wrap = $('input[name="container_flex_wrap"]:checked').val();
        if (flex_wrap == 'wrap') {
            if ($(this).val() == 'row' || $(this).val() == 'row-reverse') $('#flexbox_container_cross_direction_icon').css('transform', 'rotate(90deg)');
            if ($(this).val() == 'column' || $(this).val() == 'column-reverse') $('#flexbox_container_cross_direction_icon').css('transform', 'rotate(0deg)');
        } else { // wrap-reverse
            if ($(this).val() == 'row' || $(this).val() == 'row-reverse') $('#flexbox_container_cross_direction_icon').css('transform', 'rotate(-90deg)');
            if ($(this).val() == 'column' || $(this).val() == 'column-reverse') $('#flexbox_container_cross_direction_icon').css('transform', 'rotate(180deg)');
        }
    })
    $('input[name="container_flex_wrap"]').change(function () {
        $('#flexbox_container').css('flex-wrap', $(this).val());
        $('#flex_flow').text($('input[name="container_flex_direction"]:checked').val() + ' ' + $(this).val());

        if ($(this).val() == 'nowrap') {
            $('#flexbox_container_cross_direction_icon').animate({ opacity: 0 }, 100)
        } else {
            var flex_dir = $('input[name="container_flex_direction"]:checked').val();
            if ($(this).val() == 'wrap') {
                if (flex_dir == 'row' || flex_dir == 'row-reverse') $('#flexbox_container_cross_direction_icon').css('transform', 'rotate(90deg)');
                if (flex_dir == 'column' || flex_dir == 'column-reverse') $('#flexbox_container_cross_direction_icon').css('transform', 'rotate(0deg)');
            } else { // wrap-reverse
                if (flex_dir == 'row' || flex_dir == 'row-reverse') $('#flexbox_container_cross_direction_icon').css('transform', 'rotate(-90deg)');
                if (flex_dir == 'column' || flex_dir == 'column-reverse') $('#flexbox_container_cross_direction_icon').css('transform', 'rotate(180deg)');
            }
            $('#flexbox_container_cross_direction_icon').animate({ opacity: 1 }, 100)
        }
    })
    $('input[name="container_justify_content"]').change(function () {
        $("#flexbox_container").css('justify-content', $(this).val());
    })
    $('input[name="container_align_items"]').change(function () {
        $("#flexbox_container").css('align-items', $(this).val());
    })
    $('input[name="container_align_content"]').change(function () {
        $("#flexbox_container").css('align-content', $(this).val());
    })
    $("#flexbox_container").on('click', '.flex_item', function () {
        selectedItem = $(this);
        $('input[name="flex_grow"]').val($(this).css('flex-grow'));
        $('input[name="flex_shrink"]').val($(this).css('flex-shrink'));
        $('input[name="flex_basis"]').val($(this).css('flex-basis'));
        $('input[name="align_self"][value="' + $(this).css('align-self') + '"]').prop("checked", true)
        $('input[name="order"]').val($(this).css('order'));
        $('#flex').text($(this).css('flex-grow') + ' ' + $(this).css('flex-shrink') + ' ' + $(this).css('flex-basis'));
        $('input[name="flex_item_width"]').val($(this).css('width'));
        $('input[name="flex_item_height"]').val($(this).css('height'));
        $('.flex_item').not(this).removeClass('item_selected');
        selectedItem.toggleClass('item_selected');
    })
    $('input[name="flex_grow"]').change(function () {
        selectedItem.css('flex-grow', $(this).val());
    })
    $('input[name="flex_shrink"]').change(function () {
        selectedItem.css('flex-shrink', $(this).val());
    })
    $('input[name="flex_basis"]').change(function () {
        selectedItem.css('flex-basis', $(this).val());
    })
    $('input[name="align_self"]').change(function () {
        selectedItem.css('align-self', $(this).val());
    })
    $('input[name="order"]').change(function () {
        selectedItem.css('order', $(this).val());
    })
    $('input[name="flex_item_width"]').change(function () {
        selectedItem.css('width', $(this).val());
    })
    $('input[name="flex_item_height"]').change(function () {
        selectedItem.css('height', $(this).val());
    })
    $('#flexbox_container_properties, #flexbox_item_properties').on('click', 'dt label', function () {
        $(this).find('svg').toggleClass('fa-plus-circle fa-minus-circle').closest('dt').next().find('.desc').slideToggle();
    })
    $('#main_row_2').css('top', $('#main_row_1').height());
    $('p a').click(function (e) {
        e.preventDefault();
        var attribs = $(this).parent().next();
        if (attribs.find('.desc:visible').length == attribs.find('.desc').length) {
            attribs.find('.desc').slideUp();
            attribs.find('svg').removeClass('fa-minus-circle').addClass('fa-plus-circle');
        } else {
            attribs.find('.desc').slideDown();
            attribs.find('svg').removeClass('fa-plus-circle').addClass('fa-minus-circle');
        }
    })
    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
});