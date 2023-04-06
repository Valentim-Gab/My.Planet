package site.my.planet.service;

import java.util.ArrayList;
import org.springframework.stereotype.Service;

import site.my.planet.dao.CategoryDao;
import site.my.planet.model.Category;

@Service
public class CategoryService {

    private CategoryDao categoryDao;

    public CategoryService(CategoryDao categoryDao) {
        this.categoryDao = categoryDao;
    }

    public Category get(long id) {
        Category category = new Category();
        category = this.categoryDao.findById(id).get();

        return category;
    }

    public ArrayList<Category> getAll() {
        return (ArrayList<Category>) this.categoryDao.findAll();
    }
}
