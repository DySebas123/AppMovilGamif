const cors = require("cors");

module.exports = cors({
    origin: "*",

    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
    ],
});