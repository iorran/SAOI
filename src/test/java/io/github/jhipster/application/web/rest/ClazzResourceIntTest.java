package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SaoiApp;

import io.github.jhipster.application.domain.Clazz;
import io.github.jhipster.application.repository.ClazzRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ClazzResource REST controller.
 *
 * @see ClazzResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SaoiApp.class)
public class ClazzResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ClazzRepository clazzRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClazzMockMvc;

    private Clazz clazz;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClazzResource clazzResource = new ClazzResource(clazzRepository);
        this.restClazzMockMvc = MockMvcBuilders.standaloneSetup(clazzResource)
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
    public static Clazz createEntity(EntityManager em) {
        Clazz clazz = new Clazz()
            .code(DEFAULT_CODE)
            .start(DEFAULT_START)
            .end(DEFAULT_END);
        return clazz;
    }

    @Before
    public void initTest() {
        clazz = createEntity(em);
    }

    @Test
    @Transactional
    public void createClazz() throws Exception {
        int databaseSizeBeforeCreate = clazzRepository.findAll().size();

        // Create the Clazz
        restClazzMockMvc.perform(post("/api/clazzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clazz)))
            .andExpect(status().isCreated());

        // Validate the Clazz in the database
        List<Clazz> clazzList = clazzRepository.findAll();
        assertThat(clazzList).hasSize(databaseSizeBeforeCreate + 1);
        Clazz testClazz = clazzList.get(clazzList.size() - 1);
        assertThat(testClazz.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testClazz.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testClazz.getEnd()).isEqualTo(DEFAULT_END);
    }

    @Test
    @Transactional
    public void createClazzWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clazzRepository.findAll().size();

        // Create the Clazz with an existing ID
        clazz.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClazzMockMvc.perform(post("/api/clazzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clazz)))
            .andExpect(status().isBadRequest());

        // Validate the Clazz in the database
        List<Clazz> clazzList = clazzRepository.findAll();
        assertThat(clazzList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllClazzes() throws Exception {
        // Initialize the database
        clazzRepository.saveAndFlush(clazz);

        // Get all the clazzList
        restClazzMockMvc.perform(get("/api/clazzes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clazz.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())));
    }

    @Test
    @Transactional
    public void getClazz() throws Exception {
        // Initialize the database
        clazzRepository.saveAndFlush(clazz);

        // Get the clazz
        restClazzMockMvc.perform(get("/api/clazzes/{id}", clazz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clazz.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClazz() throws Exception {
        // Get the clazz
        restClazzMockMvc.perform(get("/api/clazzes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClazz() throws Exception {
        // Initialize the database
        clazzRepository.saveAndFlush(clazz);
        int databaseSizeBeforeUpdate = clazzRepository.findAll().size();

        // Update the clazz
        Clazz updatedClazz = clazzRepository.findOne(clazz.getId());
        // Disconnect from session so that the updates on updatedClazz are not directly saved in db
        em.detach(updatedClazz);
        updatedClazz
            .code(UPDATED_CODE)
            .start(UPDATED_START)
            .end(UPDATED_END);

        restClazzMockMvc.perform(put("/api/clazzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClazz)))
            .andExpect(status().isOk());

        // Validate the Clazz in the database
        List<Clazz> clazzList = clazzRepository.findAll();
        assertThat(clazzList).hasSize(databaseSizeBeforeUpdate);
        Clazz testClazz = clazzList.get(clazzList.size() - 1);
        assertThat(testClazz.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testClazz.getStart()).isEqualTo(UPDATED_START);
        assertThat(testClazz.getEnd()).isEqualTo(UPDATED_END);
    }

    @Test
    @Transactional
    public void updateNonExistingClazz() throws Exception {
        int databaseSizeBeforeUpdate = clazzRepository.findAll().size();

        // Create the Clazz

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClazzMockMvc.perform(put("/api/clazzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clazz)))
            .andExpect(status().isCreated());

        // Validate the Clazz in the database
        List<Clazz> clazzList = clazzRepository.findAll();
        assertThat(clazzList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClazz() throws Exception {
        // Initialize the database
        clazzRepository.saveAndFlush(clazz);
        int databaseSizeBeforeDelete = clazzRepository.findAll().size();

        // Get the clazz
        restClazzMockMvc.perform(delete("/api/clazzes/{id}", clazz.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Clazz> clazzList = clazzRepository.findAll();
        assertThat(clazzList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Clazz.class);
        Clazz clazz1 = new Clazz();
        clazz1.setId(1L);
        Clazz clazz2 = new Clazz();
        clazz2.setId(clazz1.getId());
        assertThat(clazz1).isEqualTo(clazz2);
        clazz2.setId(2L);
        assertThat(clazz1).isNotEqualTo(clazz2);
        clazz1.setId(null);
        assertThat(clazz1).isNotEqualTo(clazz2);
    }
}
