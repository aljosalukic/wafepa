package jwd.wafepa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Models a physical activity.
 * 
 *
 */
@Entity
@Table(name="tblActivity")
public class Activity {
	
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="admin_comment")
	private String adminComment="test";

	@Column(name ="updated")
	Date updated = null;
	
	@Column(name ="description")
	String description;
	
	@Column(name ="created")
	Date created = new Date();
	
	

	public Activity() {
		super();
	}

	public Activity(String name) {
		super();
		this.name = name;
	}

	public Activity(Long id, String name) {
		
		this.id = id;
		this.name = name;
		this.updated = null;
	}
	
	/**
	 * 
	 * @return Activity identifier.
	 */
	public Long getId() {
		return id;
	}
	
	/**
	 * Sets activity identifier.
	 * @param id new identifier
 	 */
	public void setId(Long id) {
		this.id = id;
	}
	
	/**
	 * 
	 * @return Name of the activity.
	 */
	public String getName() {
		return name;
	}
	
	/**
	 * 
	 * @param name New name of the activity.
	 */
	public void setName(String name) {
		this.name = name;
	}

	public String getAdminComment() {
		return adminComment;
	}

	public void setAdminComment(String adminComment) {
		this.adminComment = adminComment;
	}



	public String getDescription() {
		return description;
	}



	public void setDescription(String description) {
		this.description = description;
	}



	public Activity(Long id, String name, String description) {
		if(created==null){
			this.created = new java.util.Date();
		}
		this.id = id;
		this.name = name;
		this.description = description;
		this.updated = null;
	}

	public Date getUpdated() {
		return updated;
	}

	public void setUpdated(Date updated) {
		this.updated = updated;
	}

	public Date getCreated() {
		return created;
	}



	
	
	
}
