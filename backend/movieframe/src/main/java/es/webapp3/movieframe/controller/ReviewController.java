package es.webapp3.movieframe.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import es.webapp3.movieframe.model.Review;
import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.service.ReviewService;
import es.webapp3.movieframe.service.UserService;

@Controller
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @GetMapping("/reviews/user")
    public String getUserReviews(Model model,HttpServletRequest request){
     
        
        
        if(request.isUserInRole("USER")){
            String name = request.getUserPrincipal().getName();

            Optional<User> user = userService.findByName(name);

            model.addAttribute("reviews",user.get().getReviews());
            
            return "reviews_screen";
        }else{
            return "404";        
        }
    }

    @DeleteMapping("/reviews/deletion/{id}")
    public String deleteReviewById(Model model,@PathVariable Long id) {

        Optional<Review> review = reviewService.findById(id);

        if(review.isPresent()){
            reviewService.deleteById(id);
            return "reviews_screen";
        }else{
            return "404";
        }   
    }

    @GetMapping("/reviews")
    public String getReviews(Model model,Pageable pageable,HttpServletRequest request){

        if(request.isUserInRole("ADMIN")){
            Page<Review> reviews = reviewService.findAll(pageable);

            model.addAttribute("reviews",reviews);

            return "modification_reviews_screen";
        }else{
            return "404";        
        }
    }
    
}
