package com.downloadablezebras.marlos.data.room;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomDataRepository extends JpaRepository<Room, Long> {

    List<Room> findByName(String name);
    Room findOneByName(String name);
}
