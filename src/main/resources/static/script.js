document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsDiv = document.getElementById('posts');
    const postTitle = document.getElementById('postTitle');
    const postContent = document.getElementById('postContent');
    const deleteButton = document.getElementById('deleteButton');

    if (postForm) {
        // 글 작성 폼 제출 이벤트 리스너
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;

            const response = await fetch('/api/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                window.location.href = 'index.html'; // 작성 후 리스트 페이지로 이동
            } else {
                alert('Failed to create post');
            }
        });
    }

    if (postsDiv) {
        // 게시글 로드 함수
        async function loadPosts() {
            const response = await fetch('/api/posts');
            const posts = await response.json();

            postsDiv.innerHTML = '';
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.innerHTML = `
                    <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
                    <p>${post.content}</p>
                    <hr>
                `;
                postsDiv.appendChild(postDiv);
            });
        }

        loadPosts();
    }

    if (postTitle && postContent && deleteButton) {
        // 상세 페이지 처리
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (postId) {
            // 게시글 로드
            (async () => {
                const response = await fetch(`/api/posts/${postId}`);
                if (response.ok) {
                    const post = await response.json();
                    postTitle.textContent = post.title;
                    postContent.textContent = post.content;
                } else {
                    alert('Failed to load post');
                }
            })();

            // 삭제 버튼 이벤트 리스너
            deleteButton.addEventListener('click', async () => {
                const deleteResponse = await fetch(`/api/posts/${postId}`, {
                    method: 'DELETE',
                });

                if (deleteResponse.ok) {
                    window.location.href = 'index.html'; // 삭제 후 리스트 페이지로 이동
                } else {
                    alert('Failed to delete post');
                }
            });
        } else {
            alert('No post ID provided');
        }
    }
});
