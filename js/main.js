var url=location.href;
var urlBezIndex=location.pathname;
window.onload=function(){
    prikaziInstagram();
    navigacija();
    
    
    
    
    // if(this.screen.width<400){
    //     document.getElementById("hamburger").addEventListener("click",function(){
    //         let stil=document.getElementById("navigacijaPromenaBojeMaliEkran");
    //         stil.style.backgroundColor="rgba(0,0,0,0.75)";
    //     })
    // }
    
}

// ZA SVE STRANICE
function ispisiNavigaciju(){
    $.ajax({
        url: "data/menu.json",
        method: "get",
        dataType: "json",
        success: function (data) {
           
            let ispis=`<li><a href=""><i class="fas fa-shopping-cart"></i></a></li>`;
            for(let i of data){
                ispis+=`
                <li><a href="${i.href}">${i.tekst}</a></li>`

            }
            console.log(data);
            document.getElementById("navigacijaLinkovi").innerHTML=ispis;
        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
}
ispisiNavigaciju();
$(window).on("load",function(){
    $("#naslov").animate({opacity:'1'},2500);
    $("#logo").animate({opacity:'1'},2000);
    $("#navigacija").animate({opacity:'1'},2000);
})

function navigacija(){
    $("#hamburger").click(function(){
        $("#navigacijaLinkovi").slideToggle();
       
       $(".ham").toggleClass("hamClick");
    });
  
}
function prikaziInstagram(){
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
//INDEX STRANA
if(url.indexOf("index.html")!=-1 || urlBezIndex.indexOf("wp2")!=-1){

$(document).ready(function () {

    $(".socials").hide();
    $("#SocialClick i").show();

    $("#SocialClick i").click(function () {
        $(".socials").toggle("slide");
       
    });

    $(".phone").hide();
    $("#PhoneClick i").show();

    $("#PhoneClick i").click(function () {
        $(".phone").toggle("slide");
       
    });

    $(".email").hide();
    $("#EmailClick i").show();

    $("#EmailClick i").click(function () {
        $(".email").toggle("slide");
       
    });

});

function proveraSubscribe(){
    let emailSub=document.getElementById("emailSubscribe").value;
    let formaSub=document.getElementById("subForm");
    let regEmail=/^\w+((\,|\-|\_)?\w+)*@\w{2,6}\.\w{2,3}$/;

    if(!emailSub.match(regEmail)){
        document.getElementById("greskaSub").innerHTML="Wrong email format input<br/>Refresh the page and write an email in correct format";
        formaSub.reset();
        return false;
    }
    else{
        emailSub.value="";
        alert("You have successfully subscribe to our email subscription sale");
        formaSub.reset();
        return true;
    }
   
}
}


//MAN STRANA
if(url.indexOf("man.html")!=-1){
    ispisiSelectSort();
    document.getElementById("sortiranje").addEventListener("change",sortiraj);
function prikaziSveProizvode(){
    $.ajax({
        url: "data/proizvodi.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            ispisProizvodaFilter(data.muski);  
            
            document.getElementById("searchInput").addEventListener("keyup",function(){
                String(this.value)? filtrirajInput(this.value) : prikaziSveProizvode();
           });

        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
}
function ispisProizvodaFilter(obj){
    let ispis="";

   obj.forEach(element => {ispis+=` 
        <div class="col-lg-4 col-md-4 col-6 proizvod mb-5  mx-md-0">
        <div class="proizvodSlika">
        <img src="img/${element.slika.src}" class="img-fluid mb-3 mx-auto" alt="${element.slika.alt}"/>
        </div>
        <h3>${element.naslov}</h3>
        <p>${element.opis}</p>
        <hr/>
          
        <div class="cena d-flex">
            <p class="cenaProizvod">${element.cena} &euro;</p>
            <i class="fas fa-shopping-cart ml-auto"></i>  
        </div>
        </div>`
       
   });
    document.getElementById("proizvodiPrikaz").innerHTML=ispis;
    
}
prikaziSveProizvode();
function filtrirajInput(text){
    
    $.ajax({
        url: "data/proizvodi.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            let filtrirano=data.muski.filter(x=>{if(x.naslov.toLowerCase().indexOf(text.toLowerCase())!=-1){
                return true;
              
            }})
            
            ispisProizvodaFilter(filtrirano);
            // console.log(filtrirano);
            
        },
        error:function(xhr){
            console.log(xhr);
        } 
    });

}
function ispisiSelectSort(){
    $.ajax({
        url: "data/sort.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            let ispis="";
            for(let i of data){
                ispis+=`<option value="${i.id}">${i.naziv}</option>`
            }
            document.getElementById("sortiranje").innerHTML=ispis;
        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
}
function sortiraj(){
    let izabrano=document.getElementById("sortiranje");
    $.ajax({
        url: "data/proizvodi.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            
            // console.log(muski);
            if(izabrano.value==1){
                console.log(data.muski);
                data.muski.sort(function(a,b){
                    
                    return a.cena-b.cena;
     
                })
                ispisProizvodaFilter(data.muski);
            }
            else if(izabrano.value==2){
                 data.muski.sort(function(a,b){
                    return b.cena-a.cena;
                })
                ispisProizvodaFilter(data.muski);   
            }
            else if(izabrano.value==3){
                data.muski.sort(function(a,b){
                    if(a.naslov==b.naslov)
                    return 0;
                return a.naslov>b.naslov?1:-1;
                })
                ispisProizvodaFilter(data.muski);  
            }
            else if(izabrano.value==4){
                data.muski.sort(function(a,b){
                    if(a.naslov==b.naslov)
                    return 0;
                return a.naslov>b.naslov?-1:1;
                })
                ispisProizvodaFilter(data.muski);  
            }
            else{
                ispisProizvodaFilter(data.muski);  
            }
        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
}
var expanded = false;

function prikaziChbZaFilter() {
  var checkboxes = document.getElementById("chbs");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}
ispisSelectFilter();
function ispisSelectFilter(){
    $.ajax({
        url: "data/filterNaslov.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            let ispis="";
            data.muski.forEach(i => {
                ispis+=`

               
                <label for="${i.id}">
                      <input type="checkbox" class="mr-2" id="${i.naziv}" />${i.naziv}
                </label>
                
            `
            });
            document.getElementById("chbs").innerHTML=ispis;
            
            
            let tipovi=document.getElementsByClassName("tipovi");
            for(let i of tipovi){
                
                i.addEventListener("click",filterKategorija);
            }
          

        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
}
var niz=[];
function filterKategorija(){
    let vrednost = this.value;
    if(niz.includes(vrednost)){
        niz=niz.filter(x=>{
            return x!=vrednost;
        })
    }
    else{
        niz.push(vrednost);
    }
    $.ajax({
        url:"data/proizvodi.json",
        method:"post",
        dataType:"json",
        success:function(data){
           
                let djoka=data.muski.filter(x=>{
                    if(niz.length!=0){
                    for(let i=0; i<niz.length; i++){
                        if(niz[i]==x.naslov)
                            return true;
                            else{
                                return true;
                            }
                    }
                    
                }
            })
            console.log(djoka);
            ispisProizvodaFilter(djoka);
            console.log(niz);
          
        }
    })
}
// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
  
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 1; i < slides.length; i++) {
//       slides[i].style.display = "none";  
//   }
 
//   slides[slideIndex-1].style.display = "block";  
  
// }
}

//WOMAN STRANA
if(url.indexOf("woman.html")!=-1){
    var expanded = false;
    document.getElementById("sortiranje").addEventListener("change",sortiraj);
function prikaziChbZaFilter() {
  var checkboxes = document.getElementById("chbs");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}
    function prikaziSveProizvode(){
        $.ajax({
            url: "data/proizvodi.json",
            method: "get",
            dataType: "json",
            success: function (data) {
                ispisProizvodaFilter(data.zenski);  
                // console.log(data.zenski);
                document.getElementById("searchInput").addEventListener("keyup",function(){
                    String(this.value)? filtrirajInput(this.value) : prikaziSveProizvode();
               });

            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    }
    prikaziSveProizvode();  
    function sortiraj(){
        let izabrano=document.getElementById("sortiranje");
        $.ajax({
            url: "data/proizvodi.json",
            method: "get",
            dataType: "json",
            success: function (data) {
                
                // console.log(muski);
                if(izabrano.value==1){
                    console.log(data.zenski);
                    data.zenski.sort(function(a,b){
                        
                        return a.cena-b.cena;
         
                    })
                    ispisProizvodaFilter(data.zenski);
                }
                else if(izabrano.value==2){
                     data.zenski.sort(function(a,b){
                        return b.cena-a.cena;
                    })
                    ispisProizvodaFilter(data.zenski);   
                }
                else if(izabrano.value==3){
                    data.zenski.sort(function(a,b){
                        if(a.naslov==b.naslov)
                        return 0;
                    return a.naslov>b.naslov?1:-1;
                    })
                    ispisProizvodaFilter(data.zenski);  
                }
                else if(izabrano.value==4){
                    data.zenski.sort(function(a,b){
                        if(a.naslov==b.naslov)
                        return 0;
                    return a.naslov>b.naslov?-1:1;
                    })
                    ispisProizvodaFilter(data.zenski);  
                }
                else{
                    ispisProizvodaFilter(data.zenski);  
                }
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    }
    function filtrirajInput(text){
    
        $.ajax({
            url: "data/proizvodi.json",
            method: "get",
            dataType: "json",
            success: function (data) {
                let filtrirano=data.zenski.filter(x=>{if(x.naslov.toLowerCase().indexOf(text.toLowerCase())!=-1){
                    return true;
                  
                }})
                
                ispisProizvodaFilter(filtrirano);
                // console.log(filtrirano);
                
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    
    }
    ispisSelectFilter();
    function ispisSelectFilter(){
        $.ajax({
            url: "data/filterNaslov.json",
            method: "get",
            dataType: "json",
            success: function (data) {
                let ispis="";
                data.zenski.forEach(i => {
                    ispis+=`<label for="${i.id}">
                    <input type="checkbox" class="mr-2" id="${i.naziv}" />${i.naziv}
              </label>`
                });
                document.getElementById("chbs").innerHTML=ispis;
                
                
                let tipovi=document.getElementsByClassName("tipovi");
                for(let i of tipovi){
                    
                    i.addEventListener("click",filterKategorija);
                }
              
    
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    }
}

// BLOG STRANA
if(url.indexOf("blog.html")!=-1){
    function ispisiSveBlogove(){
        $.ajax({
            url: "data/blog.json",
            method: "get",
            dataType: "json",
            success: function (data) {
                ispisBlogova(data);  
                console.log(data.zenski);
                document.getElementById("searchInput").addEventListener("keyup",function(){
                    String(this.value)? filtrirajInput(this.value) : prikaziSveProizvode();
               });

            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    }

    function ispisBlogova(data){
        let ispis="";
        data.forEach(i => {
            ispis+=`
                <div class="col-lg-6 proizvod mb-5">
                    <img src="img/${i.slika.src}" class="img-fluid mb-3" alt="${i.slika.alt}"/>
                    <h3>${i.naslov}</h3>
                    <p>By ${i.autor.user} / ${i.datum}</p>
                    <p>${i.tekst}</p>
                    <hr/>
                    <div class="d-flex">
                        <i class="fas fa-clipboard-list mt-1 mr-1"></i>
                        <p id="dugmeBlog">${i.kategorija}</p>
                        <i class="far fa-comment ml-auto mt-1 mr-2"></i>
                        <p>${i.komentari.length}</p>
                    </div>
                </div>`
        });
        document.getElementById("blogPrikaz").innerHTML=ispis;
    }
    ispisiSveBlogove();

    function filtrirajInput(text){
    
        $.ajax({
            url: "data/blog.json",
            method: "get",
            dataType: "json",
            success: function (data) {
                let filtrirano=data.filter(x=>{if(x.naslov.toLowerCase().indexOf(text.toLowerCase())!=-1){
                    return true;
                  
                }})
                ispisBlogova(filtrirano);  
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    
    }
  
}


// KONTAKT STRANA

if(url.indexOf("contact.html")!=-1){

    function proveraKontaktForma(){
        let ime=document.getElementById("ime").value;
        let prezime=document.getElementById("prezime").value;
        let email=document.getElementById("email").value;
        let comment=document.getElementById("comment").value;

        let regIme=/^[A-Z][a-z]{2,15}$/;
        let regPrezime=/^[A-Z][a-z]{2,15}$/;
        let regEmail=/^\w+((\,|\-|\_)?\w+)*@\w{2,6}\.\w{2,3}$/;
        let greske =[];
       if(!ime.match(regIme)){
            // greska[0].innerHTML="Wrong name input";
            greske.push("Wrong name input");
           
        //    return false;
       }
       if(!prezime.match(regPrezime)){
            // greska[1].innerHTML="Wrong surname input";
            greske.push('Wrong surname input');
           
            // return false;
       }
       if(!email.match(regEmail)){
            // greska[2].innerHTML="Wrong email input";
            greske.push('Wrong email input');
           
            // return false;
        }
        if(comment.length>200 || comment.length<3){
            // greska[3].innerHTML="More then 200 characters";
            greske.push('More then 200 characters');
           
            // return false;
        } 
        if(greske.length){
            ispis="<ul>";
            // greske.forEach(greska => {
            //     ispis+=`<li>${greska}</li>`;

            // });
            for(let i of greske){
                ispis+=`<li>${i}</li>`;
            }
            ispis+="</ul>"
            document.getElementById("greskaKontakt").innerHTML=ispis;
            return false;
        }
       else{
           alert("You successfully sent us a message");
           return true;
       }
    }

 


}






