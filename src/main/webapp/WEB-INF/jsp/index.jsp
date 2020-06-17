<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
        let hostPath = '${pageContext.request.serverName}:${pageContext.request.serverPort}/';
        let contextPath = '${pageContext.request.contextPath}/';
    </script>
</head>
<body>
<div id="compteur-container"></div>
<div id="bienvenue-container"></div>
<label for="nom-prenom-input" >Message</label><input id="nom-prenom-input" placeholder="Nom Prenom"/><button id="nom-prenom-button">Envoyer</button>


<script src="${pageContext.request.contextPath}/webjars/jquery/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/statics/stomp.min.js"></script>
<%--<script src="${pageContext.request.contextPath}/webjars/sockjs-client/sockjs.min.js"></script>--%>
<script src="${pageContext.request.contextPath}/statics/app.js"></script>
</body>
</html>