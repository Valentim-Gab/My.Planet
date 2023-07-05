package site.my.planet.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

import site.my.planet.model.Category;
import site.my.planet.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{id}")
    public Category get(@PathVariable("id") long id) {
        return this.categoryService.get(id);
    }

    @GetMapping()
    public ArrayList<Category> getAll() {
        return this.categoryService.getAll();
    }
}
