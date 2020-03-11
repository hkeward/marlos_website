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

    public Creature() {

    }

    public Creature(String creatureName, TextReference textReference) {
        this.creatureName = creatureName;
        this.textReference = textReference;
    }
}
