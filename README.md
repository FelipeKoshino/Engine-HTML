# APP MUSIC ZER0

Projeto criado para facilitar a criação e
estilização de componentes dinâmicos de
um site.

Caso se interesse por este projeto e queira implementar
em sua própria aplicação segue a explicação abaixo da estrutura do projeto:

#

Função engineHtml():

O coração desse projeto é a função engineHtml() que
recebe 2 inputs: 

Um array com as tags seguidas de seus estilos para
a criação de um esqueleto html a ser montado na tela do navegador.

Exemplo:
```
let arr8 = [
{tag: "article,margin-top:40px, col s6"},
{tag: "1,article,margin-top:60px, col s6"},
{tag: "span,0, 0"}, // tom
{tag: "p,font-style:italic; margin:16px 0 -10px, 0"},
{tag: "div-ul-li*3,margin-bottom:-20px; margin-top: 30px, nulo"},
{tag: "p,font-size:2.2rem; margin-top:18px, 0"},
]
```

O array acima fica a critério do desenvolvedor do site de como montar
conforme o esqueleto html que pretende criar.

Neste exemplo do arr8 teremos como resultado o seguinte esqueleto:

```html
<article style="margin-top:40px" class="col s6"></article>
<article style="margin-top:60px" class="col s6">
	<span style="0" class="0"></span>
	<p style="font-style:italic; margin:16px 0 -10px" class="0"></p>
	<div>
	  <ul>
	    <li></li>
	    <li></li>
	    <li></li>
	  </ul>
	</div>
	<p style="font-size:2.2rem; margin-top:18px" class="0"></p>
	<p style="font-size:1rem; padding-top:15px" class="0"></p>
</article>
```
dentro da função engineHtml foi criada uma segunda função
para tratar os casos de tags aninhadas como por exemplo no quinto
objeto do array acima:
	{tag: "div-ul-li*3, margin-bottom:-20px; margin-top: 30px, nulo"},

#
A função citada é a: nestedTagString(texto)

Parâmetros

- 'texto' recebe um array como argumento. E esse argumento contem a instrução de montagem do html aninhado com o seguinte formato:

[ "parent-tag", (n) [ 'tag-i','tag-i',.. 'tag-i_n'] ]

obs.: há um limite de aninhamento de até 3 tags.

#

Sobre  a  S I N T A X E  do  array-argumento  de  engineHtml(array)

O estrutura padrão dos objetos dentro do array é:

	{tag: " 'nome-da-tag', 'estilos', 'classes' "}

Quando quebramos essa padrão com o acrescimo do número  "1" no
começo da string temos a criação de uma 'parent-tag':

	{tag: " '1, 'parent-tag', 'estilos', 'classes' "}

#

- Quantos aninhamentos posso realizar e de quais maneiras?

R: Não há limites do número de aninhamentos, além disso
 é possível aninhar elementos tanto fora da parent-tag
 criada quanto dentro de uma parent-tag.

   Não é possivel criar uma parent-tag com objetos do tipo {tag: "1,tag,..} dentro de uma já criada parent-tag.



## License

[MIT License](LICENSE)
