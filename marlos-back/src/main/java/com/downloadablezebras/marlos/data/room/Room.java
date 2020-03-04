package com.downloadablezebras.marlos.data.room;

import com.downloadablezebras.marlos.data.creature.Creature;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode
public class Room {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long roomId;

    private String roomName;
    private Integer timeEstimate;
    private String rating;
    private String difficulty;
    private Byte grid;
    private Byte darkvision;
    private String type;
    private String environment;
    private String tags;
    private String quality;

    @Column(columnDefinition = "text")
    private String description;

    @ManyToMany(cascade = {CascadeType.REFRESH})
    @JoinTable(
            name = "room_creature",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "creature_id"))
    List<Creature> creatures = new ArrayList<>();

    public Room() {
    }

    public Room(String roomName, Integer timeEstimate, String rating, String difficulty, Byte grid, Byte darkvision, String type,
         String environment, String tags, String quality, String description, List<Creature> creatures) {
        this.roomName = roomName;
        this.timeEstimate = timeEstimate;
        this.rating = rating;
        this.difficulty = difficulty;
        this.grid = grid;
        this.darkvision = darkvision;
        this.type = type;
        this.environment = environment;
        this.tags = tags;
        this.quality = quality;
        this.description = description;
        this.creatures = creatures;
    }

    public void setCreatures(List<Creature> creatures) {
        this.creatures = creatures;
    }

    public List<Creature> getCreatures() {
        return new ArrayList<>(creatures);
    }

    public void addCreature(Creature creature) {
        if (creatures.contains(creature)) {
            return;
        }
        creatures.add(creature);
        creature.addRoom(this);
    }

    public void removeCreature(Creature creature) {
        if (!creatures.contains(creature)) {
            return;
        }
        creatures.remove(creature);
        creature.removeRoom(this);
    }
}
