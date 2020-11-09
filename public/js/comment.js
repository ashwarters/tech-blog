async function commentFormHandler(event) {
    event.preventDefault();

    const post_name = document.querySelector('textarea[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (post_name) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                user_name,
                post_id,
                post_name,
                post_url
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}




document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);