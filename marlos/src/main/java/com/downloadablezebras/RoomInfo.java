package com.downloadablezebras;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import javax.imageio.spi.ServiceRegistry;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/rooms")
public class RoomInfo {

    @GET
    @Path("first_room")
    @Produces({MediaType.APPLICATION_JSON})
    public RoomsEntity getRoom() {
//        SessionFactory sf = new Configuration().configure().buildSessionFactory();
//        Session session = sf.getCurrentSession();
        Configuration con = new Configuration().configure().addAnnotatedClass(RoomsEntity.class);

        StandardServiceRegistry reg = new StandardServiceRegistryBuilder().applySettings(con.getProperties()).build();

        SessionFactory sf = con.buildSessionFactory(reg);

        Session session = sf.openSession();

        Transaction tx = null;


        RoomsEntity room = new RoomsEntity();

        try {
            tx = session.beginTransaction();

            room = session.get(RoomsEntity.class, 1);
            System.out.println(room);

            tx.commit();
        } catch (Exception e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }

        return room;
    }
}
