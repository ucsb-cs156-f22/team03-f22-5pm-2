package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.UCSBOrganization;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.UCSBOrganizationRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@Api(description = "Information about UCSB organizations")
@RequestMapping("/api/UCSBOrganization")
@RestController
@Slf4j
public class UCSBOrganizationController extends ApiController {

    @Autowired
    UCSBOrganizationRepository ucsbOrganizationRepository;

    @ApiOperation(value = "List all UCSB organizations")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<UCSBOrganization> allOrganizations() {
        Iterable<UCSBOrganization> organization = ucsbOrganizationRepository.findAll();
        return organization;
    }

    @ApiOperation(value = "Create a new organization")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/post")
    public UCSBOrganization postOrganizations(
        @ApiParam("organization code, e.g. SKY") @RequestParam String orgCode,
        @ApiParam("organization translation (short), e.g. Skydiving Club") @RequestParam String orgTranslationShort,
        @ApiParam("organization translation, e.g. Skydiving Club at UCSB") @RequestParam String orgTranslation,
        @ApiParam("true (resp. false) for inactive (resp. inactive) organizations") @RequestParam boolean inactive
        )
        {

        UCSBOrganization organization = new UCSBOrganization();
        organization.setOrgCode(orgCode);
        organization.setOrgTranslationShort(orgTranslationShort);
        organization.setOrgTranslation(orgTranslation);
        organization.setInactive(inactive);

        UCSBOrganization savedOrganization = ucsbOrganizationRepository.save(organization);

        return organization;
    }

    @ApiOperation(value = "Get a single organization")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public UCSBOrganization getById(
            @ApiParam("unique organization code, e.g. SKY") @RequestParam String id) {
        UCSBOrganization org = ucsbOrganizationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(UCSBOrganization.class, id));

        return org;
    }

    @ApiOperation(value = "Delete a UCSB organization")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("")
    public Object deleteOrganization(
            @ApiParam("unique organization code") @RequestParam String id) {
        UCSBOrganization org = ucsbOrganizationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(UCSBOrganization.class, id));

        ucsbOrganizationRepository.delete(org);
        return genericMessage("UCSBOrganization with id %s deleted".formatted(id));
    }

    @ApiOperation(value = "Update a single organization")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("")
    public UCSBOrganization updateOrg(
            @ApiParam("unique organization code") @RequestParam String id,
            @RequestBody @Valid UCSBOrganization incoming) {

        UCSBOrganization org = ucsbOrganizationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(UCSBOrganization.class, id));

	//ucsbOrganizationRepository.delete(org);
	
	//org.setOrgCode(incoming.getOrgCode());
        org.setOrgTranslationShort(incoming.getOrgTranslationShort());
        org.setOrgTranslation(incoming.getOrgTranslation());
        org.setInactive(incoming.getInactive());

        ucsbOrganizationRepository.save(org);

        return org;
    }
}
