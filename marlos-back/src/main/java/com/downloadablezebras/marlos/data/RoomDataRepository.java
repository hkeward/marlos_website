package com.downloadablezebras.marlos.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomDataRepository extends JpaRepository<Room, Long> {

    List<Room> findByRoomName(String name);
    Room findOneByRoomName(String name);
}
