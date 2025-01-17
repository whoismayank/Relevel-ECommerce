const CategoryController = require('../../../controllers/category.controller');
const Model = require('../../../models');
const CategoryModel = Model.category;
const newCategory = require('../mock-data/new-category.json');
const { mockRequest, mockResponse } = require('../interceptor');

let req, res;

beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
})

describe('CategoryController.create', () => {

    beforeEach(() => {
        req.body = newCategory;
    })

    // test('should call CategoryController.create and create a new category', async () => {

    //     //Mocking model command
    //     const spy = jest.spyOn(CategoryModel, 'create')
    //         .mockImplementation((newCategory) => Promise.resolve(newCategory));
        
    //     //executing controller command
    //     await CategoryController.create(req, res);
        
    //     //test to verify the create function
    //     expect(spy).toHaveBeenCalled();
    //     expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
    //     expect(res.status).toHaveBeenCalledWith(201);
    //     expect(res.send).toHaveBeenCalledWith(newCategory);

    // });

    test('should call CategoryController.create and ends with an error', async () => {
      
        //Mocking model command
        const spy = jest.spyOn(CategoryModel, 'create')
            .mockImplementation(() => Promise.reject(Error("This is an error")));
   
        //executing controller command
        await CategoryController.create(req, res);

        //test to verify the create function
        await expect(spy).toHaveBeenCalled();
        expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error while storing the category!"
        });
    });
});
