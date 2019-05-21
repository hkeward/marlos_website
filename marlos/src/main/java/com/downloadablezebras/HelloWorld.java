package com.downloadablezebras;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/")
public class HelloWorld {

    @GET
    @Path("/sayHello")
    @Produces("text/plain")
    public String helloWorld() {
        return "Hello world!";
    }
}
