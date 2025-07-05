const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.addReview=async (req,res)=>{
    let list =await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash("success","New Review Added");
    res.redirect(`/listings/${list._id}`);
}
module.exports.destroyReview=async (req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);;
}