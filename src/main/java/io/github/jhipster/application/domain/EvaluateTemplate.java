package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A EvaluateTemplate.
 */
@Entity
@Table(name = "evaluate_template")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EvaluateTemplate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "evaluate_template_questions",
               joinColumns = @JoinColumn(name="evaluate_templates_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="questions_id", referencedColumnName="id"))
    private Set<QuestionTemplate> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public EvaluateTemplate description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<QuestionTemplate> getQuestions() {
        return questions;
    }

    public EvaluateTemplate questions(Set<QuestionTemplate> questionTemplates) {
        this.questions = questionTemplates;
        return this;
    }

    public EvaluateTemplate addQuestions(QuestionTemplate questionTemplate) {
        this.questions.add(questionTemplate);
        return this;
    }

    public EvaluateTemplate removeQuestions(QuestionTemplate questionTemplate) {
        this.questions.remove(questionTemplate);
        return this;
    }

    public void setQuestions(Set<QuestionTemplate> questionTemplates) {
        this.questions = questionTemplates;
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
        EvaluateTemplate evaluateTemplate = (EvaluateTemplate) o;
        if (evaluateTemplate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evaluateTemplate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EvaluateTemplate{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
