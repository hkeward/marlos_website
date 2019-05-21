package com.downloadablezebras;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/rooms")
public class RoomInfo {

    private Session getSession(Class entity) {
        Configuration con = new Configuration().configure().addAnnotatedClass(entity);
        StandardServiceRegistry reg = new StandardServiceRegistryBuilder().applySettings(con.getProperties()).build();
        SessionFactory sf = con.buildSessionFactory(reg);

        Session session = sf.openSession();
        return session;
    }

    // serves to /rest/rooms
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<RoomsEntity> getRoomList() {

        Session session = getSession(RoomsEntity.class);

        Transaction tx = null;
        tx = session.beginTransaction();
        Query q = session.createQuery("from RoomsEntity");
        List<RoomsEntity> allRooms = q.list();

        tx.commit();
        session.close();

        return allRooms;
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public RoomsEntity getRoom(@PathParam("id") int id) {

        Session session = getSession(RoomsEntity.class);

        Transaction tx = null;


        RoomsEntity room = new RoomsEntity();

        try {
            tx = session.beginTransaction();

            room = session.get(RoomsEntity.class, id);

            tx.commit();
        } catch (Exception e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }

        return room;
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response createRoom(RoomsEntity newRoom) {

        Session session = getSession(RoomsEntity.class);

        Transaction tx = null;

        try {
            tx = session.beginTransaction();

            session.save(newRoom);
        } catch (Exception e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }

        return Response
                .status(Response.Status.OK)
                .entity(newRoom.getRoomId())
                .build();
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response updateRoom(RoomsEntity updatedRoom, @PathParam("id") int id) {


        if (updatedRoom.getRoomId() != id) {
            String message = "You tried updating room " + updatedRoom.getRoomId() + " by sending a PUT request to room " + id + "; something's not right.";
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(message)
                    .build();
        }

        Session session = getSession(RoomsEntity.class);

        Transaction tx = null;

        try {
            tx = session.beginTransaction();

            session.update(updatedRoom);

            tx.commit();
        } catch (Exception e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
        return Response
                .status(Response.Status.OK)
                .build();
    }

    @DELETE
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response deleteRoom(@PathParam("id") int id) {

        Session session = getSession(RoomsEntity.class);

        Transaction tx = null;

        try {
            tx = session.beginTransaction();

            RoomsEntity room = session.get(RoomsEntity.class, id);
            session.delete(room);

            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }

        return Response
                .status(Response.Status.OK)
                .entity("Successfully deleted room " + id)
                .build();
    }
}
