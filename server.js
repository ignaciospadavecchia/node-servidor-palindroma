
// Paso 0 : 
// ----------------------------
// Comienza al inicializar y asignar por referencia 
// una variable mediante la función require() 
// que se usar para incluir módulos de node.
// En este caso será el módulo nativo (built-in) http 
// el cual a node 
// transferir datos segun el protocolo HTTP.    

// Paso 1 : INCLUDE THE HTTP PROTOCOL
// ----------------------------
const http = require('http')
// El módulo HTTP tiene la capacidad de crear un HTTP Server
// el cual puede escuchar a "los puertos de localhost" ("server ports") 
// y dar una respuesta al Cliente ( el navegardor)
// Para esto utiliza el método createServer() 
// el cual inicializa y asigna por referencia 
// a una variable 
// creandose un Server Object

//  Paso 2 : CREATE THE SERVER
// ----------------------------
const server = http.createServer((req, res) => {
    // el método createServer() requiere que se le pase una
    // function que será ejecutada cada vez que recibe cualquier petición HTTP
    // de un usuario en el puerto asignado ( puerto: 3000 ) 

    // Cuando un usuario ingresa al dominio
    // se ejecuta la función createServer() e ingresa en este caso un GET req

    // el argumento o parámetro requerido vendrá como un objeto
    // http.IncommingMessage  

    // Este objeto tiene la propiedad headers.host y la propiedad url
    // la parte de la URL que viene luego del nombre de dominio
    // es decir luego de http://localhost:3000/ (url)

    // Paso 3 : READ THE QUERY STRING
    // ----------------------------
    let url = require('url');
    // Para consturir la respuesta primero se requiere 
    // * describir el HTTP Header de la Res.
    // * * Si la respuesta del servidor HTTP debe renderizar un HTML
    // * * se debe incluir un HTTP Header con el correspondiente Content-Type

    // Paso 4 : BUILD THE HTTP HEADER
    // ----------------------------
    res.writeHead(200, { "Content-Type": "text/html ; charset=utf-8" });

    // Se puede comprobar (esto no es necesario) qué valor tiene req.url
    // se vera que, en caso de http://localhost:3000 , 
    // la respuesta será una "/"

    // Paso 5 : WRITE THE RESPONSE:
    // ----------------------------
    // Se puede probar res.write con la req.url solo para saber qué pasa.
    /* res.write(req.url); */

    // Lo que esta comentado a continuación es un if innecesario
    // debido a que require('url') (~linea 36)
    // SIEMPRE responde "algo"
    // Por tanto comprobarlo como en la siguiente línea (~linea 61)
    // es inncesario.
    // Se puede escribir una respuesta por defecto 
    // Mostrando un formulario como el que sigue:

    /* if (req.url == "/") { */
        res.write(
            // En el atributo name del elemento input se indica el hashtag de la query
            // Al Enviar la URL quedarí así: "/comprobar?palabra="
            `
        <form action="/comprobar">
            <label for="field-t">Introduzca Palindroma:</label><br>
            <input type="text" id="field-t" name="palabra" value=""><br>
            <input type="submit" value="Enviar">
        </form> 
        `)
    /* } */

    // Paso siguiente el método includes verifica si el endpoint comprobar
    // está incluida.

    if (req.url.includes("/comprobar")) {

        // Paso 6 : SPLIT THE QUERY STRING     
        // ----------------------------
        // La url del objeto http.IncommingMenssage es un string muy 
        // largo y no laborioso manipularlo. No nos sirve tal cual viene.
        // Se require  " parsear la query "
        // El modulo nativo para "parsear" 
        // es url y url tiene un método llamado parse(value, boolean)
        // El método parse necesita una URL completa para obtener 
        // adecuadamente el querystring
        var adress = req.headers.host + req.url;
        // Se puede usar el método parse() del modulo url para parsear la // querystring y formatearla como un objeto
        // el cual queda de este modo
        var q = url.parse(adress, true);
        // Paso sigiuiente al objeto query le pediremos solo el campo 
        // "palabra" la cual vendrá en formato string.
        var input = q.query.palabra;
        // query tendra ahora en valor "en limpio" del string ingresado por el usuario

        // A partir de aquí se puede usar la función que procece
        // el input ingresado por el usuario en el formulario.

        function esPalindroma(word) {
            let p = "";
            let j = word.length - 1;
            let a = true;
            let i = 0;

            for (i = 0; i < word.length; i++) {
                p += word[j];
                j--;
            }
            return word === p;
        }
        let checked = esPalindroma(input); // invoca con "input" del form
        res.write('<p>El palindroma es</p>'); // responde
        res.write(`${checked}`); 
    } 
    return res.end() // Termina la Res
})

// Make Sever listen to a Port in localhost
server.listen(3000)

// Y-ya-sta.