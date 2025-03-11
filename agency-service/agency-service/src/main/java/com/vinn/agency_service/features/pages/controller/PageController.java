package com.vinn.agency_service.features.pages.controller;

import com.vinn.agency_service.features.pages.dto.PageDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${application.frontend-urls}")
@RestController
@RequestMapping("/${api.base.path}/${api.path.pages}")
public class PageController {

    @GetMapping(value = "/{name}", produces = { "application/json" })
    public ResponseEntity<?> getPageByName(
            @PathVariable(value = "name") final String name
    ) {
        PageDto page = new PageDto(1L, "abed");
        return ResponseEntity.ok(page);
    }
}
