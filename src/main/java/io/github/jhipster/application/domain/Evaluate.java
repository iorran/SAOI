package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Evaluate.
 */
@Entity
@Table(name = "evaluate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evaluate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private EvaluateTemplate evaluateTemplate;

    @ManyToOne
    private Clazz turma;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public Evaluate user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public EvaluateTemplate getEvaluateTemplate() {
        return evaluateTemplate;
    }

    public Evaluate evaluateTemplate(EvaluateTemplate evaluateTemplate) {
        this.evaluateTemplate = evaluateTemplate;
        return this;
    }

    public void setEvaluateTemplate(EvaluateTemplate evaluateTemplate) {
        this.evaluateTemplate = evaluateTemplate;
    }

    public Clazz getTurma() {
        return turma;
    }

    public Evaluate turma(Clazz clazz) {
        this.turma = clazz;
        return this;
    }

    public void setTurma(Clazz clazz) {
        this.turma = clazz;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Evaluate evaluate = (Evaluate) o;
        if (evaluate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evaluate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evaluate{" +
            "id=" + getId() +
            "}";
    }
}
