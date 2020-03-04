package com.downloadablezebras.marlos.data.creature;

import com.downloadablezebras.marlos.data.room.Room;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Set;

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
    @ManyToMany(mappedBy = "creatures")
    Set<Room> rooms;

    public Creature() {

    }

    public Creature(String creatureName, TextReference textReference) {
        this.creatureName = creatureName;
        this.textReference = textReference;
    }
}
