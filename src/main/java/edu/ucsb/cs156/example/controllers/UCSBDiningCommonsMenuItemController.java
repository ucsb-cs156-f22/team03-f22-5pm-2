package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.UCSBDiningCommonsMenuItem;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.UCSBDiningCommonsMenuItemRepository;
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


@Api(description = "UCSBDiningCommons")
@RequestMapping("/api/ucsbdiningcommonsmenuitem")
@RestController
@Slf4j
public class UCSBDiningCommonsMenuItemController extends ApiController{
    
    @Autowired
    UCSBDiningCommonsMenuItemRepository ucsbDiningCommonsMenuItemRepository;

    @ApiOperation(value = "List all Menu Items")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<UCSBDiningCommonsMenuItem> allMenuItems() {
        Iterable<UCSBDiningCommonsMenuItem> menuItems = ucsbDiningCommonsMenuItemRepository.findAll();
        return menuItems;
    }

    @ApiOperation(value = "Create a new Menu Items")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/post")
    public UCSBDiningCommonsMenuItem postMenuItems(
        @ApiParam("diningCommonsCode") @RequestParam String diningCommonsCode,
        @ApiParam("name") @RequestParam String name,
        @ApiParam("station") @RequestParam String station) {

        UCSBDiningCommonsMenuItem menuItems = new UCSBDiningCommonsMenuItem();
        menuItems.setDiningCommonsCode(diningCommonsCode);
        menuItems.setName(name);
        menuItems.setStation(station);

        UCSBDiningCommonsMenuItem savedMenuItems = ucsbDiningCommonsMenuItemRepository.save(menuItems);

        return savedMenuItems;
    }

    @ApiOperation(value = "Get a single Menu Item")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public UCSBDiningCommonsMenuItem getById(
            @ApiParam("id") @RequestParam Long id) {
        UCSBDiningCommonsMenuItem MenuItem = ucsbDiningCommonsMenuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(UCSBDiningCommonsMenuItem.class, id));
        return MenuItem;
    }

    @ApiOperation(value = "Update a single Menu Item")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("")
    public UCSBDiningCommonsMenuItem updateMenuItem(
            @ApiParam("code") @RequestParam Long id,
            @RequestBody @Valid UCSBDiningCommonsMenuItem incoming) {

        UCSBDiningCommonsMenuItem menuitems = ucsbDiningCommonsMenuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(UCSBDiningCommonsMenuItem.class, id));
                
        menuitems.setDiningCommonsCode(incoming.getDiningCommonsCode());  
        menuitems.setName(incoming.getName());
        menuitems.setStation(incoming.getStation());
        ucsbDiningCommonsMenuItemRepository.save(menuitems);

        return menuitems;
    }

    @ApiOperation(value = "Delete a Menu Item")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("")
    public Object deleteMenuItem(
            @ApiParam("id") @RequestParam Long id) {
        UCSBDiningCommonsMenuItem commons = ucsbDiningCommonsMenuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(UCSBDiningCommonsMenuItem.class, id));
        ucsbDiningCommonsMenuItemRepository.delete(commons);
        return genericMessage("UCSBDiningCommonsMenuItem with id %s deleted".formatted(id));
    }

    
}
