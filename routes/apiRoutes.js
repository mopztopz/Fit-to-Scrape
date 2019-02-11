module.exports = function (app, db, axios, cheerio) {

    // ----- Creating Review JSON API
    app.get("/api/reviews", (req, res) => {
        db.Review.find({})
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });

    // ----- Creating Note JSON API
    app.get("/api/notes", (req, res) => {
        db.Review.find({})
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });

    // ----- Deleting Scraped content from database
    app.delete("/api/reviews", (req, res) => {
        db.Review.deleteMany({ "isSaved": false }).exec(function (err, doc) {
            if (err) {
                res.json("There was a problem deleting the information to the database.");
            }
            else {
                res.json("Successfully deleted");
            }
        })
    })

    // ----- Saving a Review
    app.post("/api/reviews/:id", (req, res) => {
        db.Review.updateOne({
            "_id": req.params.id
        }, {
                $set:
                    { "isSaved": true }
            }).then(dbReview => { res.json(dbReview) })
    })

    // ----- Delete Reviews
    app.delete("/api/reviews/:id", (req, res) => {
        db.Review.deleteOne({ "_id": req.params.id })
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });

    // ----- Creating a Note
    app.post("/api/notes/:id", (req, res) => {
        var Note = new db.Note({
            body: req.body.text,
            review: req.body.article
        });
        // console.log(req.body)
        Note.save((err, note) => {
            if (err) console.log(err)
            else {
                db.Review.findOneAndUpdate({ "_id": req.params.id }, { $push: { "notes": note } })
                    .then(dbNote => { res.send(dbNote) })
                    .catch(err => { res.send(err) });
            }
        });
    });

    // ----- Delete a note
    app.delete("/api/notes/:noteid/:reviewid", (req, res) => {
        db.Note.deleteOne({ "_id": req.params.noteid }, err => {
            console.log(req.params.noteid);
            console.log(req.params.reviewid);
            if (err) console.log(err)
            else {
                db.Review.findOneAndUpdate({
                    "_id": req.params.reviewid
                }, {
                        $pull: {
                            "notes": req.params.noteid
                        }
                    })
                    .then(dbNote => { res.send(dbNote) })
                    .catch(err => { res.send(err) });
            }
        });
    });
};