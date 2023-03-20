package es.webapp3.movieframe.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import es.webapp3.movieframe.model.Review;
import es.webapp3.movieframe.service.ReviewService;

@Controller
public class UserController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/user/reviews/edition")
    public String reviewEditionScreen(Model model){ 
        model.addAttribute("state","no review updated");       
        return "review_edition";
    }

    @PutMapping("/user/reviews/edition/{id}")
    public String editReview(Model model,@PathVariable Long id,@RequestParam int rating, @RequestParam String coments){

        Review newReview = new Review(rating,coments);
        newReview.setId(id);

        reviewService.save(newReview);

        model.addAttribute("state","review updated"); 
        
        return "review_edition";
    }

}
