package es.webapp3.movieframe.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.web.server.csrf.CsrfToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import es.webapp3.movieframe.model.Director;
import es.webapp3.movieframe.model.Movie;
import es.webapp3.movieframe.model.Review;
import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.service.MovieService;
import es.webapp3.movieframe.service.DirectorService;
import es.webapp3.movieframe.service.UserService;

@Controller
public class home {

    @Autowired
    private MovieService movieService;

    @Autowired
    private UserService userService;

    @Autowired
    private DirectorService directorService;

    @ModelAttribute
    public void addAttributes(Model model, HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        if(principal != null) {
            model.addAttribute("logged", true);
            model.addAttribute("userName", principal.getName());
            model.addAttribute("admin", request.isUserInRole("ADMIN"));
            model.addAttribute("user", request.isUserInRole("USER"));
        } else {
            model.addAttribute("logged", false);
        }
    }

    @GetMapping("/news")
    public String showRecommendationScreen(HttpServletRequest request){
        if(request.isUserInRole("ADMIN")){
            return "recommendations_screen";
        }else{
            return "404";        
        }
    }
    
    @GetMapping("/movie/addition")
    public String movieAdditionScreen(Model model,HttpServletRequest request){ 
    
        if(request.isUserInRole("ADMIN")){
            model.addAttribute("state","no movie added yet"); 

            return "movie_aggregation";
        }else{
            return "404";        
        }
    }

    @GetMapping("/")
    public String home(Model model,Pageable page,HttpServletRequest request){

        String name = request.getUserPrincipal().getName();

        Optional<User> user = userService.findByName(name);
        if(user.isPresent()){
            model.addAttribute("username",user.get().getName());
            model.addAttribute("user",request.isUserInRole("USER"));
            model.addAttribute("admin",request.isUserInRole("ADMIN"));
        }else{
            return "404";
        }
        model.addAttribute("movieframe", movieService.findAll(page));
        return "initial_screen";
    }

    @PostMapping("/movies/name")
    public String searchMovie(Model model,@RequestParam String name,Pageable page){

        Page<Movie> movies = movieService.findByTitle(name,page);

        model.addAttribute("movieframe",movies);

        return "initial_screen";       
    }

    @PostMapping("/movie/addition/new")
    public String newMovie(Model model,Movie movie,@RequestParam String title,@RequestParam String gender,@RequestParam String description,@RequestParam int votes,MultipartFile image1)throws IOException {

        //Movie movie = new Movie();
        movie.setTitle(title);
        movie.setCategory(gender);
        movie.setDescription(description);
        movie.setVotes(votes);
        movie.setImageFile(BlobProxy.generateProxy(image1.getInputStream(), image1.getSize()));

        movieService.save(movie);

        model.addAttribute("state","movie saved");

        return "movie_aggregation";       
    }

    @PostMapping("/movie/{id}/review/new")
    public String newReview(Model model,@PathVariable Long id,@RequestParam int rating, @RequestParam String coments){

        Optional<Movie> movie = movieService.findById(id);

        if(movie.isPresent()){
            
            movie.get().setReview(new Review(rating,coments));
            movieService.save(movie.get());

            model.addAttribute("title",movie.get().getTitle());
            model.addAttribute("gender",movie.get().getCategory());
            model.addAttribute("description",movie.get().getDescription());
            model.addAttribute("picture",movie.get().getImageFile());
            model.addAttribute("directors",movie.get().getDirectors());

            return "movie_screen";
        }else{
            return "404";
        }   
    }
 
    @GetMapping("/movie/{id}")
    public String getMovie(Model model,@PathVariable Long id){

        Optional<Movie> movie = movieService.findById(id);

        if(movie.isPresent()){
            model.addAttribute("title",movie.get().getTitle());
            model.addAttribute("gender",movie.get().getCategory());
            model.addAttribute("description",movie.get().getDescription());
            model.addAttribute("picture",movie.get().getImageFile());
            model.addAttribute("directors",movie.get().getDirectors());
            return "movie_screen";
        }else{
            return "404";
        }   
    }
    @GetMapping("/movie/{id}/director")
    public String getDirector(Model model,@PathVariable Long id){

        Optional<Director> director = directorService.findById(id);
        
        if(director.isPresent()){
            model.addAttribute("avatar",director.get().getImageFile());
            model.addAttribute("director",director.get().getDirector());
            model.addAttribute("biography",director.get().getBiography());
            model.addAttribute("name",director.get().getName());
            model.addAttribute("born",director.get().getBorn());
            model.addAttribute("genre",director.get().getGenre());
            model.addAttribute("residence",director.get().getResidence());
            model.addAttribute("score",director.get().getScore());
            return "director_screen";
        }else{
            return "404";
        }   
    }

    @GetMapping("/director")
    public String showDirector(){
        return "director_screen";
    }

    @GetMapping("/log_in")
    public String login(Model model, HttpServletRequest request) {
 
        CsrfToken token = (CsrfToken) request.getAttribute("_csrf"); 
        model.addAttribute("token", token.getToken()); 
        return "login_screen";
    }

    @PostMapping("/log_out")
    public String logout(){
        return "initial_screen";
    }

    @GetMapping("/log_error")
    public String loginerror(){
        return "404";
    }
    
}
