var url=location.href;
var urlBezIndex=location.pathname;
window.onload=function(){
    prikaziInstagram();
    navigacija();
    prikaziFooter();
   
}

// ZA SVE STRANICE
function prikaziFooter(){
    $.ajax({
        url: "data/footer.json",
        method: 'get',
        type:"json",
        success: function (data) {
           console.log(data);
        //    ISPIS PRVOG BLOKA OD 3 U NIZU
           let ispisPay="";
           for(let i of data){
               
             ispisPay+=`<h3>${i.naslovPay}</h3>
             <p>${i.tekstPay}</p>`
           }
           ispisPay+=`<div class="kartice d-flex" id="prikaziPayIkone">`
           document.getElementById("prikaziPay").innerHTML=ispisPay;

           let ispisPayIkone="";
           for(let i of data){
                i.ikonePay.forEach( ikona => {
                ispisPayIkone += `<i class="${ikona.klasa}"></i>`;
                });
           }
            ispisPayIkone+=`</div>`
            document.getElementById("prikaziPayIkone").innerHTML=ispisPayIkone;

            let ispisSecure=`<div class="secure d-flex mt-3">`;
            
            for(let i of data){
                ispisSecure+=`<i class="${i.secureIkona}"></i>
                <p>${i.secureTekst}</p>`;
            }
            ispisSecure+=`</div>`
            document.getElementById("prikaziPay").innerHTML+=ispisSecure;

            // ISPIS DRUGOG BLOKA OD 3 U NIZU
            let ispisLinkova="";
            for(let i of data){
                ispisLinkova+=` <h3>${i.linkoviNaslov}</h3>`;
                i.linkoviTekst.forEach(link => {
                    ispisLinkova+=`<p><a href="${link.href}">${link.tekst}</a></p>`;
                });
            }
            document.getElementById("ispisLinkova").innerHTML=ispisLinkova;

            // ISPIS TRECEG BLOKA OD 3 U NIZU

            let ispisRadnogVremena="";
            for(let i of data){
                ispisRadnogVremena+=`<h3>${i.vremeNaslov}</h3>`;
                i.vremeTekst.forEach(element => {
                    ispisRadnogVremena+=`<p>${element.tekst}</p>
                    <p>${element.vreme}</p>`
                });
            }
            document.getElementById("radnoVreme").innerHTML=ispisRadnogVremena;

            // ISPIS MAPE

            let ispisMapa="";
            for(let i of data){
                ispisMapa+=`<iframe src="${i.mapa}" frameborder="0" style="border:0;" allowfullscreen=""></iframe>`
            }
            document.getElementById("mapaIspis").innerHTML=ispisMapa;

            // ISPIS COPYRIGHT
            let ispisCopy=`<div class="col-lg-12 text-center">`;
            for(let i of data){
                ispisCopy+=`<p>&copy; ${i.copy}</p>`
            }
            ispisCopy+=`</div>`
            document.getElementById("ispisCopy").innerHTML=ispisCopy;
            },
        error(xhr){
            console.log(xhr);
        } 
    });
    
}
function ispisiNavigaciju(){
    $.ajax({
        url: "data/menu.json",
        method: "get",
        dataType: "json",
        success: function (data) {
           
            let ispis=`<li><a href="cart.html"><i class="fas fa-shopping-cart"></i></a></li>`;
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
        document.getElementById("greskaSub").innerHTML="Invalid email address.<br/>Refresh the page and write an email in correct format*";
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

function vratiMuske(data){
    return data.filter(x => x.pol == "muski");
}
function vratiZenske(data){
    return data.filter(x => x.pol == "zenski");
}
//MAN STRANA
if(url.indexOf("man.html")!=-1){
    ispisiSelectSort();
    document.getElementById("sortiranje").addEventListener("change",sortiraj);
function prikaziSveProizvode(){
    $.ajax({
        url: "data/products.json",
        method: "get",
        dataType: "json",
        success: function (data) {
    
            data=vratiMuske(data);
            ispisProizvodaFilter(data); 
            upisiProizvodeULs(data);
            document.getElementById("searchInput").addEventListener("keyup",function(){
                String(this.value)? filtrirajInput(this.value) : prikaziSveProizvode();
           });
        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
}
function upisiProizvodeULs(data){
    let idProizvod=data.map(x=>x.id);
    localStorage.setItem("idProizvod",JSON.stringify(idProizvod));
}
function vratiVrednostIzLs(){
    return JSON.parse(localStorage.getItem("idProizvod"));
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
            <i class="fas fa-shopping-cart ml-auto dodajUKorpu" data-id=${element.id} data-value="${element.naslov}"></i>  
        </div>
        <p class="korpaInfo"></p>
        </div>`
       
   });
    document.getElementById("proizvodiPrikaz").innerHTML=ispis;
    proizvodiUKorpi();
}

prikaziSveProizvode();
function filtrirajInput(text){
   
    $.ajax({
        url: "data/products.json",
        method: "get",
        dataType: "json",
        success: function (data) {           

                let filtrirano=data.filter(x=>{if(x.naslov.toLowerCase().indexOf(text.toLowerCase())!=-1 && x.pol=="muski"){
                    return true;   
                }})
                if(filtrirano.length){
                    ispisProizvodaFilter(filtrirano);
                }
               if(filtrirano.length==0){
                   let ispis="<h2>There is no such product</h2>"
                  document.getElementById("proizvodiPrikaz").innerHTML=ispis;
               } 
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
    let idProizvod = vratiVrednostIzLs();
    $.ajax({
        url: "data/products.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            
            data=vratiMuske(data);
            let nizZaCuvanjeSorta=[];
            for(let i of data){
                for(let j of idProizvod){
                    if(i.id == j){
                        // var lsFilter=data;
                        nizZaCuvanjeSorta.push(i);
                    }
                }
            }
            if(izabrano.value==1){
                console.log(data);
                nizZaCuvanjeSorta.sort(function(a,b){
                    
                    return a.cena-b.cena;
     
                })
            }
            else if(izabrano.value==2){
                nizZaCuvanjeSorta.sort(function(a,b){
                    return b.cena-a.cena;
                })
            }
            else if(izabrano.value==3){
                nizZaCuvanjeSorta.sort(function(a,b){
                    if(a.naslov==b.naslov)
                    return 0;
                return a.naslov>b.naslov?1:-1;
                })
            }
            else if(izabrano.value==4){
                nizZaCuvanjeSorta.sort(function(a,b){
                    if(a.naslov==b.naslov)
                    return 0;
                return a.naslov>b.naslov?-1:1;
                })
            }
            ispisProizvodaFilter(nizZaCuvanjeSorta);   
        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
}
let expanded = false;

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
                      <input type="checkbox" name="chb" class="mr-2" id="${i.naziv}" value="${i.naziv}" class="tipovi"/>${i.naziv}
                </label>`
            });
            document.getElementById("chbs").innerHTML=ispis;
                      
            let tipovi=document.getElementsByName("chb");
            for(let i of tipovi){
                
                i.addEventListener("change",filterKategorija);
            }
        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
}

var niz=[];
function filterKategorija(){
    let idProizvod = vratiVrednostIzLs();
    let cekirano = this.value;
    if(niz.includes(cekirano)){
        niz=niz.filter(x=>{
            return x!=cekirano;
        })
    }
    else{
        niz.push(cekirano);
    }
    $.ajax({
        url:"data/products.json",
        method:"get",
        dataType:"json",
        success:function(data){
            data=vratiMuske(data);
            for(let i of data){
                for(let j of idProizvod){
                    if(i.id == j){
                        var lsFilter=data;
                    }
                }
            }
                lsFilter=lsFilter.filter(x=>{
                if(niz.length!=0){
                    for(let i=0; i<niz.length; i++){
                        if(niz[i]==x.naslov)
                            return true;                       
                    }                    
                }
                else{
                    return true;
                }
            })
            //console.log(filtrirano);
            ispisProizvodaFilter(lsFilter);
            upisiProizvodeULs(lsFilter);
            console.log(niz);          
        }
    })
}
function proizvodiUKorpi(){

    if(localStorage){
        let dugme = document.getElementsByClassName("dodajUKorpu");
        for(let i of dugme){
            i.addEventListener("click",dodajUKorpu);
        }       
    }
    else{
        alert("Your Browser doesnt support localStorage");
    }
}

function dodajUKorpu(){
    let id = this.getAttribute('data-id');
    let proizvodiULs=JSON.parse(localStorage.getItem("proizvodi"));
    
    if(proizvodiULs){
       if( proizvodiULs.filter(p => p.id == id).length){
        //    povecaj za jedan
            let proizvod = JSON.parse(localStorage.getItem("proizvodi"));
            for(let i in proizvod){
                if(proizvod[i].id == id) {
                    proizvod[i].kolicina++;
                    break;
                }      
            }
            localStorage.setItem("proizvodi", JSON.stringify(proizvod));
       }
       else{
        //    dodaj u niz ako postoji
        let proizvod = JSON.parse(localStorage.getItem("proizvodi"));
        proizvod.push({
            id : id,
            kolicina : 1
        });
        localStorage.setItem("proizvodi", JSON.stringify(proizvod));
       }
    }
    else{
        // napravi niz ako ne postoji
        let proizvod = [];
        proizvod[0] = {
            id : id,
            kolicina : 1
        };
        localStorage.setItem("proizvodi", JSON.stringify(proizvod));
    }
    let name = this.getAttribute('data-value');
    alert(name + " added to cart");
}
}

//WOMAN STRANA
if(url.indexOf("woman.html")!=-1){
    // proizvodiUKorpi();
    // dodajUKorpu();
    var expanded = false;
    document.getElementById("sortiranje").addEventListener("change",sortiraj);

    function prikaziChbZaFilter() {
        var checkboxes = document.getElementById("chbs");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        }
        else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }
    function prikaziSveProizvode(){
        $.ajax({
            url: "data/products.json",
            method: "get",
            dataType: "json",
            success: function (data) {
               data=vratiZenske(data);
                console.log(data);
                ispisProizvodaFilter(data); 
                upisiProizvodeULs(data);
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
        let idProizvod = vratiVrednostIzLs();
        let izabrano=document.getElementById("sortiranje");
        $.ajax({
            url: "data/products.json",
            method: "get",
            dataType: "json",
            success: function (data) {
                data=vratiZenske(data);
                let nizZaCuvanjeSorta=[];
                for(let i of data){
                    for(let j of idProizvod){
                        if(i.id == j){
                         
                            nizZaCuvanjeSorta.push(i);
                        }
                    }
                }
                if(izabrano.value==1){
                    nizZaCuvanjeSorta.sort(function(a,b){                        
                        return a.cena-b.cena;         
                    })
                }
                else if(izabrano.value==2){
                    nizZaCuvanjeSorta.sort(function(a,b){
                        return b.cena-a.cena;
                    })
                }
                else if(izabrano.value==3){
                    nizZaCuvanjeSorta.sort(function(a,b){
                        if(a.naslov==b.naslov)
                        return 0;
                    return a.naslov>b.naslov?1:-1;
                    })
                }
                else if(izabrano.value==4){
                    nizZaCuvanjeSorta.sort(function(a,b){
                        if(a.naslov==b.naslov)
                        return 0;
                    return a.naslov>b.naslov?-1:1;
                    }) 
                }
                ispisProizvodaFilter(nizZaCuvanjeSorta);
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    }
    function filtrirajInput(text){
    
        $.ajax({
            url: "data/products.json",
            method: "get",
            dataType: "json",
            success: function (data) {
                let filtrirano=data.filter(x=>{if(x.naslov.toLowerCase().indexOf(text.toLowerCase())!=-1 && x.pol=="zenski"){
                    return true;
                  
                }})
                
                if(filtrirano.length){
                    ispisProizvodaFilter(filtrirano);
                }
               if(filtrirano.length==0){
                   let ispis="<h2>There is no such product</h2>"
                  document.getElementById("proizvodiPrikaz").innerHTML=ispis;
               }
                
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
                    ispis+=`  <label for="${i.id}">
                    <input type="checkbox" name="chb" class="mr-2" id="${i.naziv}" value="${i.naziv}" class="tipovi"/>${i.naziv}
              </label>`
                });
                document.getElementById("chbs").innerHTML=ispis;
                
                
                let tipovi=document.getElementsByName("chb");
                for(let i of tipovi){
                
                i.addEventListener("change",filterKategorija);
            }
              
    
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    }
    
var niz=[];
function filterKategorija(){
    let idProizvod = vratiVrednostIzLs();
    let cekirano = this.value;
    if(niz.includes(cekirano)){
        niz=niz.filter(x=>{
            return x!=cekirano;
        })
    }
    else{
        niz.push(cekirano);
    }
    $.ajax({
        url:"data/products.json",
        method:"get",
        dataType:"json",
        success:function(data){
            data=vratiZenske(data);
            for(let i of data){
                for(let j of idProizvod){
                    var lsFilterZ=data;
                }
            }
                lsFilterZ=lsFilterZ.filter(x=>{
                if(niz.length!=0){
                    for(let i=0; i<niz.length; i++){
                        if(niz[i]==x.naslov)
                            return true;
                        
                    } 
                    
                }
                else{
                    return true;
                }
            })
            console.log(lsFilterZ);
            upisiProizvodeULs(lsFilterZ);
            ispisProizvodaFilter(lsFilterZ);
            
            console.log(niz);
          
        }
    })
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
               document.getElementById("datum").addEventListener("change", filtrirajPoDatumu);

                document.getElementById("sortiranje").addEventListener("change", filtrirajPoKategoriji);
                
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    }

    function ispisBlogova(data){

        data.sort(function(a, b) {
            const datum1 = new Date(a.datum);
            const datum2 = new Date(b.datum);
            return Date.UTC(datum2.getFullYear(), datum2.getMonth(), datum2.getDate()) - Date.UTC(datum1.getFullYear(), datum1.getMonth(), datum1.getDate()); 
          });

        let ispis="";
        for(let i of data){
            ispis+=`
                <div class="col-lg-6 proizvod mb-5">
                    <img src="img/${i.slika.src}" class="img-fluid mb-3" alt="${i.slika.alt}"/>
                    <h3>${i.naslov}</h3>
                    <p>By ${i.autor.user} / ${i.datum}</p>
                    <p>${i.tekst}</p>
                    <hr/>
                    <div class="d-flex">
                        <i class="fas fa-clipboard-list mt-1 mr-1"></i>
                        <p id="dugmeBlog">${i.kategorija.naziv}</p>
                        <i class="far fa-comment ml-auto mt-1 mr-2"></i>
                        <p>${i.komentari.length}</p>
                    </div>
                </div>`
        };
        document.getElementById("blogPrikaz").innerHTML=ispis;
    }
    
        
       
    
    ispisiSveBlogove();
    ispisOptionTagKategorija();
    function filtrirajInput(text){
    
        $.ajax({
            url: "data/blog.json",
            method: "get",
            dataType: "json",
            success: function (data) {
                let filtrirano=data.filter(x=>{if(x.naslov.toLowerCase().indexOf(text.toLowerCase())!=-1 ){
                    return true;
                  
                }})
                if(filtrirano.length){
                    ispisBlogova(filtrirano);  
                }
               if(filtrirano.length==0){
                   let ispis="<h2>There is no such blog headline.</h2>"
                  document.getElementById("blogPrikaz").innerHTML=ispis;
               }
                 
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    
    }
    function ispisOptionTagKategorija(){
        
        $.ajax({
            url: "data/filterBlogKategorija.json",
            method: "get",
            dataType: "json",
            success: function (data) {
               let ispis="<option>Choose Chategory</option>";
               for(let i of data){
                   
                    ispis+=`<option value="${i.id}" id="klik">${i.naziv}</option>`
                   
               
               } 
               document.getElementById("sortiranje").innerHTML=ispis;
            
                
           
            },
            error:function(xhr){
                console.log(xhr);
            } 
        });
    }
    
    function filtrirajPoKategoriji(){
        let izabranaKategorija=this.value;
        $.ajax({
            url: "data/blog.json",
            method:"get",
            dataType:"json",
            success:function(data){
                console.log("data");
                
                    let filtrirano = data.filter(x => {
                        return izabranaKategorija == x.kategorija.id;
                      });
                      if(filtrirano.length){
                        ispisBlogova(filtrirano);  
                      }
                      if(filtrirano.length==0){
                        ispisBlogova(data); 
                      } 
            },
            error:function(xhr){
                console.log(xhr);
            }
        });
    }
    function filtrirajPoDatumu() {
        let izabranDatum = this.value;
    
        $.ajax({
          url: 'data/blog.json',
          method: 'GET',
          dataType: 'json',
          success: function (data) {
            let filtrirano = data.filter(x => {
              return izabranDatum == x.datum;
            });
    
            if(filtrirano.length){
                ispisBlogova(filtrirano);  
            }
           if(filtrirano.length==0){
               let ispis="<h2>There is no such blog with your chosen date.</h2>"
              document.getElementById("blogPrikaz").innerHTML=ispis;
           }
           
          },
          error: function (err) {
            console.error(err);
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
        let greska=document.getElementsByClassName("greskaKontakt");
        let forma=document.getElementById("kontaktForma");

        let regIme=/^[A-Z][a-z]{2,19}$/;
        let regPrezime=/^[A-Z][a-z]{2,20}$/;
        let regEmail=/^\w+((\,|\-|\_)?\w+)*@\w{2,6}\.\w{2,3}$/;
        let greske =[];
       if(!ime.match(regIme)){
            greska[0].innerHTML="First letter must be uppercase, max 20 characters *";
            // greske.push("Wrong name input"); 
            // return false;
            greske.push("1");
       }
       if(!prezime.match(regPrezime)){
            greska[1].innerHTML="First letter must be uppercase, max 20 characters *";
            // greske.push('Wrong surname input');
            greske.push("2");
            // return false;
       }
       if(!email.match(regEmail)){
            greska[2].innerHTML="Invalid email address*";
            // greske.push('Wrong email input');
            greske.push("3");
            // return false;
        }
        if(comment.length<15){
            greska[3].innerHTML="Min 15 characters *";
        }
        if(comment.length>200){
            greska[4].innerHTML="Max 200 characters *";
            // greske.push('More then 200 characters');
            greske.push("4");
            // return false;
        } 
        if(greske.length){
            // ispis=`<ul class="d-flex">`;
            // // greske.forEach(greska => {
            // //     ispis+=`<li>${greska}</li>`;

            // // });
            // for(let i of greske){
            //     ispis+=`<li class="mr-5 greska">${i}</li>`;
            // }
            // ispis+="</ul>"
            // document.getElementById("greskaKontakt").innerHTML=ispis;
           
            return false;
            
        }
        else{
           alert("You successfully sent us a message");
            forma.reset();
           return true;
       }
    }

 


}

// CART STRANA
if(url.indexOf("cart.html")!=-1){
    function ispisProizvodaUKorpi(){

        let proizvodi = JSON.parse(localStorage.getItem("proizvodi"));
        
        if(proizvodi.length){
            $.ajax({
                url : "data/products.json",
                method:"get",
                dataType:"json",
                success : function(data) {
                      data = data.filter(i => {
                        for(let proizvod of proizvodi)
                        {
                            if(i.id == proizvod.id) {
                                i.kolicina = proizvod.kolicina;
                                return true;
                            }
                                
                        }
                        return false; 
                    });
                    proizvodKorpa(data);
                },
                error:function(xhr){
                    console.log(xhr);
                }
            });
            
        }           
        if(proizvodi.length==0){
            let ispis="<h2>Your cart is empty</h2>";
           document.getElementById("prikaziCart").innerHTML=ispis;
        }
    }
    
    ispisProizvodaUKorpi();
    
    function proizvodKorpa(data){
        let ispis="";

        for(let i of data){
            
                ispis+=`<div class="row mb-4 proizvodCart">
            <div class="col-lg-2 col-9 d-flex cartSlika mx-auto">
                <img src="img/${i.slika.src}" class="img-fluid pb-2"/>
                
            </div>
            <div class="col-lg-8 col-9 leviBlokCart mx-auto">
                <h3 class="pt-2 pt-lg-0">${i.naslov} (${i.kolicina})</h3>
                <p>Price <span class="cenaKorpa">${i.cena * 0.9} &euro;</span> (10% discount)</p>
                
            </div>
            <div class="col-lg-2 col-9 desniBlokCart mx-auto">
                <input><i class="far fa-times-circle brisiProizvod float-right float-lg-none" onclick="removeFromCart(${i.id})"></i></input>
                <p class="pb-auto">Total <span class="cenaKorpa">${i.cena* i.kolicina *0.9} &euro;</span></p>
            </div>
        </div>`
           
            
        }
        
        document.getElementById("prikaziCart").innerHTML=ispis;
        
    }
    function removeFromCart(id) {
        let proizvodi = JSON.parse(localStorage.getItem("proizvodi"));
        let filtrirano = proizvodi.filter(p => p.id != id);
    
        localStorage.setItem("proizvodi", JSON.stringify(filtrirano));
        ispisProizvodaUKorpi();
        
    }
}




