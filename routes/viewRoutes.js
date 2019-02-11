module.exports = function (app, db, axios, cheerio) {

    // ----- Load Index Page
    app.get("/", (req, res) => {
        db.Review.find({ "isSaved": false }).limit(12)
            .exec(function (error, data) {
                var reviewObject = {
                    review: data
                };
                console.log(reviewObject);
                res.render("index", reviewObject);
            });
    });


    // ----- Load Saved Page
    app.get("/saved", function (req, res) {
        db.Review.find({ "isSaved": true }).populate("notes")
            .exec(function (error, data) {
                var reviewObject = {
                    review: data
                };
                res.render("saved", reviewObject);
            });
    });

    // ----- Scraping contents
    app.get("/scrape", (req, res) => {
        axios.get("https://www.cnet.com/reviews/").then(function (response) {
            var $ = cheerio.load(response.data);

            $("div.infoContainer").each(function () {
                var result = {};

                result.title = $(this)
                    .children("a")
                    .children("h4")
                    .text().trim();
                result.brief = $(this)
                    .children("div.description")
                    .text().trim();
                result.price = $(this)
                    .children("div.description")
                    .children("a")
                    .text().trim();
                result.link = $(this)
                    .children("a")
                    .attr("href").trim();

                db.Review.create(result).then(function (err, dbReview) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(dbReview);
                    }
                })
            })

            // ----- Send a message to the client
            res.send("Scrape Complete");
        }).catch(err => { console.log(err) });
    });
};