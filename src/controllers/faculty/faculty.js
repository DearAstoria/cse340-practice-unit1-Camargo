import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';

const facultyListPage = async (req, res, next) => {
    try {
        console.log("---- ROUTE HIT: /faculty ----");
        const validSortOptions = ['name', 'department', 'title'];
        const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'name';
        console.log("1. Attempting to get sorted faculty...");
        const faculty = await getSortedFaculty(sortBy);
        console.log(`2. Success: Found ${faculty.length} faculty members.`);
        console.log("3. Attempting to render 'faculty/list.ejs'...");
        res.render('faculty/list', {
            title: "Faculty List",
            faculty: faculty,
            currentSort: sortBy
        });
        
        console.log("4. Render successful");
    } catch (err) {
        console.log("Inside of facultyListPage in controllers \n", err.message);
        next(err); // Sending to global error handler.
    }
};

const facultyDetailPage = async (req, res, next) => {
    console.log("---- ROUTE HIT: /faculty/:facultyId ----");
    const facultySlug = req.params.facultySlug;
    const faculty = await getFacultyBySlug(facultySlug);
    console.log("Faculty:\n", faculty)
    if(Object.keys(faculty).length === 0) {
        console.log("Inside of if")
        const err = new Error(`Faculty ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }
    res.render('faculty/detail', {
        title: `${faculty.name} - Faculty Profile`,
        faculty: faculty
    });
};
export { facultyListPage, facultyDetailPage};