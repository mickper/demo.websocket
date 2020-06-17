var stompClient;
// fonction pour la version 5 qui ne marche pas avec EDGE/IE
// function connectNameTopic() {
//     // configuration
//     stompClient = new StompJs.Client({
//         brokerURL: 'ws://' + hostPath + contextPath + 'ws-entry-point', // endpoint
//         connectHeaders: {},
//         debug: function (str) {
//             console.log(str);
//         },
//         reconnectDelay: 5000,
//         heartbeatIncoming: 4000,
//         heartbeatOutgoing: 4000
//     });
//
//     // Fallback code
//     if (typeof WebSocket !== 'function') {
//         // For SockJS you need to set a factory that creates a new SockJS instance
//         // to be used for each (re)connect
//         stompClient.webSocketFactory = function () {
//             // Note that the URL is different from the WebSocket URL
//             return new SockJS(contextPath + 'ws-entry-point');
//         };
//     }
//
//     stompClient.onConnect = function (frame) {
//         // Do something, all subscribes must be done is this callback
//         // This is needed because this will be executed after a (re)connect
//         stompClient.subscribe('/topic/name', function(message) {
//             bienvenue(JSON.parse(message.body).message);
//         });
//
//         stompClient.subscribe('/topic/compteur', function (message) {
//             compter(JSON.parse(message.body));
//         });
//     };
//
//     stompClient.onStompError = function (frame) {
//         // Will be invoked in case of error encountered at Broker
//         // Bad login/passcode typically will cause an error
//         // Complaint brokers will set `message` header with a brief message. Body may contain details.
//         // Compliant brokers will terminate the connection after any error
//         console.log('Broker reported error: ' + frame.headers['message']);
//         console.log('Additional details: ' + frame.body);
//     };
//
//     stompClient.activate();
// }

function connectNameTopic() {
    stompClient = Stomp.client('ws://' + hostPath + contextPath + 'ws-entry-point');
    stompClient.reconnect_delay = 5000;
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/name', function (message) {
            bienvenue(JSON.parse(message.body).message);
        });
        stompClient.subscribe('/topic/compteur', function (message) {
            compter(JSON.parse(message.body));
        });
    }, function(error) {
        console.log(error);
    }, function(closeEvent) {
        console.log(closeEvent);
    });
}

function bienvenue(message) {
    $("#bienvenue-container").html('<p>' + message + '</p>');
}

function compter(message) {
    $("#compteur-container").html('<p>' + message + '</p>');
}

function sendName() {
    // stompClient.publish({destination: '/app/hello', body: JSON.stringify({'name': $("#nom-prenom-input").val()})}); // STOMP 5
    stompClient.send('/app/hello', {},JSON.stringify({'name': $("#nom-prenom-input").val()}));
}

$(function() {
    connectNameTopic();
    $('#nom-prenom-button').click(function() {
        sendName();
    });
});