package com.downloadablezebras;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class NewUserServlet extends HttpServlet {

    public void service(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        byte[] pw_byte = password.getBytes();
        String firstName = req.getParameter("firstName");
        String lastName = req.getParameter("lastName");
        String email = req.getParameter("email");

        PrintWriter out = res.getWriter();

        out.println("<h1>User page</h1>");


        UsersEntity newUser = new UsersEntity();

        newUser.setUsername(username);
        newUser.setPassword(pw_byte);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);

        Configuration con = new Configuration().configure().addAnnotatedClass(UsersEntity.class);

        ServiceRegistry reg = new StandardServiceRegistryBuilder().applySettings(con.getProperties()).build();

        SessionFactory factory = con.buildSessionFactory(reg);

        Session session = factory.openSession();

        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            session.save(newUser);
            tx.commit();
            out.println("New user " + newUser.getUsername() + " added successfully!");
        } catch (Exception e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
            out.println("There was a problem adding user " + newUser.getUsername() + "!");
        } finally {
            session.close();
        }

    }
}
