
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
    playerId: 0, // identificador del cliente que manda el mensaje,
    mensaje: "" // Mensaje que desea mandar
}