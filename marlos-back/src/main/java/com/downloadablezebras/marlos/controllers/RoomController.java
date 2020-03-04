package com.downloadablezebras.marlos.controllers;

import com.downloadablezebras.marlos.data.room.RoomDataRepository;
import com.downloadablezebras.marlos.data.room.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/rest")
public class RoomController {

    @Autowired
    private RoomDataRepository repository;

    // get all rooms
    @GetMapping(value="/rooms")
    public List<Room> getRooms() {
        List<Room> results;
        results = repository.findAll();
        return results;
    }

    // get one room by id (returns a blank room if not found)
    @GetMapping("/rooms/{id}")
    public Room getRoom(@PathVariable Long id) {
        return repository.findById(id)
                         .orElse(new Room());
    }

    // create new room
    @Transactional
    @PostMapping("/rooms")
    public Long createRoom(@RequestBody Room newRoom) {
        repository.save(newRoom);
        return newRoom.getRoomId();
    }

    // update existing room
    @PutMapping("/rooms/{id}")
    public Room updateRoom(@RequestBody Room updatedRoom, @PathVariable Long id) {
        return repository.findById(id)
                         .map(room -> {
                             room.setRoomName(updatedRoom.getRoomName());
                             room.setTimeEstimate(updatedRoom.getTimeEstimate());
                             room.setRating(updatedRoom.getRating());
                             room.setDifficulty(updatedRoom.getDifficulty());
                             room.setGrid(updatedRoom.getGrid());
                             room.setDarkvision(updatedRoom.getDarkvision());
                             room.setType(updatedRoom.getType());
                             room.setEnvironment(updatedRoom.getEnvironment());
                             room.setTags(updatedRoom.getTags());
                             room.setQuality(updatedRoom.getQuality());
                             room.setDescription(updatedRoom.getDescription());
                             room.setCreatures(updatedRoom.getCreatures());
                             return repository.save(room);
                         })
                         .orElseGet(() -> {
                             updatedRoom.setRoomId(id);
                             return repository.save(updatedRoom);
                         });
    }

    @DeleteMapping("/rooms/{id}")
    public void deleteRoom(@PathVariable Long id) {
        repository.deleteById(id);
    }
}