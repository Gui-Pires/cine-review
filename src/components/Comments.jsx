function Comment({ comment, dateReview }) {
    return (
        <div className="row  border-bottom mb-1">
            <div className="col-8">
                <h6>{comment.User.nickname}</h6>
                <p>{comment.comment}</p>
            </div>
            <div className="col-4 text-end">
                <span>{comment.rating} ⭐</span>
                <p>{dateReview}</p>
            </div>
        </div>
    )
}

export default Comment;