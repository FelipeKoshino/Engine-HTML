const SearchSong = (busca, songList) => {

  const oldArticleB = document.getElementById("cardsongB")
  if(oldArticleB){
    oldArticleB.remove()
  }

  const listSong = document.querySelector(".listSongs")

    // O U T P U T : achado[0]
    const achado = songList.filter(item => 
      item.música.toLowerCase() == busca.toLowerCase()
    )
    console.log('achado[0]', achado[0])


    if(localStorage.card.length != 0){
      const objLS = JSON.parse(localStorage.card)
  
          if(localStorage.card.length > 1){
            objLS.splice(0, 1)
          }

      // atualizando LS
      localStorage.setItem('card', JSON.stringify(achado))
    }

    else {
      localStorage.setItem('card', JSON.stringify(achado))
    }

      // C O M P O N E N T  -  I N P U T - 1
      let arr8 = [
        {tag: "article,margin-top:40px, col s6"},
        {tag: "div-ul-li*2,margin-top:40px, col s6"},
        {tag: "1,article,margin-top:60px, col s6"}, // fin = [ 1 ] , r243-311
        {tag: "span,0, 0"}, // tom
        {tag: "p,font-style:italic; margin:16px 0 -10px, 0"}, // música
        {tag: "div-ul-li*3,margin-bottom:-20px; margin-top: 30px, nulo"}, // chords
        {tag: "p,font-size:2.2rem; margin-top:18px, 0"}, // autor
        {tag: "p,font-size:1rem; padding-top:15px, 0"}, // versão
      ]

      // Second  A R G U M E N T  -  I N P U T - 2
      const outputs = [
          "",
          "",
          "",
          "",
          achado[0].tom,
          achado[0].música,
          achado[0].chords,
          achado[0].autor,
          achado[0].versão
      ]

// ----------------------------------------------------------------------------------

const nestedTagString = (texto) => { //num: binary (1 || 0: get out of nesting)
  
  let fin = texto.match(/\w+/g)
  console.log('fin 1: ', fin)
  let avulso = []

  //etagz é usado caso finTags.length > 2
  let tagz = fin[0] // 'div'
  let etagz = document.createElement(tagz) // 'div'

// ----------------------------------------------------------------

  function flatar(av, n) { //All cases: div-ul*2-li*3, div-ul-li*3, ul-li*2, ul*2-li,...
    //[ "ul", (6) […] ] --> [ "ul", ["li", "li", ., "li"] ] <-- input structure? check..

     const mapa = av.map((el,index) => { 
       if(index === av.length-1){ 
         return [ av[index-1],
           el.map((e,index)=>{  //error: el.map is not a function
             if(index % 2 != 0){
               return "/"+e 
             } else { return e }
             // ["li", "/li", ., "/li"]
           })
           , "/"+av[index-1] ]
       } else { return 0 }
     })
     // [ 0, (3) […] ] --> [0, ["ul", ["li", "/li", .,], "/ul"] ]
 
     av = mapa.filter(it => it != 0).flat(Infinity)
     //[ "ul", "li", "/li", ., "/li", "ul" ]
       let tric = av.join().concat(',')
       tric = tric.repeat(n).match(/\/[a-z]{2}|[a-z]{2}/g)
       av = tric

     let tt = []
     av.forEach(el => { tt.push(el.replace(/\w+|\/\w+/, `<${el}>`)) })
     console.log("------------------- FLATAR tt", tt)

   return tt
 } //flatar(av)

// ----------------------------------------------------------------

  //Identificar quantas tags no fin-1:
  const finTags = fin.filter(e => e != e.match(/\d/))
  const len = finTags.length
  //if(finTags.length>2){ deleteTag(0) }

  //Retirada da 'div' de:  'div-ul*2-li'
  if(len > 2){ 
    //essa 'div' retorna como 'etagz'
    const x = finTags.splice(0,1)
    console.log('---------------> x', x)
  }

// ----------------------------------------------------------------

  //identificar multiplicadores de tags
  let finNums = fin.filter(e => e.match(/\d/)) // ["2"]  <--- 'ul-li*2'
  console.log('finNums', finNums)
  let indexNum = []
  let tagNums = []

  if(finNums[0] === undefined){ //div-ul-li or ul-li --> finNums: []
    indexNum = [0,0]

  } else if(finNums.length === 1){ //["2"] d-ul*5-li(2), d-ul-li*5(3)

    let testA = fin.map((el,index) => {
        if(el.match(/\d/)){ return el = index } else {return "t"}
    })
    let testB = testA.filter(el => el != "t")

    if(testB[0]>2){
          indexNum = [0,testB[0]]
        } else {
          indexNum = [testB[0],0]
        }
        console.log('indexNum',indexNum)
  
    tagNums =  indexNum.map(e => {
        if(e!=0){
            return parseInt(finNums[0])
        } else { return 0 }
      })

  } else {
    tagNums = [ parseInt(finNums[0]), parseInt(finNums[1]) ]
  }
  console.log('FINAL tagNums', tagNums)

// ----------------------------------------------------------------

  //cases(8): 
  // ul-li*3,  div-ul-li*3,  ul*2-li*3  or  div-ul*2-li*3
  // ul-li, div-ul-li, ul*2-li or div-ul*3-li,

  if(tagNums[1] !== 0){ // [0, 3] or [2, 3]
    let til = finTags[1].repeat(tagNums[1]*2).match(/[a-z]{2}/g)
    avulso = [ finTags[0], til ]
  }

  if(tagNums[1] === 0){ // [0, 0] or [2, 0]
    avulso = [ finTags[0], [finTags[1], finTags[1]] ]
  }

        if(tagNums[0] === 0){
          tagNums[0] = 1
        }
        console.log('---------------- tagNums[0]', tagNums[0])

    avulso = flatar(avulso, tagNums[0])
    //avulso: ["<ul>", "<li>", "</li>", "</ul>", "<ul>", .., "</ul>"] 

// ----------------------------------------------------------------

  var rt = [""]

  avulso.forEach((e, index) => {
    rt[0] = rt[0] + avulso[index]
  }) //rt: [ "<div><p><s>#</s></p></div>" ]
  
      etagz.innerHTML = rt[0]
      ntags.push(etagz.outerHTML)

} //nestedTagString r50 -> r177 (127rows)

// ----------------------------------------------------------------------------------

let ntags = [] //new function
let acumtags = []
let acum = []
let finn = 0
let tg = ""

const engineHtml = (obj, data) => {

    //achado = songList.filter(..)
    // const outputs = ['','',achado[0].tom,achado[0].música,'',achado[0].autor,achado[0].versão]

        const lent = obj.length // r326

        obj.forEach((el,index) => {
          //Obs: Não faz parte da sintaxe: {tag: "1,article-div,0, col s12}; <-- invalid case
                  
                  //for pure tags:  'span,0,0' , 'p,0,0' , ..
                  let atag = el.tag.match(/^\w+/) // article ; 1 ; span ..
                  console.log("atag <<------------", atag)
                  console.log("index <<------------", index)
                  let astyle = el.tag.match(/,[a-z:\d.\s-;]+/)
                  let styl = astyle[0].replace(/,/,"")

                  //for parent-tag
                  let ins = ""
                  if(atag[0]==="1"){
                    ins = "#"
                   astyle = el.tag.match(/^\d,\w+,[a-z:\d.\s-;]+/)
                   styl = astyle[0].replace(/^\d,\w+,/,"")
                  }
                  console.log('styl <<------------', styl)

                  let clas = el.tag.match(/, [\d\w ](.*)$/g) // ", col s6"
                  let classe = clas[0].replace(/^, /,"")

                    //for nested cases:  'ul-li' , 'div-ul-li*3' , 'ul*2-l' , ..
                    let nest = el.tag.match(/^\w+[-*\w\d]+,/) //atag==["1"]: nest==null
                    let enest = null
                    if(nest!=null){ //qnd ainda não surgiu um 'parent-element'
                      enest = nest[0].match(/[-*]+/)
                      //se enest === "-" | "*" ---> enest!=null
                    }


              //for parent-tag:  '1,article,0,0'
              let dtag = el.tag.match(/^\d,\w+/) // [ "1,article" ]
              console.log("dtag <<------------", dtag)
              if(dtag){
                let bctag = ""
                  if(dtag!==null){
                    finn = 1
                    bctag = dtag[0].replace(/^\d,/,"")
                    ntags = [1]
                    ntags.push(bctag) //[ 1, "article" ] // <<----------- r310
                  }
              }

  atag[0]!="1" ? tg = atag[0] : tg = dtag[0].replace(/1,/,"")
  if(enest){ tg = nest }
              
              let itg = "" //itg = `<${tg} style="${styl}".. ---> acum[0] = acum[0].concat(itg)
              if(atag && atag[0]!="1"  && finn===0 && enest===null){
                itg = `<${tg} style="${styl}" class="${classe}">${ins}</${tg}>`
                  acum = acum.concat(itg)
                  ntags.push(itg)
                  console.log('ntags ####### pure-tag ########',ntags)
                  console.log('acum ####### pure-tag ########',acum)
                  //[ '<article style="margin-top:40px" class="col s6"></article>' ]
              
              } else if(enest && finn===0){
                  nestedTagString(...nest) //[ "div-ul-li*2," ]
                  // console.log('ntags ####### nest-tag ########',ntags)
                  console.log('index ####### nest-tag ########', index)
                  acum = acum.concat(ntags[index])
                  console.log('acum ####### nest-tag ########',acum)
                  //[ '<article style="margin-top:40px" class="col s6"></article>', 
                  // "<div><ul><li></li><li></li></ul></div>" ]
              
              } else if(dtag!=null){ // [ "1,article" ]
                itg = `<${tg} style="${styl}" class="${classe}">${ins}</${tg}>`
                  acum = acum.concat(itg)
                  acum.push(1)
                  //[ '<article style="margin-top:40px" class="col s6"></article>', 
                  // "<div><ul><li></li><li></li></ul></div>", 
                  // '<article style="margin-top:60px" class="col s6">#</article>', 1 ]
              }

  // -----------------------------------------------------------------------------------
                  
  let fin = ntags.filter(e => e === 1)

  if(fin[0]!=undefined){ //After {tag: '1,article..'} fin[0]==1

  //ntags: [ 1, "article", "<span style=..", "<p.." ]
  let ftag = document.createElement(ntags[1])

      if(ntags[1] && atag[0]!="1"){

                  if(enest!=null){
                    //nest[0]: "div-ul*2-li*2,"
                    let nest0 = nest[0].match(/[a-z*,\d]+,/)   //nest0: [ "li*2," ]
                    let nest1 = nest0[0].replace(/[*,\d]+/,"") //nest1: li

                    acumtags.push(nest1) // <<<------------------- *********
                    // [ "span", "p", --->"li"]
                    finn++ // 2, 3 , 4 ..

                  } else {
                  acumtags.push(atag[0]) // <<<------------------- *********
                  // [ "span", "p", "li", --->"p", .. ]
                  finn++ // 2, 3 , 4.. <--- qts tags e tag-nested são percorridas na parent-tag

                    //**error se o ultimo obj for nested (testar)
                    let ntg = `<${atag[0]} style="${styl}" class="${classe}"></${atag[0]}>`
                    ntags.push(ntg)
                    //[1, "article", "<span..", "<div-ul-li../div", --->'<p style="..></p>'] 
                  }

  // -----------------------------------------------------------------------------------

    //ultimo index  r231
    if(index === lent-1){
          let newitgg = ""
          let fhtml = ""
          ntags.forEach((el,index)=>{
            if(index>1){
              fhtml = fhtml + ntags[index] //concatena todos ntags(dps de "article")
            }
          })
          ftag.innerHTML = fhtml 
          //ftag: <article>
      
          //acumtags: [ "span", "p", "div", "p", "p" ]
          acum.push(...acumtags)
          //[ '<article style="margin..></article>', "<div><ul><li></li>..</div>", 
          // '<article style="..>#</article>', 1, "span", "p", "div", "p", "p" ]

  // -------------------------------------------------------------------------------------------

      let bc = []
      let itgg = ""
      let ione = acum.findIndex(e => e === 1) // Parent-element-index + 1
      console.log('ione +++++++++++++++++++++', ione)
      
      acum.forEach((el, index) => {
              
              // El's from same level of Parent-element <article>
              // [article, article, 1, <-- span, p, li, p, p]
              if(index < ione){

                if(index === 0){ // <------------------ G A M B I
                    if(achado[0].letra != undefined){
                        itgg = el.replace(/></, `>${achado[0].letra}<`)
                        acum[0] = itgg
                        //itgg: <ar..>..</article><div>..</div>
                    }

                  // index > 0
                  } else {
                    acum[0] = acum[0].concat(acum[index])
                    //uso em r412: .. acum[0].replace(/#/, ftag.innerHTML)
                    console.log('acum 0 ##########', acum)
                  }

                }
            
        // --------------------------------------------------------------------------
            
              // Child-elements
              // [article, article, 1, --> span, p, li, p, p]
              if(index > ione){ //
                  let filtbc = acumtags.filter(e => e === acumtags[index-ione-1])
                  // acumtags[0], 'filtbc' serve p/ rastrear tags repetidas nos child-el's
            
                //tags repetidas
                if(filtbc.length > 1){ 
                  bc.push(acumtags[index-ione-1])
                  let len = bc.length -1
                  ftag.getElementsByTagName(acum[index])[len].innerText = data[index]
                  console.log('### TAG-REPETIDA ### ftag.innerHTML', ftag.innerHTML)

                  if(index === acum.length-1){

                  }
                  
                //tags unicas
                } else {
                  console.log('### TAG-UNIQUE ### acum[index]', acum[index])
                  ftag.getElementsByTagName(acum[index])["0"].innerText = data[index]
                }
            
              } //if(index > ione)
      
      // --------------------------------------------------------------------------
            
              if(index === acum.length-1){
                newitgg = acum[0].replace(/#/, ftag.innerHTML)
                
                listSong.innerHTML = newitgg
                console.log('listSong.innerHTML', listSong.innerHTML)
                //**Revisar se houver atag[0]: -1, neste caso deve-se mudar a atribuição do
                // listSong p/ mais abaixo do codigo.
                console.log('finn', finn) //ultimo child-element
              }

          }) //acum.forEach r330 -> r 398

  // -------------------------------------------------------------------------------------------

      } //if(index === lent-1)  r326
      
      console.log("**** index", index)

        // -----------------------------------------------------------------------------
                
      if(enest!=null){
        console.log('nest ******', nest)
        nestedTagString(...nest)
      
        console.log('ntags ******',ntags)
        // index <-- 4 | 5
        // <div style="margin:0" class="nulo"></div>
      
            let fhtml = ""
            ntags.forEach((el,index)=>{
              if(index>1){
                fhtml = fhtml + ntags[index]
              }
            })
            ftag.innerHTML = fhtml
            
            console.log('0000 index', index)
            console.log('0000 ftag.innerHTML', ftag.innerHTML) // <empty string>
      
      }

    } else{ //if(ntags[1] && atag[0]!="1")  <--- r301
      console.log("You can't use a parent-element inside aready one parent-el.")
    }
        // -----------------------------------------------------------------------------

  } 

})

  //listSong.append(ftag)

} // engineHtml()  r188 -> r448 (260rows)
engineHtml(arr8, outputs) //(100 rows)

return console.log('SearchSong finalizado.')
}

export { SearchSong }

