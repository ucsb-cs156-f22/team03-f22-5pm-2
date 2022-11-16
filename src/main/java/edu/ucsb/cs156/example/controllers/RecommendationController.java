package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.errors.EntityNotFoundException;

import java.time.LocalDateTime;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import edu.ucsb.cs156.example.entities.Recommendation;
import edu.ucsb.cs156.example.repositories.RecommendationRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.slf4j.Slf4j;

@Api(description = "Recommendation")
@RequestMapping("/api/recommendation")
@RestController
@Slf4j
public class RecommendationController extends ApiController{
    
    @Autowired
    RecommendationRepository recommendationRepository;

    @ApiOperation(value = "List all recommendation requests")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<Recommendation> allRecommendations() {
        Iterable<Recommendation> recommendations = recommendationRepository.findAll();
        return recommendations;
    }

    @ApiOperation(value = "Get a single recommendation")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public Recommendation getById(
            @ApiParam("id") @RequestParam Long id) {
        Recommendation recommendations = recommendationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Recommendation.class, id));
        return recommendations;
    }

    @ApiOperation(value = "Create a new recommendation request")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/post")
    public Recommendation postRecommendation(
        @ApiParam("id") @RequestParam Long id,
        @ApiParam("requesterEmail") @RequestParam String requesterEmail,
        @ApiParam("professorEmail") @RequestParam String professorEmail,
        @ApiParam("explanation") @RequestParam String explanation,
        @ApiParam("dateRequested") @RequestParam("dateRequested") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateRequested,
        @ApiParam("dateNeeded") @RequestParam("dateNeeded") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateNeeded,
        @ApiParam("done") @RequestParam boolean done
        )
        throws JsonProcessingException {
        Recommendation recommendation = new Recommendation();
        recommendation.setId(id);
        recommendation.setRequesterEmail(requesterEmail);
        recommendation.setProfessorEmail(professorEmail);
        recommendation.setExplanation(explanation);
        recommendation.setDateRequested(dateRequested);
        recommendation.setDateNeeded(dateNeeded);
        recommendation.setDone(done);

        Recommendation savedRecommendation = recommendationRepository.save(recommendation);

        return savedRecommendation;
    }
    
    @ApiOperation(value = "Delete a recommendation")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("")
    public Object deleteRecommendation(
            @ApiParam("id") @RequestParam Long id) {
        Recommendation recommendations = recommendationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Recommendation.class, id));

        recommendationRepository.delete(recommendations);
        return genericMessage("Recommendation with id %s deleted".formatted(id));
    }

    @ApiOperation(value = "Update a single recommendation")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("")
    public Recommendation updateRecommendation(
            @ApiParam("id") @RequestParam Long id,
            @RequestBody @Valid Recommendation incoming) {

        Recommendation recommendations = recommendationRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(Recommendation.class, id));

        recommendations.setRequesterEmail(incoming.getRequesterEmail());
        recommendations.setProfessorEmail(incoming.getProfessorEmail());
        recommendations.setExplanation(incoming.getExplanation());
        recommendations.setDateRequested(incoming.getDateRequested());
        recommendations.setDateNeeded(incoming.getDateNeeded());
        recommendations.setDone(incoming.getDone());

        recommendationRepository.save(recommendations);

        return recommendations;
    }
}