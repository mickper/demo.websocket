package fr.exemple.demo.websocket.controller;

import fr.exemple.demo.websocket.pojo.Bienvenue;
import fr.exemple.demo.websocket.pojo.HelloMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.HtmlUtils;

@Controller
@EnableScheduling
public class IndexController {
    @Autowired
    private SimpMessagingTemplate template;

    private Long compteur = 0L;

    @MessageMapping("/hello")
    @SendTo("/topic/name")
    public Bienvenue greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Bienvenue("Bienvenue " + HtmlUtils.htmlEscape(message.getName()) + " !");
    }

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @Scheduled(fixedRate = 1000)
    public void compteur() {
        this.template.convertAndSend("/topic/compteur", compteur++);
    }
}