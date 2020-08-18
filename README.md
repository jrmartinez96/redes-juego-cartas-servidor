# redes-juego-cartas-servidor
Servidor de juego de cartas Conquian, para la clase de REDES, Agosto 2020.


### `node ./server/index.js [puerto]`
Este comando es para poder correr el servidor en un ambiente local

### Repositorio del frontend
https://github.com/jrmartinez96/redes-juego-cartas-cliente

# Sobre el proyecto
El conquián o tercerilla es un juego de naipes que se juega con la baraja española. El objetivo del juego es agrupar todas nuestras cartas en cartas del mismo número o escaleras hasta no dejar ninguna carta suelta. Quien consiga primero que todas sus cartas estén agrupadas en cartas del mismo número o escaleras, gana.
- Mazo: Baraja española
- Origen: México
- Tarjetas: 40
- Jugadores: 2-6 
- Tiempo para jugar: 20 minutos.

### Jugadas Válidas:
- Tercia o trio: deberá estar formada por tres cartas de idéntico índice (número); por lo cual estarán formadas por cartas de diferente figura (Palo: corazones, tréboles, espadas o diamantes).

- Escalera o Corrida: Deberá estar formada por tres cartas pero los índices deberán seguir el siguiente orden numérico: 0-1-2-3-4-5-6-7-8-9.  (adaptado).

- Pasar: El jugador no decide tomar la carta en juego y se pasa al turno del siguiente jugador.


### Video
https://youtu.be/9h4wbNHmml4


### Protocolo
```
/*
---------------------- SERVER RESPOSE ----------------------
Cada response tendrá un parametro de "opcion", esto determinará lo que esta mandando el servidor al cliente
*/

// Si la opcion es 0 el servidor devolverá el estado de un juego
const serverResponse0 = {
    opcion: 0,
    gameId: 0, // Identificador del juego
    turnoId: 0, // Id del usuario en turno
    players: [ // Listado de jugadores en el juego
        {
            playerId: 0, // identificador del jugador
            playerName: "" // nombre del jugador
        },
        {
            playerId: 1, // identificador del jugador
            playerName: "" // nombre del jugador
        },
    ],
    mesa: [
        [
            {
                cartaId: 0,
                nombreCarta: ""
            },
            {
                cartaId: "",
                nombreCarta: ""
            },
        ]
    ],
    cartaBasura: {
        cartaId: 0,
        nombreCarta: ""
    },
    cantidadCartasBaraja: 10, // Cantidad de cartas que se encuentran en la baraja principal
    cantidadCartas: { // Objeto que determina la cantidad de cartas que tiene cada jugador de la mesa, la llave es el id del jugador y al valor la cantidad de cartas que tiene
        "0": 1
    },
}


// Si la opcion es 1 el servidor devolverá el registro completo de un jugador en un juego
const serverResponse1 = {
    opcion: 1,
    gameId: 0, // Id del juego en el que estará el jugador
    playerId: 0, // Identificador del jugador que se le asigno
}


// Si la opcion es 2 el servidor devolverá el ganador del juego (es decir que el juego finalizo)
const serverResponse2 = {
    opcion: 2,
    gameId: 0,
    ganadorId: 0 // Este devolverá el id del jugador ganador
}


// Si la opcion es 3 el servidor devolverá un mensaje en el chat del juego
const serverResponse3 = {
    opcion: 3,
    gameId: 0,
    playerId: 0, // Id del usuario que mandó el mensaje,
    mensaje: "" // Mensaje del jugador
}


// Si la opcion es 4 el servidor devolverá un error (puede ser cualquier error)
const serverResponse4 = {
    opcion: 4,
    gameId: 0,
    mensaje: "" // Mensaje del error
}








/*
---------------------- CLIENT RESPOSE ----------------------
Cada response tendrá un parametro de "opcion", esto determinará lo que esta mandando el cliente al servidor
*/

// Si la opcion es 0 el cliente quiere ingresar a un juego, (registrarse)
const clientRespose0 = {
    opcion: 0,
    nombre: "", // Nombre que se asignó el jugador
}


// si la opcion es 1 el cliente mandará una jugada
const clienteResponse1 = {
    opcion: 1,
    playerId: 0, // Identificador del jugador que manda la jugada
    gameId: 0,
    pasar: false, // Booleano que define si el jugador quiere pasar su turno o no, si es true es porque quiere pasar su turno
    cartaBasuraId: 0, // Id de la carta de basura que utilizará
    cartasMano: [ // Lista de las cartas que tiene en su mano que desea poner en la mesa junto la carta de basura
        {
            cartaId: 0, // identificador de la carta que desea mandar de su mano
        },
        {
            cartaId: 1, // identificador de la carta que desea mandar de su mano
        }
    ],
    cartaPagarId: 0 // identificador de carta con la que desea pagar el jugador
}


// Si la opcion es 2 el cliente querrá mandar un mensaje a todos
const clienteResponse2 = {
    opcion: 2,
    gameId: 0,
    playerId: 0, // identificador del cliente que manda el mensaje,
    mensaje: "" // Mensaje que desea mandar
}
```

### Principales dificultades y lecciones aprendidas
- En la definición del protocolo fue un poco complicado porque es un lienzo en blanco, al principio fue difícil definirlo pero conforme se fue construyendo fue más sencillo.
- Otra de las dificultades que tuvimos fue la capacidad de compartir nuestras ideas ya que no nos podíamos ver en persona y trabajar juntos en esa manera.
- También pensamos que el no poder usar librerías externas hizo que este proyecto fuera más retador, ya que teníamos que definir e implementar todo lo necesario para poder replicar el juego en un programa.
- Utilizar protocolos hace mas rapido y eficiente el proceso de desarrollo porque tanto el cliente como el servidor saben lo que se espera del otro. Al momento de hacer pruebas es mas sencillo y da mas confianza sobre la comunicacion.
- Por último, aprendimos sobre la importancia de protocolos de comunicación en una estructura cliente-servidor. Entendimos la importancia de la comunicación y comprensión sobre la serialización de datos a bajo nivel. Y logramos mantener la sincronización de distintos objetos que comparten un estado.
