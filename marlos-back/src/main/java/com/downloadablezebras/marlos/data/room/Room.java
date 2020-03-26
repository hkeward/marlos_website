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
    private Long id;

    private String name;
    private int timeEstimate;

    @Enumerated(EnumType.STRING)
    private Rating rating;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private Boolean gridRequired;
    private Boolean darkvisionRequired;
    private String type;
    private String environment;
    private String tags;

    @Enumerated(EnumType.STRING)
    private Quality quality;

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

    public Room(String name, Integer timeEstimate, Rating rating, Difficulty difficulty, Boolean gridRequired, Boolean darkvisionRequired, String type,
         String environment, String tags, Quality quality, String description, List<Creature> creatures) {
        this.name = name;
        this.timeEstimate = timeEstimate;
        this.rating = rating;
        this.difficulty = difficulty;
        this.gridRequired = gridRequired;
        this.darkvisionRequired = darkvisionRequired;
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
    }

    public void removeCreature(Creature creature) {
        if (!creatures.contains(creature)) {
            return;
        }
        creatures.remove(creature);
    }
}
