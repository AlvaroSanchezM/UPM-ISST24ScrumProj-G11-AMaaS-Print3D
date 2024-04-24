package es.upm.dit.isst.grupo11.amaas.controller;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AmaasController {

    @GetMapping("/")
    public String inicio(){
        return "index.html";
    }

}
