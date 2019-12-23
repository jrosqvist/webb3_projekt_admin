"use strict";

// Hämtar utbildningar, jobben och webbplatserna när sidan laddas in
window.onload = function () {
    getWebpages();
    getJobs();
    getEducation();
}