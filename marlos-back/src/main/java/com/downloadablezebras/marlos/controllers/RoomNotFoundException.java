package com.downloadablezebras.marlos.controllers;

public class RoomNotFoundException extends RuntimeException {

    RoomNotFoundException(Long id) {
        super("Could not find room with id " + id);
    }

}
