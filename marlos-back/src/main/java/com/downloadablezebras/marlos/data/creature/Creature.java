package com.downloadablezebras.marlos.data.creature;

import com.downloadablezebras.marlos.data.room.Room;
import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode
public class Creature {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long creatureId;

    private String creatureName;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "book", column = @Column(name = "text_reference_book")),
            @AttributeOverride( name = "pageNumber", column = @Column(name = "text_reference_page_number"))
    })
    private TextReference textReference;

    @ManyToMany(mappedBy = "creatures", cascade = {CascadeType.REFRESH, CascadeType.MERGE})
    @JsonBackReference
    List<Room> rooms = new ArrayList<>();

    public Creature() {

    }

    public Creature(String creatureName, TextReference textReference, List<Room> rooms) {
        this.creatureName = creatureName;
        this.textReference = textReference;
        this.rooms = rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<Room> getRooms() {
        return new ArrayList<>(rooms);
    }

    public void addRoom(Room room) {
        if (rooms.contains(room)) {
            return;
        }
        rooms.add(room);
        room.addCreature(this);
    }

    public void removeRoom(Room room) {
        if (!rooms.contains(room)) {
            return;
        }
        rooms.remove(room);
        room.removeCreature(this);
    }
}
