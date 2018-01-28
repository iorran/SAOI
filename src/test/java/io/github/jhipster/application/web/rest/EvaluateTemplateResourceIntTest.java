package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SaoiApp;

import io.github.jhipster.application.domain.EvaluateTemplate;
import io.github.jhipster.application.repository.EvaluateTemplateRepository;
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
 * Test class for the EvaluateTemplateResource REST controller.
 *
 * @see EvaluateTemplateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SaoiApp.class)
public class EvaluateTemplateResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private EvaluateTemplateRepository evaluateTemplateRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEvaluateTemplateMockMvc;

    private EvaluateTemplate evaluateTemplate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EvaluateTemplateResource evaluateTemplateResource = new EvaluateTemplateResource(evaluateTemplateRepository);
        this.restEvaluateTemplateMockMvc = MockMvcBuilders.standaloneSetup(evaluateTemplateResource)
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
    public static EvaluateTemplate createEntity(EntityManager em) {
        EvaluateTemplate evaluateTemplate = new EvaluateTemplate()
            .description(DEFAULT_DESCRIPTION);
        return evaluateTemplate;
    }

    @Before
    public void initTest() {
        evaluateTemplate = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvaluateTemplate() throws Exception {
        int databaseSizeBeforeCreate = evaluateTemplateRepository.findAll().size();

        // Create the EvaluateTemplate
        restEvaluateTemplateMockMvc.perform(post("/api/evaluate-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluateTemplate)))
            .andExpect(status().isCreated());

        // Validate the EvaluateTemplate in the database
        List<EvaluateTemplate> evaluateTemplateList = evaluateTemplateRepository.findAll();
        assertThat(evaluateTemplateList).hasSize(databaseSizeBeforeCreate + 1);
        EvaluateTemplate testEvaluateTemplate = evaluateTemplateList.get(evaluateTemplateList.size() - 1);
        assertThat(testEvaluateTemplate.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createEvaluateTemplateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = evaluateTemplateRepository.findAll().size();

        // Create the EvaluateTemplate with an existing ID
        evaluateTemplate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEvaluateTemplateMockMvc.perform(post("/api/evaluate-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluateTemplate)))
            .andExpect(status().isBadRequest());

        // Validate the EvaluateTemplate in the database
        List<EvaluateTemplate> evaluateTemplateList = evaluateTemplateRepository.findAll();
        assertThat(evaluateTemplateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEvaluateTemplates() throws Exception {
        // Initialize the database
        evaluateTemplateRepository.saveAndFlush(evaluateTemplate);

        // Get all the evaluateTemplateList
        restEvaluateTemplateMockMvc.perform(get("/api/evaluate-templates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evaluateTemplate.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getEvaluateTemplate() throws Exception {
        // Initialize the database
        evaluateTemplateRepository.saveAndFlush(evaluateTemplate);

        // Get the evaluateTemplate
        restEvaluateTemplateMockMvc.perform(get("/api/evaluate-templates/{id}", evaluateTemplate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(evaluateTemplate.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEvaluateTemplate() throws Exception {
        // Get the evaluateTemplate
        restEvaluateTemplateMockMvc.perform(get("/api/evaluate-templates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvaluateTemplate() throws Exception {
        // Initialize the database
        evaluateTemplateRepository.saveAndFlush(evaluateTemplate);
        int databaseSizeBeforeUpdate = evaluateTemplateRepository.findAll().size();

        // Update the evaluateTemplate
        EvaluateTemplate updatedEvaluateTemplate = evaluateTemplateRepository.findOne(evaluateTemplate.getId());
        // Disconnect from session so that the updates on updatedEvaluateTemplate are not directly saved in db
        em.detach(updatedEvaluateTemplate);
        updatedEvaluateTemplate
            .description(UPDATED_DESCRIPTION);

        restEvaluateTemplateMockMvc.perform(put("/api/evaluate-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvaluateTemplate)))
            .andExpect(status().isOk());

        // Validate the EvaluateTemplate in the database
        List<EvaluateTemplate> evaluateTemplateList = evaluateTemplateRepository.findAll();
        assertThat(evaluateTemplateList).hasSize(databaseSizeBeforeUpdate);
        EvaluateTemplate testEvaluateTemplate = evaluateTemplateList.get(evaluateTemplateList.size() - 1);
        assertThat(testEvaluateTemplate.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingEvaluateTemplate() throws Exception {
        int databaseSizeBeforeUpdate = evaluateTemplateRepository.findAll().size();

        // Create the EvaluateTemplate

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEvaluateTemplateMockMvc.perform(put("/api/evaluate-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluateTemplate)))
            .andExpect(status().isCreated());

        // Validate the EvaluateTemplate in the database
        List<EvaluateTemplate> evaluateTemplateList = evaluateTemplateRepository.findAll();
        assertThat(evaluateTemplateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEvaluateTemplate() throws Exception {
        // Initialize the database
        evaluateTemplateRepository.saveAndFlush(evaluateTemplate);
        int databaseSizeBeforeDelete = evaluateTemplateRepository.findAll().size();

        // Get the evaluateTemplate
        restEvaluateTemplateMockMvc.perform(delete("/api/evaluate-templates/{id}", evaluateTemplate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EvaluateTemplate> evaluateTemplateList = evaluateTemplateRepository.findAll();
        assertThat(evaluateTemplateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EvaluateTemplate.class);
        EvaluateTemplate evaluateTemplate1 = new EvaluateTemplate();
        evaluateTemplate1.setId(1L);
        EvaluateTemplate evaluateTemplate2 = new EvaluateTemplate();
        evaluateTemplate2.setId(evaluateTemplate1.getId());
        assertThat(evaluateTemplate1).isEqualTo(evaluateTemplate2);
        evaluateTemplate2.setId(2L);
        assertThat(evaluateTemplate1).isNotEqualTo(evaluateTemplate2);
        evaluateTemplate1.setId(null);
        assertThat(evaluateTemplate1).isNotEqualTo(evaluateTemplate2);
    }
}
