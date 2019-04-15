package com.downloadablezebras;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Objects;

@XmlRootElement
@Entity
@Table(name = "rooms", schema = "marlos")
public class RoomsEntity {
    private int roomId;
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
    private String description;

    public RoomsEntity() {
    }

    public RoomsEntity(int roomId, String roomName, Integer timeEstimate, String rating, String difficulty, Byte grid, Byte darkvision, String type, String environment, String tags, String quality, String description) {
        this.roomId = roomId;
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

    @Id
    @Column(name = "room_id")
    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    @Basic
    @Column(name = "room_name")
    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    @Basic
    @Column(name = "time_estimate")
    public Integer getTimeEstimate() {
        return timeEstimate;
    }

    public void setTimeEstimate(Integer timeEstimate) {
        this.timeEstimate = timeEstimate;
    }

    @Basic
    @Column(name = "rating")
    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    @Basic
    @Column(name = "difficulty")
    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    @Basic
    @Column(name = "grid")
    public Byte getGrid() {
        return grid;
    }

    public void setGrid(Byte grid) {
        this.grid = grid;
    }

    @Basic
    @Column(name = "darkvision")
    public Byte getDarkvision() {
        return darkvision;
    }

    public void setDarkvision(Byte darkvision) {
        this.darkvision = darkvision;
    }

    @Basic
    @Column(name = "type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "environment")
    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    @Basic
    @Column(name = "tags")
    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    @Basic
    @Column(name = "quality")
    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoomsEntity that = (RoomsEntity) o;
        return roomId == that.roomId &&
                Objects.equals(roomName, that.roomName) &&
                Objects.equals(timeEstimate, that.timeEstimate) &&
                Objects.equals(rating, that.rating) &&
                Objects.equals(difficulty, that.difficulty) &&
                Objects.equals(grid, that.grid) &&
                Objects.equals(darkvision, that.darkvision) &&
                Objects.equals(type, that.type) &&
                Objects.equals(environment, that.environment) &&
                Objects.equals(tags, that.tags) &&
                Objects.equals(quality, that.quality) &&
                Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roomId, roomName, timeEstimate, rating, difficulty, grid, darkvision, type, environment, tags, quality, description);
    }
}
