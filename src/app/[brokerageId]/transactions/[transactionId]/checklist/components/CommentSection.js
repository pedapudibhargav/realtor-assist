import React, { useState } from 'react';

export default function CommentSection({ comments = [], onSubmit }) {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = () => {
        if (newComment.trim()) {
            onSubmit(newComment);
            setNewComment('');
        }
    };

    return (
        <div>
            <strong className="mb-2 d-block">Conveyancing Comments</strong>
            <div className="mb-3">

                {Array.isArray(comments) && comments.map((cmt, idx) => (
                    <div key={idx} className="bg-light p-2 rounded mb-2 small">
                        <div className="fw-semibold">
                            {cmt.author} <span className="text-muted ms-2">{cmt.date}</span>
                        </div>
                        <div>{cmt.text}</div>
                    </div>
                ))}

            </div>
            <textarea
                className="form-control mb-2"
                placeholder="Add a comment..."
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
                Submit Comment
            </button>
        </div>
    );
}
