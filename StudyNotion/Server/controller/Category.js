
const category = require("../modules/category");
const Category = require("../modules/category");


function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        console.log(name, description)

        if (!name || !description) {
            return res.jaon(
                {
                    message: "enter all feilds"
                }
            )
        }

        const updateCategory = await Category.create({ name, description });
        if (updateCategory) {
            res.json(
                {
                    message: "catagory creaesuccessfully",
                    data: updateCategory
                }
            )
        }
    }
    catch (e) {
        res.json(
            {
                message: "tag not crreated"
            }
        )
    }
}


exports.getAllCategory = async (req, res) => {
    try {
        console.log("getting ALlCategory.,")
        const findTags = await Category.find();
        if (findTags) {
            res.json(
                {
                    success: true,
                    message: "tag fetched sucessfully.,",
                    data: findTags
                }
            )
        }
    }
    catch
    {
        return res.jaon(
            {
                success: false,
                message: "tag not be fetched"
            }
        )
    }
}

exports.showCategoryDetails = async (req, res) => {
    //fetch the data
    try {
        const { categoryId } = req.body;

        // get specified category data
        const getCategory = await Category.findById(categoryId).populate("courses").exec();

        if (!getCategory) {
            return res.json(
                {
                    message: "category is not vailable "
                }
            )
        }

        res.json({
            message: "category fetched",
            data: getCategory
        })

        // get different cateogry
        const different_category = await Category.find(
            {
                _id: { $ne: categoryId },
            }).populate("courses").exec()

        if (!different_category) {
            return res.json({
                message: "cant get different catagory courses"
            })
        }

        res.json(
            {
                message: "different category Curses fetch successfully",
                data: different_category
            }
        )


    }

    catch (e) {
        return res.json(
            {
                message: e.message
            }
        )
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } =  req.body;
        console.log("id",categoryId)
        console.log("category..,")
     
        

        const selectedCategory = await Category.findById(categoryId)
            .populate(
                {
                    path: "courses",
                    match: { status: "Published" },
                    populate:
                    {
                        path:"ratingAndReviews"
                    },
                    
                
                }
            ).exec()

        if (!selectedCategory) {
            return res.json(
                {
                    success: false,
                    message: "catagory not found"
                }
            )
        }

        if (selectedCategory.courses.length === 0) {
            return res.json(
                {
                    success: false,
                    message: "no curses for selected catagory"
                }
            )
        }

        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId }
        })

        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        ).populate({
            path: "courses",
            populate:
            {
                path:"ratingAndReviews"
            },
            match: { status: "Published" },
        }).exec()

        const allCategories = await Category.find().populate(
            {
                path: "courses",
                
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                    path:"ratingAndReviews"
                }
            }
        ).exec()

        if(!allCategories)
        {
           return res.json(
                {

                    success:false,
                    message:"all Catgegory not be generated"
                }
            )
        }

        const allCourses = await allCategories.flatMap((category) => category.courses)
        const mostSellingCourses =await  allCourses.sort((a, b) => a.sold).slice(0, 10)

        res.json(
            {
                success:true,
                data:
                {
                    selectedCategory,
                    differentCategory,
                    mostSellingCourses
                }
            }
        )
    }
    catch (e) {
        return res.json({
            success: false,
            message: e.message,

        })
    }
}

