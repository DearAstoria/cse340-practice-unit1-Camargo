import { getFacultyById, getSortedFaculty } from "../../models/faculty/faculty.js";

const facultyListPage = (req, res, next) => {
    try {
        console.log("---- ROUTE HIT: /faculty ----");
        // 1. Grabbing the sort parameter from the URL
        const sortBy = req.query.sort || 'name';
        console.log("1. Attempting to get sorted faculty...");
        const faculty = getSortedFaculty(sortBy);
        console.log(`2. Success: Found ${faculty.length} faculty members.`);
        console.log("3. Attempting to render 'faculty/list.ejs'...");
        res.render('faculty/list', {
            title: "Faculty List",
            faculty: faculty,
            currentSort: sortBy
        });
        
        console.log("4. Render successful!");
    } catch (err) {
        console.log("Inside of facultyListPage in controllers \n", err.message);
        next(err); // Sending to global error handler.
    }
};

const facultyDetailPage = (req, res, next) => {
    console.log("---- ROUTE HIT: /faculty/:facultyId ----");
    const facultyID = req.params.facultyId;
    const faculty = getFacultyById(facultyID);
    console.log("Faculty:\n", faculty)
    if(!faculty) {
        console.log("Inside of if")
        const err = new Error(`Faculty ${facultyID} not found`);
        err.status = 404;
        return next(err);
    }
    // const sortBy = req.params.sortBy || 'name';
    // const sortedFaculty = getSortedFaculty(sortBy);
    res.render('faculty/detail', {
        title: `${faculty.name} - ${faculty.title}`,
        faculty: faculty
    });
};
export { facultyListPage, facultyDetailPage};