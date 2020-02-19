// window.onload=function(){
   
  
    
    
// }
// $(function() {                       //run when the DOM is ready
//   $("#hamburger").click(function() {  //use a class, since your ID gets mangled
//     $("#navigacijaLinkovi").addClass("active"); 
    
//   });
//   $("#hamburger").click(function() {  //use a class, since your ID gets mangled
//     $("#navigacijaLinkovi").removeClass("active"); 
  
//   });
// });
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
            posts_html += '<div class="col-6 col-sm-6 col-md-4 col-lg-2 equal-height paddingInstagram"><a href="https://www.instagram.com/"><img  src="' + url + '" alt="Instagram post" /></a></div>';
        }
        document.querySelector(".posts").innerHTML+=posts_html;
    },
    error(status){
        console.log(status);
    }
});
}


