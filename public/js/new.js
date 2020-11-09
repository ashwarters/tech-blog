async function newFormHandler(event) {
    event.preventDefault();

    const post_id = document.querySelector('input[name="post-id"]').value;
    const post_url = document.querySelector('input[name="post-url"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            post_id,
            post_url,
            post_name,
            user_name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-form').addEventListener('submit', newFormHandler);