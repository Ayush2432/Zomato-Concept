import joi from "joi";

export const ValidateReviewData = (reviewData) => {
    const Schema = joi.object({
        food: joi.string().required(),
        restaurant: joi.string().required(),
        user: joi.string().required(),
        rating: joi.number().required(),
        reviewText: joi.string().required(),
        isRestaurantReview: joi.boolean(),
        isFoodReview: joi.boolean(),
        photos: joi.string(),
    })

    return Schema.validateAsync(reviewData);
}