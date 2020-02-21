
window.onload=function(){
  $.ajax({
    url: "https://www.instagram.com/fineamode?__a=1",
    method: 'get',
    type:"json",
    success: function (response) {
        posts = response.graphql.user.edge_owner_to_timeline_media.edges;
        posts_html = '';
        for (var i = 0; i < 6; i++) {
            url = posts[i].node.display_url;
            posts_html += '<div class="col-4 col-sm-4 col-md-4 col-lg-2 equal-height paddingInstagram"><a href="https://www.instagram.com/"><img  src="' + url + '" alt="Instagram post" /></a></div>';
        }
        document.querySelector(".posts").innerHTML+=posts_html;
    },
    error(status){
        console.log(status);
    } 
});

}


// $(document).ready(function () {

//     $("#navigacijaLinkovi").hide();
//     $("#hamburger").show();

//     $('#hamburger').click(function () {
//         $("#navigacijaLinkovi").toggle("slide");
//     });

// });

var url=location.href
    navigacija();
    function navigacija(){
        
        
      
        
        $("#hamburger").click(function(){
            $("#navigacijaLinkovi").slideToggle();
           
        });
      
    }

$(window).on("load",function(){
    $("#naslov").animate({opacity:'1'},2500);
    $("#logo").animate({opacity:'1'},2000);
    $("#navigacija").animate({opacity:'1'},2000);
})


