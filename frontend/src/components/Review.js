const Review =({ movie, myRating, comment, addReview, handleMyRatingChange, handleCommentChange})=>{
    return(
        <div className="reviewForm">
            <form onSubmit={addReview}>
                {movie.Title}
                <br/>
                My rating: <input value={myRating} onChange={handleMyRatingChange}/>
                <br/>
                My comment: <input value={comment} onChange={handleCommentChange}/>
                <br/>
                <button id="reviewButton" type="submit">submit review</button>
            </form>
        </div>
    )
}
export default Review