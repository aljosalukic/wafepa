package jwd.wafepa.web.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jwd.wafepa.model.Activity;
import jwd.wafepa.service.ActivityService;
import jwd.wafepa.support.ActivityDTOToActivity;
import jwd.wafepa.support.ActivityToActivityDTO;
import jwd.wafepa.web.dto.ActivityDTO;

@RestController
@RequestMapping(value = "/api/activities")
public class ApiActivityController {

	@Autowired
	private ActivityService activityService;

	@Autowired
	private ActivityToActivityDTO toDTO;

	@Autowired
	private ActivityDTOToActivity toActivity;
	
	

	@RequestMapping(method = RequestMethod.GET)
	ResponseEntity<List<ActivityDTO>> getActivities(
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "description", required = false) String desc,
			@RequestParam(value = "datum", required = false) String datum,
			@RequestParam(value = "page", defaultValue="0", required = false) Integer page) {

		List<Activity> activities;	

		int totalPages = 0;
		long totalElements = 0;
		
		if (name != null) {
			activities = activityService.findByName(name);
		} else {
			Page<Activity> activitiesPage = activityService.findAll(page); 
			activities = activitiesPage.getContent();
			totalPages = activitiesPage.getTotalPages();
			totalElements = activitiesPage.getTotalElements();
		}
		
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add("total-pages", "" + totalPages);
		httpHeaders.add("total-elements", "" + totalElements);
		
		return new ResponseEntity<>(toDTO.convert(activities),httpHeaders,HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	ResponseEntity<ActivityDTO> getActivity(@PathVariable Long id) {
		Activity activity = activityService.findOne(id);
		if (activity == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(toDTO.convert(activity), HttpStatus.OK);
	}
	

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	ResponseEntity<ActivityDTO> delete(@PathVariable Long id) {
		Activity deleted = activityService.delete(id);

		return new ResponseEntity<>(toDTO.convert(deleted), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<ActivityDTO> add(@RequestBody ActivityDTO newActivity) {
		
		

		Activity savedActivity = activityService.save(toActivity
				.convert(newActivity));
		
		
		

		return new ResponseEntity<>(toDTO.convert(savedActivity), HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/{id}", consumes = "application/json")
	public ResponseEntity<ActivityDTO> edit(@RequestBody ActivityDTO activityDTO,
			@PathVariable Long id) {
		
		if (id != activityDTO.getId()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Activity activity = toActivity.convert(activityDTO);
		
		activity.setUpdated(new Date());
		
		Activity persisted = activityService.save(activity);

		return new ResponseEntity<>(toDTO.convert(persisted), HttpStatus.OK);
	}

}
