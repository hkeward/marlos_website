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
import java.util.ArrayList;

public class UserListServlet extends HttpServlet {

    public void service(HttpServletRequest req, HttpServletResponse res) throws IOException {
        PrintWriter out = res.getWriter();

        out.println("<h1>User list</h1>");

        Configuration con = new Configuration().configure().addAnnotatedClass(UsersEntity.class);

        ServiceRegistry reg = new StandardServiceRegistryBuilder().applySettings(con.getProperties()).build();

        SessionFactory factory = con.buildSessionFactory(reg);

        Session session = factory.openSession();

        ArrayList<UsersEntity> users = new ArrayList<>();
        UsersEntity currentUser;

        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            for (int i=1; i <= 5; i++) {
                currentUser = session.get(UsersEntity.class, i);
                users.add(currentUser);
            }
            tx.commit();
        } catch (Exception e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }

        out.println("<table>");
        out.println("<tr><th>ID</th><th>Username</th><th>Email</th></tr>");
        for (UsersEntity user : users) {
            out.println("<tr>");
            out.println("<td>" + user.getId() + "</td>");
            out.println("<td>" + user.getUsername() + "</td>");
            out.println("<td>" + user.getEmail() + "</td>");
            out.println("</tr>");
        }
        out.println("</table>");
    }
}
