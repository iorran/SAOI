package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.EvaluateTemplate;

import io.github.jhipster.application.repository.EvaluateTemplateRepository;
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
 * REST controller for managing EvaluateTemplate.
 */
@RestController
@RequestMapping("/api")
public class EvaluateTemplateResource {

    private final Logger log = LoggerFactory.getLogger(EvaluateTemplateResource.class);

    private static final String ENTITY_NAME = "evaluateTemplate";

    private final EvaluateTemplateRepository evaluateTemplateRepository;

    public EvaluateTemplateResource(EvaluateTemplateRepository evaluateTemplateRepository) {
        this.evaluateTemplateRepository = evaluateTemplateRepository;
    }

    /**
     * POST  /evaluate-templates : Create a new evaluateTemplate.
     *
     * @param evaluateTemplate the evaluateTemplate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new evaluateTemplate, or with status 400 (Bad Request) if the evaluateTemplate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/evaluate-templates")
    @Timed
    public ResponseEntity<EvaluateTemplate> createEvaluateTemplate(@RequestBody EvaluateTemplate evaluateTemplate) throws URISyntaxException {
        log.debug("REST request to save EvaluateTemplate : {}", evaluateTemplate);
        if (evaluateTemplate.getId() != null) {
            throw new BadRequestAlertException("A new evaluateTemplate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EvaluateTemplate result = evaluateTemplateRepository.save(evaluateTemplate);
        return ResponseEntity.created(new URI("/api/evaluate-templates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /evaluate-templates : Updates an existing evaluateTemplate.
     *
     * @param evaluateTemplate the evaluateTemplate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated evaluateTemplate,
     * or with status 400 (Bad Request) if the evaluateTemplate is not valid,
     * or with status 500 (Internal Server Error) if the evaluateTemplate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/evaluate-templates")
    @Timed
    public ResponseEntity<EvaluateTemplate> updateEvaluateTemplate(@RequestBody EvaluateTemplate evaluateTemplate) throws URISyntaxException {
        log.debug("REST request to update EvaluateTemplate : {}", evaluateTemplate);
        if (evaluateTemplate.getId() == null) {
            return createEvaluateTemplate(evaluateTemplate);
        }
        EvaluateTemplate result = evaluateTemplateRepository.save(evaluateTemplate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, evaluateTemplate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /evaluate-templates : get all the evaluateTemplates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of evaluateTemplates in body
     */
    @GetMapping("/evaluate-templates")
    @Timed
    public List<EvaluateTemplate> getAllEvaluateTemplates() {
        log.debug("REST request to get all EvaluateTemplates");
        return evaluateTemplateRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /evaluate-templates/:id : get the "id" evaluateTemplate.
     *
     * @param id the id of the evaluateTemplate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the evaluateTemplate, or with status 404 (Not Found)
     */
    @GetMapping("/evaluate-templates/{id}")
    @Timed
    public ResponseEntity<EvaluateTemplate> getEvaluateTemplate(@PathVariable Long id) {
        log.debug("REST request to get EvaluateTemplate : {}", id);
        EvaluateTemplate evaluateTemplate = evaluateTemplateRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(evaluateTemplate));
    }

    /**
     * DELETE  /evaluate-templates/:id : delete the "id" evaluateTemplate.
     *
     * @param id the id of the evaluateTemplate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/evaluate-templates/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvaluateTemplate(@PathVariable Long id) {
        log.debug("REST request to delete EvaluateTemplate : {}", id);
        evaluateTemplateRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
