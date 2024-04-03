document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("github-form")
    const searchInput = document.getElementById("search")
    const usersList = document.getElementById("user-list")
    const reposList = document.getElementById("repos-list")
    
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        const searchValue = searchInput.value
        fetchUsers(searchValue)
    });
    
    function fetchUsers(username) {
        fetch(`https://api.github.com/search/users?q=${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(res => res.json())
        .then(data => {
            //clears the userList
            usersList.innerHTML = '' 
            data.items.forEach(user => {
                const userElement = document.createElement('li')
                const userAvatar = document.createElement('img')
                userAvatar.src = user.avatar_url
                userAvatar.alt = user.login
                userAvatar.width = 50
                userAvatar.height = 50 
                
                const userLink = document.createElement('a')
                userLink.href = user.html_url
                userLink.textContent = user.login
                //open link in a different tab
                userLink.target = "_blank"
                
                userElement.appendChild(userAvatar) 
                userElement.appendChild(userLink)
                
                userElement.addEventListener('click', function() {
                    fetchRepos(user.login)
                });
                usersList.appendChild(userElement) 
            })
        })
    }
    
    function fetchRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            //clears the reposList
            reposList.innerHTML = ''
            data.forEach(repo => {
                const repoElement = document.createElement('li')
                repoElement.textContent = repo.name
                reposList.appendChild(repoElement)
            })
        })
    }
})
