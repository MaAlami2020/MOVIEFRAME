package es.webapp3.movieframe.model;

//import java.io.Serializable;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Movie{

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String title;
    private String gender;

    @Column(columnDefinition = "TEXT")
    private String movie_description;
    @Lob
    @JsonIgnore
    private Blob movie_img;
    
    private int movie_votes;
    
    @OneToMany(mappedBy="movie")
    private List<Review> reviews = new ArrayList<>();

    public Movie(){}

    public Movie(String title,String category,String description,int votes){
        super();
        this.movie_description=description;
        this.gender=category;
        this.title=title;
        this.movie_votes=votes;
        //this.trailer=spoiler;
        
    }

    public List<Review> getReviews(){
        return reviews;
    }

    public void setDescription(String descript){
        this.movie_description=descript;
    }

    public String getDescription(){
        return movie_description;
    }

    public Blob getImageFile(){
        return movie_img;
    }

    public void setImageFile(Blob image){
        this.movie_img=image;
    }

    public String getCategory(){
        return gender;
    }

    public void setTitle(String title){
        this.title=title;
    }

    public String getTitle(){
        return title;
    }

    public int getVotes(){
        return movie_votes;
    }

    /*public String getTrailer(){
        return trailer;
    }*/
}
