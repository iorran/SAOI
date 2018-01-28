package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SaoiApp;

import io.github.jhipster.application.domain.Evaluate;
import io.github.jhipster.application.repository.EvaluateRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EvaluateResource REST controller.
 *
 * @see EvaluateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SaoiApp.class)
public class EvaluateResourceIntTest {

    @Autowired
    private EvaluateRepository evaluateRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEvaluateMockMvc;

    private Evaluate evaluate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EvaluateResource evaluateResource = new EvaluateResource(evaluateRepository);
        this.restEvaluateMockMvc = MockMvcBuilders.standaloneSetup(evaluateResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Evaluate createEntity(EntityManager em) {
        Evaluate evaluate = new Evaluate();
        return evaluate;
    }

    @Before
    public void initTest() {
        evaluate = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvaluate() throws Exception {
        int databaseSizeBeforeCreate = evaluateRepository.findAll().size();

        // Create the Evaluate
        restEvaluateMockMvc.perform(post("/api/evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluate)))
            .andExpect(status().isCreated());

        // Validate the Evaluate in the database
        List<Evaluate> evaluateList = evaluateRepository.findAll();
        assertThat(evaluateList).hasSize(databaseSizeBeforeCreate + 1);
        Evaluate testEvaluate = evaluateList.get(evaluateList.size() - 1);
    }

    @Test
    @Transactional
    public void createEvaluateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = evaluateRepository.findAll().size();

        // Create the Evaluate with an existing ID
        evaluate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEvaluateMockMvc.perform(post("/api/evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluate)))
            .andExpect(status().isBadRequest());

        // Validate the Evaluate in the database
        List<Evaluate> evaluateList = evaluateRepository.findAll();
        assertThat(evaluateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEvaluates() throws Exception {
        // Initialize the database
        evaluateRepository.saveAndFlush(evaluate);

        // Get all the evaluateList
        restEvaluateMockMvc.perform(get("/api/evaluates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evaluate.getId().intValue())));
    }

    @Test
    @Transactional
    public void getEvaluate() throws Exception {
        // Initialize the database
        evaluateRepository.saveAndFlush(evaluate);

        // Get the evaluate
        restEvaluateMockMvc.perform(get("/api/evaluates/{id}", evaluate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(evaluate.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEvaluate() throws Exception {
        // Get the evaluate
        restEvaluateMockMvc.perform(get("/api/evaluates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvaluate() throws Exception {
        // Initialize the database
        evaluateRepository.saveAndFlush(evaluate);
        int databaseSizeBeforeUpdate = evaluateRepository.findAll().size();

        // Update the evaluate
        Evaluate updatedEvaluate = evaluateRepository.findOne(evaluate.getId());
        // Disconnect from session so that the updates on updatedEvaluate are not directly saved in db
        em.detach(updatedEvaluate);

        restEvaluateMockMvc.perform(put("/api/evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvaluate)))
            .andExpect(status().isOk());

        // Validate the Evaluate in the database
        List<Evaluate> evaluateList = evaluateRepository.findAll();
        assertThat(evaluateList).hasSize(databaseSizeBeforeUpdate);
        Evaluate testEvaluate = evaluateList.get(evaluateList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingEvaluate() throws Exception {
        int databaseSizeBeforeUpdate = evaluateRepository.findAll().size();

        // Create the Evaluate

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEvaluateMockMvc.perform(put("/api/evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluate)))
            .andExpect(status().isCreated());

        // Validate the Evaluate in the database
        List<Evaluate> evaluateList = evaluateRepository.findAll();
        assertThat(evaluateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEvaluate() throws Exception {
        // Initialize the database
        evaluateRepository.saveAndFlush(evaluate);
        int databaseSizeBeforeDelete = evaluateRepository.findAll().size();

        // Get the evaluate
        restEvaluateMockMvc.perform(delete("/api/evaluates/{id}", evaluate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Evaluate> evaluateList = evaluateRepository.findAll();
        assertThat(evaluateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Evaluate.class);
        Evaluate evaluate1 = new Evaluate();
        evaluate1.setId(1L);
        Evaluate evaluate2 = new Evaluate();
        evaluate2.setId(evaluate1.getId());
        assertThat(evaluate1).isEqualTo(evaluate2);
        evaluate2.setId(2L);
        assertThat(evaluate1).isNotEqualTo(evaluate2);
        evaluate1.setId(null);
        assertThat(evaluate1).isNotEqualTo(evaluate2);
    }
}
