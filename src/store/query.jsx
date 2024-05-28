export const trending = `
query($perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
        pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
        }
        media (sort :TRENDING_DESC, type : ANIME){
            id
            idMal
            title {
                romaji
                english
                userPreferred
            }
            coverImage {
                large
                extraLarge
                color
            }
            description
            bannerImage
            episodes
            status
            duration
            genres
            season
            format
            averageScore
            popularity
            nextAiringEpisode {
                airingAt
                episode
              }
              seasonYear
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              trailer {
                id
                site
                thumbnail
              }
        }
    }
}`

export const animeinfo = `
query ($id: Int) {
    Media (id: $id) {
      id
      idMal
      title {
          romaji
          english
          userPreferred
      }
      coverImage {
          large
          extraLarge
          color
      }
      description
      bannerImage
      episodes
      status
      duration
      genres
      source
      type
      seasonYear
      season
      format
      averageScore
      popularity
      countryOfOrigin
      nextAiringEpisode {
          airingAt
          episode
        }
        seasonYear
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        trailer {
          id
          site
          thumbnail
        }

        studios(isMain: true) {
          nodes {
            id
            name
            siteUrl
          }
        }
        relations {
          edges {
            relationType(version: 2)
            node {
              id
              title {
                romaji
                native
                english
              }
              format
              coverImage{
                large
                extraLarge
              }
              episodes
              chapters
              status
            }
          }
      }
      recommendations {
        nodes {
            mediaRecommendation {
                id
                title {
                    romaji
                    english
                }
                coverImage {
                    extraLarge
                    large
                }
                episodes
                status
                format
                nextAiringEpisode {
                  airingAt
                  timeUntilAiring
                  episode
                }
            }
    }
}
characters {
  edges { 
    id
    role
    node {
      name {
        first
        last
        full
        native
        userPreferred
      }
      image {
        large
      }
    }
    voiceActorRoles {
      voiceActor {
        id
        name {
          first
          middle
          last
          full
          native
          userPreferred
        }
        image {
          large
        }
      }
    }
  }
}
    }
  }
`

export const playeranimeinfo = `query ($id: Int) {
  Media (id: $id) {
    mediaListEntry {
      progress
      status
    }
    id
    idMal
    title {
      romaji
      english
      native
    }
    status
    format
    genres
    episodes
    bannerImage
    description
    coverImage {
      extraLarge
      color
    }
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    recommendations {
      nodes {
        mediaRecommendation {
          id
          title {
            romaji
            english
          }
          coverImage {
            extraLarge
          }
          episodes
          status
          format
          nextAiringEpisode {
            episode
          }
        }
      }
    }
  }
}
`