package com.downloadablezebras.marlos.data.creature;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class HP {
    private int average;
    private String hit_die;
}
