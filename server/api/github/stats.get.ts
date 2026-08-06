import { ofetch } from 'ofetch'

export default defineCachedEventHandler(async (event) => {
  const { username } = getQuery(event)

  if (!username) {
    throw createError({ statusCode: 400, statusMessage: 'Missing username' })
  }

  const [user, repos] = await Promise.all([
    ofetch(`https://api.github.com/users/${username}`),
    ofetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
  ])

  const stars = repos.reduce((acc: number, repo: { stargazers_count: number }) => {
    return acc + (repo.stargazers_count || 0)
  }, 0)

  return {
    followers: user.followers,
    stars,
    publicRepos: user.public_repos
  }
}, {
  maxAge: 60 * 60 * 6
})
