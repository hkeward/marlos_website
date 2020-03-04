package com.downloadablezebras.marlos.data;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@EqualsAndHashCode
public class Room {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
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

    public Room() {
    }

    public Room(String roomName, Integer timeEstimate, String rating, String difficulty, Byte grid, Byte darkvision, String type,
         String environment, String tags, String quality, String description) {
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
    }
}
