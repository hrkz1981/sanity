export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    categories[]->{
      title,
      slug,
      color
    }
  }
`

export const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    categories[]->{
      title,
      slug,
      color
    },
    body,
    seo
  }
`

export const landingPagesQuery = `
  *[_type == "landingPage"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    hero,
    features,
    cta,
    testimonials,
    seo
  }
`

export const landingPageQuery = `
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    hero,
    features,
    cta,
    testimonials,
    seo
  }
`