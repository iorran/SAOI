package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.QuestionTemplate;

import io.github.jhipster.application.repository.QuestionTemplateRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing QuestionTemplate.
 */
@RestController
@RequestMapping("/api")
public class QuestionTemplateResource {

    private final Logger log = LoggerFactory.getLogger(QuestionTemplateResource.class);

    private static final String ENTITY_NAME = "questionTemplate";

    private final QuestionTemplateRepository questionTemplateRepository;

    public QuestionTemplateResource(QuestionTemplateRepository questionTemplateRepository) {
        this.questionTemplateRepository = questionTemplateRepository;
    }

    /**
     * POST  /question-templates : Create a new questionTemplate.
     *
     * @param questionTemplate the questionTemplate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new questionTemplate, or with status 400 (Bad Request) if the questionTemplate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/question-templates")
    @Timed
    public ResponseEntity<QuestionTemplate> createQuestionTemplate(@RequestBody QuestionTemplate questionTemplate) throws URISyntaxException {
        log.debug("REST request to save QuestionTemplate : {}", questionTemplate);
        if (questionTemplate.getId() != null) {
            throw new BadRequestAlertException("A new questionTemplate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuestionTemplate result = questionTemplateRepository.save(questionTemplate);
        return ResponseEntity.created(new URI("/api/question-templates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /question-templates : Updates an existing questionTemplate.
     *
     * @param questionTemplate the questionTemplate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated questionTemplate,
     * or with status 400 (Bad Request) if the questionTemplate is not valid,
     * or with status 500 (Internal Server Error) if the questionTemplate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/question-templates")
    @Timed
    public ResponseEntity<QuestionTemplate> updateQuestionTemplate(@RequestBody QuestionTemplate questionTemplate) throws URISyntaxException {
        log.debug("REST request to update QuestionTemplate : {}", questionTemplate);
        if (questionTemplate.getId() == null) {
            return createQuestionTemplate(questionTemplate);
        }
        QuestionTemplate result = questionTemplateRepository.save(questionTemplate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, questionTemplate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /question-templates : get all the questionTemplates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of questionTemplates in body
     */
    @GetMapping("/question-templates")
    @Timed
    public List<QuestionTemplate> getAllQuestionTemplates() {
        log.debug("REST request to get all QuestionTemplates");
        return questionTemplateRepository.findAll();
        }

    /**
     * GET  /question-templates/:id : get the "id" questionTemplate.
     *
     * @param id the id of the questionTemplate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the questionTemplate, or with status 404 (Not Found)
     */
    @GetMapping("/question-templates/{id}")
    @Timed
    public ResponseEntity<QuestionTemplate> getQuestionTemplate(@PathVariable Long id) {
        log.debug("REST request to get QuestionTemplate : {}", id);
        QuestionTemplate questionTemplate = questionTemplateRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(questionTemplate));
    }

    /**
     * DELETE  /question-templates/:id : delete the "id" questionTemplate.
     *
     * @param id the id of the questionTemplate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/question-templates/{id}")
    @Timed
    public ResponseEntity<Void> deleteQuestionTemplate(@PathVariable Long id) {
        log.debug("REST request to delete QuestionTemplate : {}", id);
        questionTemplateRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
