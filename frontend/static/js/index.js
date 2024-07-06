import Lyrics from "./views/Lyrics.js";
import Home from "./views/Home.js";
import Mesa from "./views/Mesa.js";
import { SearchSong } from "./views/SearchSong.js";

import { db } from "../db.js";
const songList = db.Songs                           // [ {…}, {…}, {…}, .. {…}]
//console.log('songList[0] test', db.Songs[0].tom)  // Capo 1
//const lyricList = db.Lyrics

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        {path: "/", view: Home},
        {path: "/lyrics", view: Lyrics},
        {path: "/mesa", view: Mesa},
    ]

    const pMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });
    // pMatch: [ {…}, {…}, {…} ]
    // Object { route: {…}, isMatch: true||false }

    let match = pMatches.find(pMatches => pMatches.isMatch);
    // isMatch: true
    //console.log('route.path', match.route.path)
    if(!match){
        match = {
            route: routes[0],
            isMatch: true
        }
    };

    const view = new match.route.view()
    document.querySelector("#transbordo").innerHTML = await view.getHtml()

// ------------------------------------------------------------
// .dropDown
const searchButtom = document.querySelector("#sbtn")
const searchInput = document.querySelector("#elei")
//console.log('search', search.innerText)
if(searchButtom){
    if(localStorage.card){
        const ar = JSON.parse(localStorage.card) // [{..}]
        if(ar[0]){  // ar[0] can be undefined
            SearchSong(ar[0].música, songList)
            //console.log('ls musica', ar[0].música)
        }
    }

    searchButtom.addEventListener('click', (e) => {
        e.preventDefault();
        const search = document.querySelector("#elei")

            if(search.value != ""){
                //console.log('search[0].value != 0')
                let busca = search.value
                console.log('busca', busca)
                SearchSong(busca, songList);
            }
    })
}

// ------------------------------------------------------------

const drop = document.getElementById("listDropa")

if(searchInput){
    searchInput.addEventListener('change', () => {
    
        //console.log('search[0].value != 0')
        let busca = searchInput.value
        console.log('busca:', busca)
    
        if(busca != ""){
        const achadoChange = songList.filter(item => item.música.toLowerCase().startsWith(busca))
        console.log('achadoChange', achadoChange)
               
        //console.log('drop.innerHTML', drop.innerHTML)
        drop.innerHTML = '<option selected="true" disabled="disabled" value="">Select one..</option>'
    
                 function eventoList() {
                    if(searchInput.value != ""){
    
                        if(busca.length == 0){
                          drop.innerHTML = '<option></option>';
                        } else {
                          var comOpt = drop.innerHTML;
                          for(const ele in achadoChange){
                            //console.log('ele', ele)
                            comOpt += '<option>' + achadoChange[ele].música + '</option>'
                          }
                          drop.innerHTML = comOpt
                          searchInput.textContent = 
                          console.log('comOpt', comOpt)
                        }
                    }
                }
                eventoList()
        } // let achadoChange
    })
    
    let escolha = drop.options[drop.selectedIndex].text
    console.log('escolha inicial: ', escolha)
    
    drop.addEventListener('change', () => {
        let indexSelect = drop.selectedIndex
        console.log('indexSelect: ', indexSelect)
        escolha = drop.options[indexSelect].text
        console.log('escolha final: ', escolha)
        //console.log('searchInput.textContent: ', searchInput.textContent)
        
        searchInput.value = escolha
    })

}
  
// ------------------------------------------------------------

} //router



window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if(e.target.matches("[data-link]")) {
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router();
});

