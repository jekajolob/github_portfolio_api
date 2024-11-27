// Replace 'username' with the GitHub username
const username = 'username'

// API URLs
const profileUrl = `https://api.github.com/users/${username}`
const reposUrl = `https://api.github.com/users/${username}/repos`

// Fetch and display profile
fetch(profileUrl)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('avatar').src = data.avatar_url
    document.getElementById('name').textContent = data.name || data.login
    document.getElementById('bio').textContent = data.bio || 'No bio available.'
  })
  .catch((error) => console.error('Error fetching profile:', error))

// Fetch and display repositories
fetch(reposUrl)
  .then((response) => response.json())
  .then((repos) => {
    const reposContainer = document.getElementById('repos')
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
    repos.forEach((repo) => {
      const repoDiv = document.createElement('div')
      repoDiv.classList.add('repo')
      repoDiv.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${
        repo.name
      }</a></h3>
                <p>${repo.description || 'No description'}</p>
                <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                <p><strong>Language:</strong> ${
                  repo.language || 'Not specified'
                }</p>
            `
      reposContainer.appendChild(repoDiv)
    })
  })
  .catch((error) => console.error('Error fetching repositories:', error))
