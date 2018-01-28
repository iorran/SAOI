package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Evaluate;

import io.github.jhipster.application.repository.EvaluateRepository;
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
 * REST controller for managing Evaluate.
 */
@RestController
@RequestMapping("/api")
public class EvaluateResource {

    private final Logger log = LoggerFactory.getLogger(EvaluateResource.class);

    private static final String ENTITY_NAME = "evaluate";

    private final EvaluateRepository evaluateRepository;

    public EvaluateResource(EvaluateRepository evaluateRepository) {
        this.evaluateRepository = evaluateRepository;
    }

    /**
     * POST  /evaluates : Create a new evaluate.
     *
     * @param evaluate the evaluate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new evaluate, or with status 400 (Bad Request) if the evaluate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/evaluates")
    @Timed
    public ResponseEntity<Evaluate> createEvaluate(@RequestBody Evaluate evaluate) throws URISyntaxException {
        log.debug("REST request to save Evaluate : {}", evaluate);
        if (evaluate.getId() != null) {
            throw new BadRequestAlertException("A new evaluate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Evaluate result = evaluateRepository.save(evaluate);
        return ResponseEntity.created(new URI("/api/evaluates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /evaluates : Updates an existing evaluate.
     *
     * @param evaluate the evaluate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated evaluate,
     * or with status 400 (Bad Request) if the evaluate is not valid,
     * or with status 500 (Internal Server Error) if the evaluate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/evaluates")
    @Timed
    public ResponseEntity<Evaluate> updateEvaluate(@RequestBody Evaluate evaluate) throws URISyntaxException {
        log.debug("REST request to update Evaluate : {}", evaluate);
        if (evaluate.getId() == null) {
            return createEvaluate(evaluate);
        }
        Evaluate result = evaluateRepository.save(evaluate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, evaluate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /evaluates : get all the evaluates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of evaluates in body
     */
    @GetMapping("/evaluates")
    @Timed
    public List<Evaluate> getAllEvaluates() {
        log.debug("REST request to get all Evaluates");
        return evaluateRepository.findAll();
        }

    /**
     * GET  /evaluates/:id : get the "id" evaluate.
     *
     * @param id the id of the evaluate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the evaluate, or with status 404 (Not Found)
     */
    @GetMapping("/evaluates/{id}")
    @Timed
    public ResponseEntity<Evaluate> getEvaluate(@PathVariable Long id) {
        log.debug("REST request to get Evaluate : {}", id);
        Evaluate evaluate = evaluateRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(evaluate));
    }

    /**
     * DELETE  /evaluates/:id : delete the "id" evaluate.
     *
     * @param id the id of the evaluate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/evaluates/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvaluate(@PathVariable Long id) {
        log.debug("REST request to delete Evaluate : {}", id);
        evaluateRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
