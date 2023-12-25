$(document).ready(function () {

    var homeExperiencesRowContainerClass = $(".Home-ExperiencesRow");
    var height = $(".Home-ExperiencesContainer").height();
    var previoush = $(".Home-ExperiencesContainer").height()
    var arrayPreviousHeights = new Array();
    var noOfExpandedRows = 0;

    var tabItem = $(".Home-TabItemContainer");


    $('.timeline-line-svg').css("height", height + "px");

    homeExperiencesRowContainerClass.click(function () {

        // toggle 'arrow svg' flip anim
        $(this).find('svg').toggleClass("flip-anim");

        // set height first to prevent jerky animation when first time animating
        // var height = $(this).find('.text-filler-to-get-height').height();
        // $(this).find('.expandable-row').css({ height: height + "px" });

        // prevent spam clicks
        homeExperiencesRowContainerClass.css("pointer-events", "none");

        if ($(this).find(".expandable-row").css("display") == "none") {

            // add height before row expands
            arrayPreviousHeights.push(previoush = $(".Home-ExperiencesContainer").height())

            //  slideDown func
            $(this).find(".expandable-row").slideDown({
                duration: 700,
                start: function () {
                    height = $(".Home-ExperiencesContainer").height()
                    $('.timeline-line-svg').css("height", height + "px");
                },
                complete: function () {
                    homeExperiencesRowContainerClass.css("pointer-events", "auto");
                }
            });
        }
        else {

            // get number of expanded rows
            noOfExpandedRows = $('.expandable-row:visible');

            // slideUp func
            $(this).find(".expandable-row").slideUp({
                duration: 700,
                start: function () {
                    $('.timeline-line-svg').css("height", arrayPreviousHeights.at(noOfExpandedRows.length - 1) + "px");
                    arrayPreviousHeights.splice(noOfExpandedRows.length - 1);
                },
                complete: function () {
                    homeExperiencesRowContainerClass.css("pointer-events", "auto");
                }
            });
        }

        // toggle 'expanded row text' fade in anim
        $(this).find('p').toggleClass("fade-down-anim");
    });



    tabItem.click(function () {

        var id = "";
        id = $(this).find('.StampHoverFiller>h3').text().toString().toLowerCase().replace(/[^A-Za-z]/g, "");

        $('#Home-About-Tab .Stamp-SvgContainer').removeClass('active')
        $(this).find('.Stamp-SvgContainer').addClass('active')

        // REMOVE ACTIVE FROM StampHoverFiller
        $('#Home-About-Tab .StampHoverFiller').removeClass('active')
        $(this).find('.StampHoverFiller').addClass('active')

        $('.Home-TabContentContainer').removeClass('active');
        $('#home-about-tab-' + id + '.Home-TabContentContainer').addClass('active');
        // alert(id)
    });


    var windowWidth = 0;
    var sectionWidth = 0;
    var contentWidth = 0;
    var colGap = 0;
    var titleWidth = 0;
    var remainder = 0;
    var change = 0;

    // alert(change)

    $('.Project-Card').hover(
        function () {
            // windowWidth = window.innerWidth
            // section width
            sectionWidth = $('.Home-Section').width();
            // content width
            contentWidth = $('.Home-SectionContainer').width();
            colGap = $('.Home-SectionContainer').css('column-gap').replace('p', '').replace('x', '');

            //title width
            titleWidth = $('.Home-SectionTitle').width();
            // remainder
            remainder = (sectionWidth - contentWidth) / 2;
            // change
            change = contentWidth - titleWidth - colGap + remainder;


            $('.Home-Projects-Container').css("width", change + "px");
            $('.Project-Card').css("flex-basis", "19.5%");
            // alert(change)
            // $(this).css({
            //     // 'flex-grow': '0',
            //     // 'transition': '0.5s ease-in-out'
            // });
        },
        function () {
            $('.Home-Projects-Container').css("width", "100%");
            $('.Project-Card').css("flex-basis", "33%");
            // $(this).css({
            //     // 'flex-grow': '1',
            //     // 'transition': 'none'
            // });        
        });
});